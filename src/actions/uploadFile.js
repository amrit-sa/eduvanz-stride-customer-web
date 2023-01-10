import {
    SET_UPLOAD_PROGRESS ,
    SUCCESS_UPLOAD_FILE,
    FAILURE_UPLOAD_FILE
} from "./types";


import UserService from "../services/user.service";



export const setUploadProgress = (id, progress) => ({
    type: SET_UPLOAD_PROGRESS,
    payload: {
      id,
      progress,
    },
  })
  
  export const successUploadFile = id => ({
    type: SUCCESS_UPLOAD_FILE,
    payload: id,
  })
  
  export const failureUploadFile = id => ({
    type: FAILURE_UPLOAD_FILE,
    payload: id,
  })

  export const getDocCategory = () => (dispatch) => {
    return UserService.get('document_types_category?documentcategory=true').then(
      (response) => {
        return response;
      });
  };
  

  export const getDocTypeName = (givenData) => (dispatch) => {
    return UserService.post(givenData,'document_types_category?doctype=true').then(
      (response) => {
        return response;
      });
  };

