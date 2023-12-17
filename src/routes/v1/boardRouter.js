import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardValidation } from "~/validations/boardValidation";
import { boardController } from "~/controllers/boardController";

const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "GET: API get list boards" });
  })
  //Tao moi mot cai ban ghi
  .post(boardValidation.createNew, boardController.createNew);

Router.route("/:id").get(boardController.getDetails);
// .push();

export const boardRoutes = Router;
