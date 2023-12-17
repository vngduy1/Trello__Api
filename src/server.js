import express from "express";
import exitHook from "async-exit-hook";
import cors from "cors";

import { CONNECT_DB, CLOSE_DB } from "./config/mongodb";
import { env } from "./config/environment";
import { APIs_V1 } from "./routes/v1";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";
import { corsOptions } from "./config/cors";

const START_SERVER = () => {
  const app = express();

  //Xu ly cors
  app.use(cors(corsOptions));

  //Bat req.body Json Data
  app.use(express.json());

  //Use APIs_V1
  app.use("/v1", APIs_V1);

  //Middleware xu ly loi tap trung
  app.use(errorHandlingMiddleware);

  app.get("/", (req, res) => {
    // console.log(await GET_DB().listCollections().toArray());
    res.end("<h1>Hello World!</h1><hr>");
  });

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(
      `3, Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`
    );
  });

  exitHook(() => {
    console.log(`4, ngat ket noi`);
    CLOSE_DB();
  });
};

//Chi khi ket noi toi Database thanh cong thi moi Start Server Back-end len
(async () => {
  try {
    console.log("1, Connecting to MongoDB Cloud Atlas...");
    await CONNECT_DB();
    console.log("2, Connecting to MongoDB Cloud Atlas!");
    //Khoi dong server Back-end sau khi connect Database thanh cong
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();

//Chi khi ket noi toi Database thanh cong thi moi Start Server Back-end len
// console.log("1, Connecting to MongoDB Cloud Atlas...");
// CONNECT_DB()
//   .then(() => console.log("ket noi thanh cong"))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error);
//     process.exit(0);
//   });
