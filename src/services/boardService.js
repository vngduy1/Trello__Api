import { slugify } from "~/utils/formatters";
import { boardModel } from "~/models/boardModel";

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

export const boardService = {
  createNew,
};
