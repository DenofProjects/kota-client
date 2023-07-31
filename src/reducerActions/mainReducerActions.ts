import mainActionTypes from "../actionTypes/mainActionTypes";

export const uploadFile = (file: any) => ({
  type: mainActionTypes.UPLOAD_FILE,
  payload: file,
});
export const parseExcelData = (data: any[]) => ({
  type: mainActionTypes.PARSE_EXCEL_DATA,
  payload: data,
});

export const handleInputChange = (row: any, col: any, value: any) => ({
  type: mainActionTypes.HANDLE_INPUT_CHANGE,
  row: row,
  col: col,
  value: value
});
