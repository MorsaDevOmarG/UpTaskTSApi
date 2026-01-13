import { Request, Response } from "express";
import Project from "../models/Project";
import Task from "../models/Task";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      // console.log(task);

      // task.project = project._id;
      task.project = req.project._id;

      // project.tasks.push(task._id);
      req.project.tasks.push(task._id);

      // await task.save();

      // // await project.save();
      // await req.project.save();

      // Los await de aquí arriba, los pasamos acá para mejorar el rendimiento de la APP
      await Promise.allSettled([task.save(), req.project.save()]);

      res.send("Tarea creada correctamente");
    } catch (error) {
      // console.log(error);

      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      // populate: es como un JOIN en una base de datos relacional, con ello tremos toda la info del PROYECTO
      // const tasks = await Task.find({ project: req.project._id });
      const tasks = await Task.find({ project: req.project._id }).populate(
        "project"
      );

      res.json(tasks);
    } catch (error) {
      // console.log(error);

      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getTaskById = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;

      const task = await Task.findById(taskId);

      if (!task) {
        const error = new Error("Tarea no encontrada");

        return res.status(404).json({ error: error.message });
      }

      if (task.project.toString() !== req.project._id.toString()) {
        const error = new Error("Acción no válida");

        return res.status(400).json({ error: error.message });
      }

      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;

      // const task = await Task.findByIdAndUpdate(taskId, req.body);
      const task = await Task.findById(taskId);

      if (!task) {
        const error = new Error("Tarea no encontrada");

        return res.status(404).json({ error: error.message });
      }

      if (task.project.toString() !== req.project._id.toString()) {
        const error = new Error("Acción no válida");

        return res.status(400).json({ error: error.message });
      }

      task.name = req.body.name;
      task.description = req.body.description;
      
      await task.save();

      res.send("Tarea actualizada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;

      const task = await Task.findById(taskId);

      if (!task) {
        const error = new Error("Tarea no encontrada");

        return res.status(404).json({ error: error.message });
      }

      // req.project.tasks = req.project.tasks.filter(task => task !== taskId);
      req.project.tasks = req.project.tasks.filter(
        (task) => task.toString() !== taskId
      );

      // await task.deleteOne();
      // await req.project.save();
      await Promise.allSettled([task.deleteOne(), req.project.save()]);

      res.send("Tarea eliminada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updateStatus = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId);
      
      if (!task) {
        const error = new Error("Tarea no encontrada");
        
        return res.status(404).json({ error: error.message });
      }

      const { status } = req.body;
      task.status = status;

      await task.save();

      res.send('Estatus Actualizado');

    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
