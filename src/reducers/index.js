import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import message from "./message";
import model from "./model";
import upload from "./uploadFile";
import payment from "./payment";
import product from "./product";

export default combineReducers({
  auth,
  user,
  model,
  upload,
  payment,
  message,
  product,
});
