import { uploadFile } from "../reducerActions/mainReducerActions";

export const mapStateToProps = (state: any) => {
  return { mainState: state.mainReducerState };
};

export function mapDispatchToProps(dispatch: any) {
  return {
    handleFileChange: (event: any) => {
      const file = event.target.files[0];
      dispatch(uploadFile(file));
    },
    handleInputChange: (row: any, col: any, value: any) => {
      console.log("data is : ");
      console.log(row, col, value);
    }
  };
}
