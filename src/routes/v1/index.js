import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardRoutes } from "./boardRouter";
import { columnRoutes } from "./columnRoutes";
import { cardRoutes } from "./cardRoutes";
const Router = express.Router();

Router.get("/status", (req, res) => {
  //Tra ve mot ma code
  res.status(StatusCodes.OK).json({ message: "api v1 are you ready to use." });
});
//Board APIs
Router.use("/boards", boardRoutes);

//Column APIs
Router.use("/columns", columnRoutes);

//Cards APIs
Router.use("/cards", cardRoutes);

export const APIs_V1 = Router;
