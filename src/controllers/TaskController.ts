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

      await task.save();

      // await project.save();
      await req.project.save();

      res.send("Tarea creada correctamente");

    } catch (error) {
      console.log(error);
    }
  };
}
