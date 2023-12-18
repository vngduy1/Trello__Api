import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";

const createNew = async (req, res, next) => {
  try {
    // console.log("req.body", req.body);
    // console.log("req.query", req.query);
    // console.log("req.params", req.params);
    // console.log("req.files", req.files);
    // console.log("req.cookies", req.cookies);
    // console.log("req.jwtDecoded", req.jwtDecoded);

    //Dieu huong du lieu sang tang Service
    const createBoard = await boardService.createNew(req.body);

    //Co ket qua thi tra ve phia Client
    res.status(StatusCodes.CREATED).json(createBoard);
  } catch (error) {
    next(error);
  }
};

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id;

    const board = await boardService.getDetails(boardId);
    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id;

    const updateBoard = await boardService.update(boardId, req.body);
    res.status(StatusCodes.OK).json(updateBoard);
  } catch (error) {
    next(error);
  }
};

const moveCardToDifferentColumn = async (req, res, next) => {
  try {
    const result = await boardService.moveCardToDifferentColumn(req.body);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn,
};
