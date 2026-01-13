import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";
import Task from "../models/Task";

const router = Router();
// En POSTMAN: http://localhost:4000/api/projects
router.post(
  "/",
  body("projectName")
    .notEmpty()
    .withMessage("El Nombre del Proyecto es Obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El Nombre del Cliente es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripción es Obligatoria"),
  handleInputErrors,
  ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);

router.get(
  "/:id",
  param("id")
    .isMongoId()
    .withMessage("ID no válido"),
  handleInputErrors,
  ProjectController.getProjectById
);

router.put(
  "/:id",
  param("id")
    .isMongoId()
    .withMessage("ID no válido"),
  body("projectName")
    .notEmpty()
    .withMessage("El Nombre del Proyecto es Obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El Nombre del Cliente es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripción es Obligatoria"),
  handleInputErrors,
  ProjectController.updateProject
);

router.delete(
  "/:id",
  param("id")
    .isMongoId()
    .withMessage("ID no válido"),
  handleInputErrors,
  ProjectController.deleteProject
);

// RUTAS para las TAREAS
// http://localhost:4000/api/projects/696539e3ff2dfc8e6fb6dcfd/tasks

// Con router param, las rutas que contengan: projectId, tomarán lo que pongamos, en este caso esa validación:  validateProjectExists
router.param("projectId", validateProjectExists);

router.post(
  "/:projectId/tasks",
  // validateProjectExists,
  body("name")
    .notEmpty()
    .withMessage("El Nombre de la Tarea es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripción de la Tarea es Obligatoria"),
  handleInputErrors,
  TaskController.createTask
);

router.get(
  "/:projectId/tasks",
  // validateProjectExists,
  TaskController.getProjectTasks,
);

router.get(
  "/:projectId/tasks/:taskId",
  // validateProjectExists,
  param("taskId")
    .isMongoId()
    .withMessage("ID no válido"),
  handleInputErrors,
  TaskController.getTaskById
);

router.put(
  "/:projectId/tasks/:taskId",
  // validateProjectExists,
  param("taskId")
    .isMongoId()
    .withMessage("ID no válido"),
  body("name")
    .notEmpty()
    .withMessage("El Nombre de la Tarea es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripción de la Tarea es Obligatoria"),
  handleInputErrors,
  TaskController.updateTask
);

export default router;
