import {
    SET_UPLOAD_PROGRESS ,
    SUCCESS_UPLOAD_FILE,
    FAILURE_UPLOAD_FILE
} from "../actions/types";

let initialState = {
    fileProgress: {},
    uploadFile: []
}


export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case SET_UPLOAD_PROGRESS:
        return {
          ...state,
          fileProgress: {
            ...state.fileProgress,
            [payload.id]: {
              ...state.fileProgress[payload.id],
              progress: payload.progress,
            },
          },
        }
      case SUCCESS_UPLOAD_FILE:
        return {
          ...state,
          fileProgress: {
            ...state.fileProgress,
            [payload]: {
              ...state.fileProgress[payload],
              status: 1,
            },
          },
        }
      case FAILURE_UPLOAD_FILE:
        return {
          ...state,
          fileProgress: {
            ...state.fileProgress,
            [payload]: {
              ...state.fileProgress[payload],
              status: 0,
              progress: 0,
            },
          },
        }
      default:
        return state;
    }
  }
  