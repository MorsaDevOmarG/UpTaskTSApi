import jwt from "jsonwebtoken";

export const generateJWT = () => {
  const data = {
    name: 'Usuario',
    credit_card: '1230',
    password: 'password'
  };

  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: '6m'
  });

  return token;
};