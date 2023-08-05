import axios from "axios";
import { Messages } from "../constants/Messages";
import { clearReturningUserData, loggingIn, setErrorMessage } from "../reducerActions/mainReducerActions";
import { EndPoints } from "../constants/EndPoint";

export function fetchUserDetails() {
    return (dispatch: any, getState: any) => {
        console.log(getState());
        const uri = EndPoints.BASE_URL;

        const userEmail = getState().mainReducerState.userEmail;
        const userPassword = getState().mainReducerState.userPassword;

        if (userEmail != "" && userPassword != "") {
            // const resp = [{ "Name": "Rahul", "LastName": "Verma", "Email": "rahulverma@gmail.com", "Password": "password" }, { "Name": "nikki ", "LastName": "yadav", "Email": "nikki@gmail.com", "Password": "password" }];
            axios
                .get(uri)
                .then((result) => {
                    if (result) {
                        console.log(JSON.stringify(result.data));
                        const resp = result.data;
                        const user = resp.find((user: any) => user.Email === userEmail);

                        console.log("user found is : ", user);

                        if (user) {
                            // User found, check the password
                            if (user.Password === userPassword) {
                                // Password matches, handle successful login (e.g., redirect to a new page)
                                console.log('Login successful!');
                                dispatch(loggingIn());
                            } else {
                                dispatch(setErrorMessage(Messages.ERROR_PASSWORD_NOT_FOUND));
                            }
                        } else {
                            console.log("setting user not found error");
                            dispatch(setErrorMessage(Messages.ERROR_USERNAME_NOT_FOUND));
                        }
                        //   dispatch(showNotification(result.data));
                    }
                })
                .catch((err) => {
                    console.log(err.response);
                    dispatch(setErrorMessage(Messages.ERROR_FETCHING_USER_DETAILS));
                });
        }
    };
}

export function saveFilledDataAndErrorCountSoFarOnDownload(userEmail: any, filledDataCount: any, errorsSoFar: any) {
    return (dispatch: any, _getState: any) => {
        const uri = EndPoints.BASE_URL + "/Email/" + userEmail;

        if (userEmail != "") {
            // const resp = [{ "Name": "Rahul", "LastName": "Verma", "Email": "rahulverma@gmail.com", "Password": "password" }, { "Name": "nikki ", "LastName": "yadav", "Email": "nikki@gmail.com", "Password": "password" }];
            axios
                .patch(uri, { filledDataCount: filledDataCount, errorsSoFar: errorsSoFar })
                .then((result) => {
                    if (result) {
                        console.log(JSON.stringify(result.data));
                        console.log("Data saved successfully");
                    } else {
                        dispatch(setErrorMessage(Messages.ERROR_SAVING_DATA_ON_DOWNLOAD));
                    }
                })
                .catch((err) => {
                    console.log("In catch saveFilledDataAndErrorCountSoFarOnDownload ", JSON.stringify(err.response), err.response);
                    dispatch(setErrorMessage(Messages.ERROR_SAVING_DATA_ON_DOWNLOAD));
                });
        }
    };
}

export function matchPrevDataAndSheetDataForReturningUser(userEmail: string, filledDataCount: number, errorsSoFar: number): any {
    return (dispatch: any, _getState: any) => {
        const uri = EndPoints.BASE_URL;

        if (userEmail != "") {
            // const resp = [{ "Name": "Rahul", "LastName": "Verma", "Email": "rahulverma@gmail.com", "Password": "password" }, { "Name": "nikki ", "LastName": "yadav", "Email": "nikki@gmail.com", "Password": "password" }];
            axios
                .get(uri)
                .then((result) => {
                    if (result) {
                        console.log(JSON.stringify(result.data));
                        const user = result.data.find((user: any) => user.Email === userEmail);
                        const filledDataCountResp = user.filledDataCount;
                        const errorsSoFarResp = user.errorsSoFar;
                        if (filledDataCountResp != filledDataCount && errorsSoFarResp != errorsSoFar) {
                            dispatch(setErrorMessage(Messages.ERROR_MATCHING_DATA));
                            dispatch(clearReturningUserData());
                        } else {
                            console.log("All good...");
                        }
                    } else {
                        dispatch(setErrorMessage(Messages.ERROR_MATCHING_DATA));
                        dispatch(clearReturningUserData());
                    }
                })
                .catch((err) => {
                    console.log("In catch saveFilledDataAndErrorCountSoFarOnDownload ", JSON.stringify(err.response), err.response);
                    dispatch(setErrorMessage(Messages.ERROR_MATCHING_DATA));
                });
        }
    };
}