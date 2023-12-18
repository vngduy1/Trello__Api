import express from "express";
import { cardValidation } from "~/validations/cardValidation";
import { cardController } from "~/controllers/cardController";

const Router = express.Router();

Router.route("/")
  //Tao moi mot cai ban ghi
  .post(cardValidation.createNew, cardController.createNew);

export const cardRoutes = Router;
