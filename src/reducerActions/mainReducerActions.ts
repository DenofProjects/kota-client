import mainActionTypes from "../actionTypes/mainActionTypes";

export const uploadFile = (file: any) => ({
  type: mainActionTypes.UPLOAD_FILE,
  payload: file,
});
export const parseExcelData = (data: any[]) => ({
  type: mainActionTypes.PARSE_EXCEL_DATA,
  payload: data,
});
