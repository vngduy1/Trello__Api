import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "./environment";

let trelloDatabaseInstance = null;

//Khoi tao mot doi tuong mongoClientInstance de connect toi MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//Ket noi toi Database
export const CONNECT_DB = async () => {
  //Goi ket noi toi MongoBD Atlas voi Uri da khai bao trong than mongoClientInstance
  await mongoClientInstance.connect();

  //Ket noi thanh cong thi lay ra Database theo ten a gan nguoc no lai vao bien
  //trelloDatabaseInstance o tren cua chung ta
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

//Dong ket noi toi Datavase khi can
export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};

//Function (khong async) nay co nhiem vu export ra cai Trello Database Instance sau khi da connect thanh
//cong toi MongoDB de chung ta su dung o nhieu noi khac nhau trong code
//phai dam bao luon goi cai getDB nay sau khi da ket noi thanh cong voi MongoDB
export const GET_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error("Hay ket noi toi co so du lieu truoc di");
  return trelloDatabaseInstance;
};
