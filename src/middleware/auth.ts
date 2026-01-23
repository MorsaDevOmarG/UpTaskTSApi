import { Response, Request, NextFunction } from 'express';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.headers.authorization);

  const bearer = req.headers.authorization;

  if (!bearer) {
    const error = new Error('No Autorizado');

    return res.status(401).json({ error: error.message });
  }

  const token = bearer.split(' ')[1];
  // console.log(bearer);
  console.log(token);

  next();
};