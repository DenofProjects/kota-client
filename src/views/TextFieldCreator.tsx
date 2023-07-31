// TextFieldCreator.tsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import { handleInputChange, parseExcelData, updateRowCol } from "../reducerActions/mainReducerActions";

const TextFieldCreator = (props: any) => {
  const dispatch = useDispatch();
  const file = props.props.mainState.file;
  const data = props.props.mainState.data;

  useEffect(() => {
    if (file) {
      parseExcelFile(file);
    }
  }, [file]);
  const parseExcelFile = (file: any): void => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const target = e.target;
        if (!target || !target.result) {
          throw new Error("Failed to read the file.");
        }

        const result = target.result;
        const data =
          typeof result === "string"
            ? strToArrBuf(result)
            : new Uint8Array(result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(
          workbook.Sheets[firstSheetName],
          { header: 1 }
        );
        console.log("Sheet Data:", sheetData); // Add this line to debug
        console.log("row", sheetData.length);
        if (sheetData[0] && sheetData[0] instanceof Array) {
          console.log("col", sheetData[0].length);
          dispatch(updateRowCol(sheetData.length, sheetData[0].length));
        }
        dispatch(parseExcelData(sheetData));
      } catch (error: any) {
        console.error("Error parsing Excel data:", error.message);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const strToArrBuf = (str: string): ArrayBuffer => {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0; i < str.length; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  const renderTextFields = (): React.ReactNode => {
    if (data && data.length > 0) {
      return data.map((row: any, rowIndex: number) => (
        <div key={rowIndex}>
          {Object.keys(row).map((key, colIndex) => (
            <input key={colIndex} type="text" onPaste={handlePaste}
              onContextMenu={handleContextMenu}
              onChange={(e) =>
                dispatch(handleInputChange(rowIndex, colIndex, e.target.value))
              }
            />
          ))}
        </div>
      ));
    }
    return null;
  };

  return (
    <div>
      {data && data.length > 0 ? (
        <div>{renderTextFields()}</div>
      ) : (
        <div>No data available. Please upload an Excel file.</div>
      )}
    </div>
  );
};

export default TextFieldCreator;
