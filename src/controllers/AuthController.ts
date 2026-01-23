import { Response, Request } from "express";
import User from "../models/User";
// import bcrypt from 'bcrypt';
import { checkPassword, hasPassword } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";
import { generateJWT } from "../utils/jwt";
// import { transporter } from '../config/nodemailer';
export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    // res.send('Desde /api/auth - AuthController');

    try {
      const { password, email } = req.body;

      // Prevenir Duplicados
      const userExists = await User.findOne({ email });

      if (userExists) {
        const error = new Error("El Usuario ya esta registrado");

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

      // Enviar e-mail
      // await transporter.sendMail({
      //   from: 'UpTask <admin@uptask.com>',
      //   to: user.email,
      //   subject: 'UpTask - Confirma tu cuenta',
      //   text: 'UpTask - Confirma tu cuenta',
      //   html: `<p>Probando e-mail</p>`
      // })
      AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      // await user.save();
      // await token.save();
      await Promise.allSettled([user.save(), token.save()]);

      res.send("Cuenta creada, revisa tu email para confirmarla");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      console.log(token);

      const tokenExists = await Token.findOne({ token });
      // console.log(tokenExists);

      if (!tokenExists) {
        const error = new Error("Token no válido");

        return res.status(404).json({ error: error.message });
      }

      const user = await User.findById(tokenExists.user);
      // console.log(user);

      user.confirmed = true;

      await Promise.allSettled([user.save(), tokenExists.deleteOne()]);

      res.send("Cuenta confirmada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      // res.send('Login');

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        const error = new Error("Usuario no encontrado");

        return res.status(404).json({ error: error.message });
      }
      // console.log(user);

      if (!user.confirmed) {
        const token = new Token();
        token.user = user._id;
        token.token = generateToken();
        await token.save();

        AuthEmail.sendConfirmationEmail({
          email: user.email,
          name: user.name,
          token: token.token,
        });

        const error = new Error(
          "La cuenta no ha sido confirmada, hemos enviado un e-mail de confirmación",
        );

        return res.status(401).json({ error: error.message });
      }

      // Revisar PASSWORD
      const isPasswordCorrect = await checkPassword(password, user.password);
      // console.log(isPasswordCorrect);

      if (!isPasswordCorrect) {
        const error = new Error("Password Incorrecto");

        return res.status(404).json({ error: error.message });
      }

      const token = generateJWT({id: user._id});

      // res.send("Autenticado...");
      res.send(token);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static requestConfirmationCode = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      // Usuario existe
      const user = await User.findOne({ email });

      if (!user) {
        const error = new Error("El Usuario no esta registrado");

        return res.status(404).json({ error: error.message });
      }

      if (user.confirmed) {
        const error = new Error("El Usuario ya esta confirmado");

        return res.status(409).json({ error: error.message });
      }

      // Generar TOKEN
      const token = new Token();
      token.token = generateToken();
      token.user = user._id;

      AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      await Promise.allSettled([user.save(), token.save()]);

      res.send("Se envió un nuevo token a tu e-mail");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      // Usuario existe
      const user = await User.findOne({ email });

      if (!user) {
        const error = new Error("El Usuario no esta registrado");

        return res.status(404).json({ error: error.message });
      }

      // Generar TOKEN
      const token = new Token();
      token.token = generateToken();
      token.user = user._id;
      await token.save();

      AuthEmail.sendPasswordResetToken({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      res.send("Revisa tu e-mail para instrucciones");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static validateToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;

      const tokenExists = await Token.findOne({ token });

      if (!tokenExists) {
        const error = new Error("Token no válido");

        return res.status(404).json({ error: error.message });
      }

      res.send("Token válido, define tu nuevo password");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updatePasswordWithToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      const tokenExists = await Token.findOne({ token });

      if (!tokenExists) {
        const error = new Error("Token no válido");

        return res.status(404).json({ error: error.message });
      }

      const user = await User.findById(tokenExists.user);
      user.password = await hasPassword(password);

      await Promise.allSettled([user.save(), tokenExists.deleteOne]);

      res.send("El Password se modificó correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
