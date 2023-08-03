import axios from "axios";
import { Messages } from "../constants/Messages";
import { loggingIn, setErrorMessage } from "../reducerActions/mainReducerActions";

export function fetchUserDetails() {
    return (dispatch: any, getState: any) => {
        console.log(getState());
        const uri = "https://sheetdb.io/api/v1/2ibxtf5r7x04h";

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