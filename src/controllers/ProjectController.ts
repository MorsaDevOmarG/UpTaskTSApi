import { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);
    // res.send('Creando proyecto');

    try {
      // Otra forma: await Project.create(req.body);

      await project.save();

      res.send("Proyecto creado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({});

      res.json(projects);
    } catch (error) {
      console.log(error);
    }

    res.send("Todos los proyectos");
  };

  static getProjectById = async (req: Request, res: Response) => {
    // console.log(req.params);
    const { id } = req.params;
    // console.log(id);

    try {
      // const project = await Project.findById(id);
      const project = (await Project.findById(id)).populate('tasks');

      if (!project) {
        const error = new Error("Proyecto NO encontrado...");

        return res.status(404).json({ error: error.message });
      }

      res.json(project);
    } catch (error) {
      console.log(error);
    }

    // res.send('Todos los proyectos');
  };

  static updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      // const project = await Project.findByIdAndUpdate(id, req.body);
      const project = await Project.findById(id);

      if (!project) {
        const error = new Error("Proyecto NO encontrado...");

        return res.status(404).json({ error: error.message });
      }

      project.projectName = req.body.projectName;
      project.clientName = req.body.clientName;
      project.description = req.body.description;

      await project.save();

      res.send("Proyecto Actualizado");
    } catch (error) {
      console.log(error);
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      // const project = await Project.findByIdAndDelete(id);
      const project = await Project.findById(id);
      // console.log(project);

      if (!project) {
        const error = new Error("Proyecto NO encontrado...");

        return res.status(404).json({ error: error.message });
      }

      await project.deleteOne();

      res.send("Proyecto eliminado");
    } catch (error) {
      console.log(error);
    }
  };
}
