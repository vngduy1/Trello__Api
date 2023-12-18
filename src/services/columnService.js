import { columnModel } from "~/models/columnModel";
import { boardModel } from "~/models/boardModel";

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody,
    };

    const createColumn = await columnModel.createNew(newColumn);

    const getNewColumn = await columnModel.findOneById(createColumn.insertedId);

    //Xu ly logic
    if (getNewColumn) {
      //Xu ly cau truc data o day truoc khi du lieu tra ve
      getNewColumn.cards = [];

      //Cap nhat mang columnOrderIds trong collection boards
      await boardModel.pushColumnOrderIds(getNewColumn);
    }
    return getNewColumn;
  } catch (error) {
    throw error;
  }
};

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now(),
    };
    const updateColumn = await columnModel.update(columnId, updateData);

    return updateColumn;
  } catch (error) {
    throw error;
  }
};

export const columnService = {
  createNew,
  update,
};
