import mongoose from "mongoose";
import colors, { bgRed } from 'colors';
import { exit } from "node:process";

export const connectDB = async () => {
  try {
    // const connection = await mongoose.connect(process.env.DATABASE_URL);
    const { connection } = await mongoose.connect(process.env.DATABASE_URL);
    // console.log(connection);
    // const url = `${connection.connection.host}:${connection.connection.port}`;
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.green.bold(`Conexión a MONGO: ${url}`));

  } catch (error) {
    console.log(error.message);
    // process.exit(1);
    console.log(bgRed("Error al conectar con MongoDB"));
    exit(1);
  }
};