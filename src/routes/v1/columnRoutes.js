import express from "express";
import { columnValidation } from "~/validations/columnValidation";
import { columnController } from "~/controllers/columnController";

const Router = express.Router();

Router.route("/")
  //Tao moi mot cai ban ghi
  .post(columnValidation.createNew, columnController.createNew);

Router.route("/:id")
  .put(columnValidation.update, columnController.update)
  .delete(columnValidation.deleteItem, columnController.deleteItem);

export const columnRoutes = Router;
