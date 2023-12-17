import { slugify } from "~/utils/formatters";
import { boardModel } from "~/models/boardModel";
import ApiError from "~/utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";

const createNew = async (reqBody) => {
  try {
    //Xu ly logic du lieu tuy dac thu du an
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };

    //Goi toi tang Model de xu ly luu ban ghi newBoard vao trong Database
    const createBoard = await boardModel.createNew(newBoard);
    console.log(createBoard);

    const getNewBoard = await boardModel.findOneById(createBoard.insertedId);
    //Tra ket qua ve trong service luon phai co return
    return getNewBoard;
  } catch (error) {
    throw error;
  }
};

const getDetails = async (boardId) => {
  try {
    console.log(boardId);
    const board = await boardModel.getDetails(boardId);
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Board not found!");
    }

    //Tao ra board clone moi de xu ly khong anh huong den cai cu
    const resBoard = cloneDeep(board);
    //Dua card ve dung column cua no
    resBoard.columns.forEach((column) => {
      //DUng method cua mongoDb
      column.cards = resBoard.cards.filter((card) =>
        card.columnId.equals(column._id)
      );
      //method cua javaScript
      // column.cards = resBoard.cards.filter(
      //   (card) => card.columnId.toString() === column._id.toString()
      // );
    });
    //Xoa mang cards khoi board ban dau
    delete resBoard.cards;

    return resBoard;
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
  getDetails,
};
