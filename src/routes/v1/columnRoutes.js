import express from "express";
import { columnValidation } from "~/validations/columnValidation";
import { columnController } from "~/controllers/columnController";

const Router = express.Router();

Router.route("/")
  //Tao moi mot cai ban ghi
  .post(columnValidation.createNew, columnController.createNew);

export const columnRoutes = Router;
