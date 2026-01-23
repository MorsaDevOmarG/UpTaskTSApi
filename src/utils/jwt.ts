import jwt from "jsonwebtoken";
import { Types } from "mongoose";

type UserPayload = {
  id: Types.ObjectId;
};

export const generateJWT = (payload: UserPayload) => {
  // const data = {
  //   name: 'Usuario',
  //   credit_card: '1230',
  //   password: 'password'
  // };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "6m",
  });

  return token;
};