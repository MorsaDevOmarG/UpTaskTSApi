import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { hashAuthorization, taskBelongToProject, taskExists } from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";
import { NoteController } from "../controllers/NoteController";

const router = Router();
// En POSTMAN: http://localhost:4000/api/projects

// Aplicar el middleware de autenticación a todas las rutas de este router
router.use(authenticate);

router.post(
  "/",
  body("projectName")
    .notEmpty()
    .withMessage("El Nombre del Proyecto es Obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El Nombre del Cliente es Obligatorio"),
  body("description").notEmpty().withMessage("La Descripción es Obligatoria"),
  handleInputErrors,
  ProjectController.createProject,
);

router.get("/", ProjectController.getAllProjects);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  ProjectController.getProjectById,
);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  body("projectName")
    .notEmpty()
    .withMessage("El Nombre del Proyecto es Obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El Nombre del Cliente es Obligatorio"),
  body("description").notEmpty().withMessage("La Descripción es Obligatoria"),
  handleInputErrors,
  ProjectController.updateProject,
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  ProjectController.deleteProject,
);

// RUTAS para las TAREAS
// http://localhost:4000/api/projects/696539e3ff2dfc8e6fb6dcfd/tasks

// Con router param, las rutas que contengan: projectId, tomarán lo que pongamos, en este caso esa validación:  projectExists
router.param("projectId", projectExists);

router.post(
  "/:projectId/tasks",
  // projectExists,
  hashAuthorization,
  body("name").notEmpty().withMessage("El Nombre de la Tarea es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripción de la Tarea es Obligatoria"),
  handleInputErrors,
  TaskController.createTask,
);

router.get(
  "/:projectId/tasks",
  // projectExists,
  TaskController.getProjectTasks,
);

router.param("taskId", taskExists);
router.param("taskId", taskBelongToProject);

router.get(
  "/:projectId/tasks/:taskId",
  // projectExists,
  param("taskId").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  TaskController.getTaskById,
);

router.put(
  "/:projectId/tasks/:taskId",
  // projectExists,
  hashAuthorization,
  param("taskId").isMongoId().withMessage("ID no válido"),
  body("name").notEmpty().withMessage("El Nombre de la Tarea es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La Descripción de la Tarea es Obligatoria"),
  handleInputErrors,
  TaskController.updateTask,
);

router.delete(
  "/:projectId/tasks/:taskId",
  // projectExists,
  hashAuthorization,
  param("taskId").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  TaskController.deleteTask,
);

router.post(
  "/:projectId/tasks/:taskId/status",
  param("taskId").isMongoId().withMessage("ID no válido"),
  body("status").notEmpty().withMessage("El Status el Obligatorio"),
  handleInputErrors,
  TaskController.updateStatus,
);

// Routes For Teams
router.post(
  "/:projectId/team/find",
  body("email").isEmail().toLowerCase().withMessage("E-mail no válido"),
  handleInputErrors,
  TeamMemberController.findMemberByEmail,
);

router.get(
  "/:projectId/team",
  TeamMemberController.getProjectTeam,
);

router.post(
  "/:projectId/team",
  body("id").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  TeamMemberController.addMemberById,
);

router.delete(
  "/:projectId/team/:userId",
  param("userId")
    .isMongoId()
    .withMessage("ID no válido"),
  handleInputErrors,
  TeamMemberController.removeMemberById,
);

// Routes for Notes
router.post(
  "/:projectId/tasks/:taskId/notes",
  body("content").notEmpty().withMessage("El contenido de la nota es obligatorio"),
  handleInputErrors,
  NoteController.createNote
);

export default router;
