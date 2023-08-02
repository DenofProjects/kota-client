import mainActionTypes from "../actionTypes/mainActionTypes";

export const uploadFile = (file: any) => ({
  type: mainActionTypes.UPLOAD_FILE,
  payload: file,
});

export const uploadReturningUserFile = (file: any) => ({
  type: mainActionTypes.UPLOAD_RETURNING_USER_FILE,
  payload: file
});

export const parseExcelData = (data: any[]) => ({
  type: mainActionTypes.PARSE_EXCEL_DATA,
  payload: data,
});

export const parseReturningUserExcelData = (data: any[]) => ({
  type: mainActionTypes.PARSE_RETURNING_USER_EXCEL_DATA,
  payload: data,
});

export const handleInputChange = (row: any, col: any, value: any) => ({
  type: mainActionTypes.HANDLE_INPUT_CHANGE,
  row: row,
  col: col,
  value: value
});

export const updateRowCol = (row: any, col: any) => ({
  type: mainActionTypes.UPDATE_ROW_COL_SIZE,
  row: row,
  col: col
});

export const submitReport = () => ({
  type: mainActionTypes.SUBMIT_REPORT,
});

export const downloadUserData = (dispatch: any) => ({
  type: mainActionTypes.DOWNLOAD_USER_DATA,
  dispatch: dispatch
});

export const setReturningUserValue = () => ({
  type: mainActionTypes.SET_RETURNING_USER_VALUE,
});