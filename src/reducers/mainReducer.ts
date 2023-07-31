import { Reducer } from "redux";
import mainActionTypes from "../actionTypes/mainActionTypes";
import { mainDTO } from "../DTOs/mainDTO";

const initialState: mainDTO = {
  count: 0,
  file: null,
  data: null,
  userData: null
};

const mainReducer: Reducer<mainDTO> = (
  state = initialState,
  action
) => {
  const newState = { ...state };
  switch (action.type) {
    case mainActionTypes.INCRIMENT: {
      newState.count++;
      return newState;
    }

    case mainActionTypes.DECRIMENT: {
      newState.count--;
      return newState;
    }

    case mainActionTypes.UPLOAD_FILE:
      return { ...state, file: action.payload, data: null };
    case mainActionTypes.PARSE_EXCEL_DATA: {
      console.log("in reducer payload is : " + action.payload)
      return { ...state, data: action.payload };
    }

    case mainActionTypes.HANDLE_INPUT_CHANGE: {
      console.log(action.row, action.col, action.value);
      // newState.userData[action.row][action.col] = action.value;
      return newState;
    };

    default: {
      return newState;
    }
  }
};

export default mainReducer;
