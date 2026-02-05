import { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);
    // res.send('Creando proyecto');

    // Este IF se agrego para FORZAR un ERROR y probar...
    // if (true) {
    //   const error = new Error("Proyecto NO encontrado...");

    //   return res.status(404).json({ error: error.message });
    // }

    project.manager = req.user._id;
    console.log(req.user);

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
      const projects = await Project.find({
        $or: [
          {
            manager: req.user._id,
          },
          {
            team: req.user._id,
          },
        ],
      });

      res.json(projects);
    } catch (error) {
      console.log(error);
    }

    // res.send("Todos los proyectos");
  };

  static getProjectById = async (req: Request, res: Response) => {
    // console.log(req.params);
    const { id } = req.params;
    // console.log(id);

    try {
      // const project = await Project.findById(id);
      const project = await Project.findById(id).populate("tasks");

      if (!project) {
        const error = new Error("Proyecto NO encontrado...");

        return res.status(404).json({ error: error.message });
      }

      if (
        project.manager.toString() !== req.user._id.toString() &&
        !project.team.includes(req.user._id)
      ) {
        const error = new Error("Acción no válida...");

        return res.status(404).json({ error: error.message });
      }

      res.json(project);
    } catch (error) {
      console.log(error);
    }

    // res.send('Todos los proyectos');
  };

  static updateProject = async (req: Request, res: Response) => {
    // const { id } = req.params;

    try {
      // const project = await Project.findByIdAndUpdate(id, req.body);
      // const project = await Project.findById(id);

      // if (!project) {
      //   const error = new Error("Proyecto NO encontrado...");

      //   return res.status(404).json({ error: error.message });
      // }

      // if (project.manager.toString() !== req.user._id.toString()) {
      //   const error = new Error("Solo el Manager puede actualizar el proyecto");

      //   return res.status(404).json({ error: error.message });
      // }

      // project.projectName = req.body.projectName;
      // project.clientName = req.body.clientName;
      // project.description = req.body.description;

      req.project.projectName = req.body.projectName;
      req.project.clientName = req.body.clientName;
      req.project.description = req.body.description;

      // await project.save();
      await req.project.save();

      res.send("Proyecto Actualizado");
    } catch (error) {
      console.log(error);
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    // const { id } = req.params;

    try {
      // const project = await Project.findByIdAndDelete(id);
      // const project = await Project.findById(id);
      // console.log(project);

      // if (!project) {
      //   const error = new Error("Proyecto NO encontrado...");

      //   return res.status(404).json({ error: error.message });
      // }

      // if (project.manager.toString() !== req.user._id.toString()) {
      //   const error = new Error("Solo el Manager puede eliminar un proyecto");

      //   return res.status(404).json({ error: error.message });
      // }

      // await project.deleteOne();
      await req.project.deleteOne();

      res.send("Proyecto eliminado");
    } catch (error) {
      console.log(error);
    }
  };
}
