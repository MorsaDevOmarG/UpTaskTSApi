import { Response, Request } from "express";
import User from "../models/User";

export class TeamMemberController {
  static findMemberByEmail = async (req: Request, res: Response) => {
    // Logic to find a team member by email
    const { email } = req.body;

    // Find user
    const user = await User.findOne({ email }).select("_id email name");

    if (!user) {
      const error = new Error("Usuario no encontrado");

      return res.status(404).json({ error: error.message });
    }

    res.json({ user });
  };

  static addMemberById = async (req: Request, res: Response) => {
    const { id } = req.body;
    // console.log(id);

    const user = await User.findById(id).select("_id");

    if (!user) {
      const error = new Error("Usuario no encontrado");

      return res.status(404).json({ error: error.message });
    }

    if (
      req.project.team.some((team) => team.toString() === user._id.toString())
    ) {
      const error = new Error("El usuario ya pertenece al proyecto");

      return res.status(409).json({ error: error.message });
    }

    req.project.team.push(user._id);
    await req.project.save();

    res.send("Usuario agregado correctamente");
  };

  static removeMemberById = async (req: Request, res: Response) => {
    const { id } = req.body;
    // console.log(id);

    req.project.team = req.project.team.filter(
      (teamMember) => teamMember.toString() !== id.toString()
    );

    await req.project.save();

    res.send("Usuario eliminado correctamente");
  };
}
