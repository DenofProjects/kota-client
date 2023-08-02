import { Reducer } from "redux";
import mainActionTypes from "../actionTypes/mainActionTypes";
import { mainDTO } from "../DTOs/mainDTO";
import { MainHelper } from "../helper/mainHelper";

const initialState: mainDTO = {
  file: null,
  data: null,
  returningUserFile: null,
  userData: [],
  resultData: [],
  returningUserData: [],
  row: 0,
  col: 0,
  tempData: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]],
  isReturningUser: false
};

const mainReducer: Reducer<mainDTO> = (
  state = initialState,
  action
) => {
  const newState = { ...state };
  switch (action.type) {

    case mainActionTypes.UPDATE_ROW_COL_SIZE: {
      newState.row = action.row;
      newState.col = action.col;
      for (let i = 0; i < newState.row; i++) {
        for (let j = 0; j < newState.col; j++) {
          if (newState.userData != null && newState.resultData != null && newState.returningUserData != null) {
            newState.userData[i] = [];
            newState.resultData[i] = [];
            newState.returningUserData[i] = [];
          }
        }
      }
      return newState;
    }

    case mainActionTypes.UPLOAD_FILE:
      return { ...state, file: action.payload, data: null };

    case mainActionTypes.UPLOAD_RETURNING_USER_FILE: {
      console.log("uploading returning user file");
      newState.returningUserFile = action.payload;
      return newState;
    }

    case mainActionTypes.PARSE_EXCEL_DATA: {
      return { ...state, data: action.payload };
    }

    case mainActionTypes.PARSE_RETURNING_USER_EXCEL_DATA: {
      console.log("PARSE_RETURNING_USER_EXCEL_DATA : ", action.payload);
      for (let i = 0; i < newState.row; i++) {
        for (let j = 0; j < newState.col; j++) {
          if (newState.returningUserData !== null) {
            if (action.payload[i] != undefined) {
              newState.returningUserData[i][j] = action.payload[i][j];
            }
          }
        }
      }

      // newState.returningUserData = action.payload;
      console.log("set data to returningUserData in reducer : ", newState.returningUserData);
      return newState;
    }

    case mainActionTypes.HANDLE_INPUT_CHANGE: {
      console.log(action.row, action.col, action.value);
      if (newState.userData != null)
        newState.userData[action.row][action.col] = action.value;
      console.log("final user data : ", newState.userData);
      return newState;
    };

    case mainActionTypes.SUBMIT_REPORT: {
      console.log("in submit report");
      console.log("user data is : ", newState.userData);
      console.log("excel data : ", newState.data);
      console.log("returning user data : ", newState.returningUserData);

      MainHelper.copyReturningUserDataToUserData(newState.returningUserData, newState.userData, newState.row, newState.col);
      MainHelper.convertStringToInteger(newState.userData, newState.row, newState.col);
      console.log("user data after converting : ", newState.userData);

      for (let i = 0; i < newState.row; i++) {
        for (let j = 0; j < newState.col; j++) {
          if (newState.userData !== null && newState.data !== null && newState.resultData !== null) {
            if (newState.userData[i][j] !== newState.data[i][j]) {
              newState.resultData[i][j] = -1;
            } else {
              newState.resultData[i][j] = newState.data[i][j];
            }
          }
        }
      }
      console.log("final result metrix : ", newState.resultData);
      return newState;
    }

    case mainActionTypes.DOWNLOAD_USER_DATA: {
      if (newState.resultData != null)
        console.log("Data we are sending to mainhelper to download : ", newState.userData);
      MainHelper.copyReturningUserDataToUserData(newState.returningUserData, newState.userData, newState.row, newState.col);
      MainHelper.convertStringToInteger(newState.userData, newState.row, newState.col);
      action.dispatch(MainHelper.downloadUserData_Helper(newState.userData));
      return newState;
    }

    case mainActionTypes.SET_RETURNING_USER_VALUE: {
      newState.isReturningUser = !newState.isReturningUser;
      console.log("returning user value : ", newState.isReturningUser);
      return newState;
    }

    default: {
      return newState;
    }
  }
};

export default mainReducer;
