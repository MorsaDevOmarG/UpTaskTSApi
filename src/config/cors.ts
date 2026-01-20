import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    // console.log(process.argv);
    
    const whiteList = [process.env.FRONTEND_URL];

    if (process.argv[2] === '--api') {
      whiteList.push(undefined);
    }

    if (whiteList.includes(origin)) {
    // if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};
