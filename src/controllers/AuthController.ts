import { Response, Request } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { hasPassword } from '../utils/auth';

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    // res.send('Desde /api/auth - AuthController');

    try {
      const { password } = req.body;
      const user = new User(req.body);
      
      // Hash Password
      // const salt = await bcrypt.genSalt(10);
      // user.password = await bcrypt.hash(password, salt);

      user.password = await hasPassword(password);

      await user.save();

      res.send('Cuenta creada, revisa tu email para confirmarla');
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' });
    }
  }
}