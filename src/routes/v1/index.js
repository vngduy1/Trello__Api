import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardRoutes } from "./boardRouter";
const Router = express.Router();

Router.get("/status", (req, res) => {
  //Tra ve mot ma code
  res.status(StatusCodes.OK).json({ message: "api v1 are you ready to use." });
});

Router.use("/boards", boardRoutes);

export const APIs_V1 = Router;
