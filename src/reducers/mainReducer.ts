import { Reducer } from "redux";
import mainActionTypes from "../actionTypes/mainActionTypes";
import { mainDTO } from "../DTOs/mainDTO";

const initialState: mainDTO = {
  count: 0,
  file: null,
  data: null
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
    case mainActionTypes.PARSE_EXCEL_DATA:
      return { ...state, data: action.payload };

    default: {
      return newState;
    }
  }
};

export default mainReducer;
