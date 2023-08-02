import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export class MainHelper {
    static downloadUserData_Helper(resultData: any) {
        console.log("Data to download : ", resultData);
        const worksheet = XLSX.utils.aoa_to_sheet(resultData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const excelBuffer = XLSX.write(workbook, { type: "array" });
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, "user-data.xlsx");
    }

    static copyReturningUserDataToUserData(returningUserData: any, userData: any, row: any, col: any) {
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (!userData[i][j])
                    userData[i][j] = returningUserData[i][j];
            }
        }
        console.log("copied returning user data to user data : ", userData);
    }

    static convertStringToInteger(userData: any, row: any, col: any) {
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (userData[i][j])
                    userData[i][j] = Math.floor(userData[i][j]);
            }
        }
    }
}