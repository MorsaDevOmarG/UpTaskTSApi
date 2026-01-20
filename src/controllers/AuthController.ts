import { Response, Request } from 'express';

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    res.send('Desde /api/auth - AuthController');
  }
}