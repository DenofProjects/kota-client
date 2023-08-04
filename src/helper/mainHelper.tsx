import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";

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

    static countErrorsSoFar(userData: any, data: any, row: any, col: any) {
        let errorsSoFar: number = 0;
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (userData[i]) {
                    if (userData[i][j]) {
                        if (userData[i][j] != data[i][j]) {
                            console.log("increasing error count");
                            errorsSoFar++;
                        }
                    }
                }
            }
        }
        return errorsSoFar;
    }

    static getRedCells(resultData: any, data: any, row: any, col: any) {
        let redCells: any = [];
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (resultData[i][j] != data[i][j]) {
                    let redCell: any = {};
                    redCell.row = i;
                    redCell.col = j;
                    redCells.push(redCell);
                }
            }
        }
        return redCells;
    }

    static async convert2dArrayToExcelSheet(data: any, redCells: any) {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(data);

        // Apply red color to specific cells
        // redCells.forEach((row: any, col: any) => {
        //     const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });

        //     // Get the cell object (if it already exists)
        //     const cell = worksheet[cellAddress];

        //     // Create or update the cell with the desired style
        //     XLSX.utils.sheet_add_aoa(worksheet, [[{ v: "Value", s: { fill: { fgColor: { rgb: "#FF0000" } } } }]], { origin: cellAddress });
        // });

        redCells.forEach((row: any, col: any) => {
            const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });

            // Create or update the cell with the desired style
            XLSX.utils.sheet_add_aoa(worksheet, [[{ v: "Value", s: { fill: { fgColor: { rgb: "#FF0000" } } } }]], { origin: cellAddress });
        });
        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Write the workbook to a file
        XLSX.writeFile(workbook, "output.xlsx");
    }
}