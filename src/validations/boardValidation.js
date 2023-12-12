import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  //Mac  dinh khong can customMessage o phia BE
  //BE chi can validate dam bao du lieu chuan xac, va tra ve message mac dinh tu thu vien la duoc
  //Viec Validate du lieu BAT BUOC phai co o phia BE vi day la diem cuoi de luu tru du lieu vao Database
  //Trong thuc te, dieu tot nhat cho he thong la hay luon Validate du lieu o cai BE va FE
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      "any.required": "Title is required (DVN)",
      "string.empty": "Title is not allowed to be empty (DVN)",
      "string.min": "Title min 3 chars (DVN)",
      "string.max": "Title max 50 chars (DVN)",
      "string.trim": "Title must not have leading or trailing whitespace (DVN)",
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
  });

  try {
    //Chi dinh abortEarly: false de truong hop co nhieu loi se tra ve tat ca loi
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    //Validate du lieu xong xuoi hop le thi cho request di tiep sang Controller
    next();
  } catch (error) {
    const errorMessage = new Error(error).message;
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      errorMessage
    );
    next(customError);
  }
};

export const boardValidation = {
  createNew,
};
