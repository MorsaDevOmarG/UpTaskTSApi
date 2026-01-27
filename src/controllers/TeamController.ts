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

    req.project.team.push(user._id);
    await req.project.save();

    res.send("Usuario agregado correctamente");
  };
}
