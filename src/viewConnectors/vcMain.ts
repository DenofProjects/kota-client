import { downloadUserData, setEmail, setPassword, setReturningUserValue, submitReport, uploadFile, uploadReturningUserFile } from "../reducerActions/mainReducerActions";

export const mapStateToProps = (state: any) => {
  return { mainState: state.mainReducerState };
};

export function mapDispatchToProps(dispatch: any) {
  return {
    handleFileChange: (event: any) => {
      const file = event.target.files[0];
      dispatch(uploadFile(file));
    },

    handleReturningUserFileUpload: (event: any) => {
      const file = event.target.files[0];
      dispatch(uploadReturningUserFile(file));
    },

    submitReport: () => {
      dispatch(submitReport());
    },

    downloadUserData: () => {
      dispatch(downloadUserData(dispatch));
    }
    ,

    handleRadioChange: () => {
      dispatch(setReturningUserValue());
    },

    setEmail: (email: string) => {
      dispatch(setEmail(email));
    },

    setPassword: (password: string) => {
      dispatch(setPassword(password));
    }
  };
}
