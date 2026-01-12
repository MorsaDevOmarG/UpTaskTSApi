import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";

const router = Router();
// En POSTMAN: http://localhost:4000/api/projects
router.get('/', ProjectController.getAllProjects);

export default router;