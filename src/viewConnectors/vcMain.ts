import { downloadUserData, submitReport, uploadFile } from "../reducerActions/mainReducerActions";

export const mapStateToProps = (state: any) => {
  return { mainState: state.mainReducerState };
};

export function mapDispatchToProps(dispatch: any) {
  return {
    handleFileChange: (event: any) => {
      const file = event.target.files[0];
      dispatch(uploadFile(file));
    },
    submitReport: () => {
      dispatch(submitReport());
    },

    downloadUserData: () => {
      dispatch(downloadUserData(dispatch));
    }
  };
}
