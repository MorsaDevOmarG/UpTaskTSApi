import { Response, Request } from 'express';
import User from '../models/User';

export class TeamMemberController {
  static findMemberByEmail = async (req: Request, res: Response) => {
    // Logic to find a team member by email
    const { email } = req.body;
    
    // Find user
    const user = (await User.findOne({ email })).isSelected('_id email name');

    if (!user) {
      const error = new Error('Usuario no encontrado');

      return res.status(404).json({ error: error.message });
    }

    res.json({ user });
  }
}