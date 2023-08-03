import axios from "axios";

export function createOrUpdateCoupons() {
    return (_dispatch: any, getState: any) => {
        console.log(getState());
        const uri = "https://sheetdb.io/api/v1/2ibxtf5r7x04h";
        axios
            .get(uri)
            .then((result) => {
                if (result) {
                    console.log(JSON.stringify(result.data));
                    //   dispatch(showNotification(result.data));
                }
            })
            .catch((err) => {
                console.log(err.response);
                // dispatch(showNotification(err.response.data));
            });
    };
}