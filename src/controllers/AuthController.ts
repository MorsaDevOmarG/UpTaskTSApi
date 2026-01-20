import { Response, Request } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { hasPassword } from '../utils/auth';
import Token from '../models/Token';
import { generateToken } from '../utils/token';

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    // res.send('Desde /api/auth - AuthController');

    try {
      const { password, email } = req.body;

      // Prevenir Duplicados
      const userExists = await User.findOne({ email });

      if (userExists) {
        const error = new Error('El Usuario ya esta registrado');

        return res.status(409).json({ error: error.message });
      }

      const user = new User(req.body);
      
      // Hash Password
      // const salt = await bcrypt.genSalt(10);
      // user.password = await bcrypt.hash(password, salt);
      user.password = await hasPassword(password);

      // Generar TOKEN
      const token = new Token();
      token.token = generateToken();
      token.user = user._id;

      await user.save();
      await token.save();

      await Promise.allSettled([user.save(), token.save()]);

      res.send('Cuenta creada, revisa tu email para confirmarla');
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' });
    }
  }
}