import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../viewConnectors/vcMain";
import TextFieldCreator from "./TextFieldCreator";
import ExcelParserForReturningUser from "./excelParser";

interface MainViewProps {
  readonly mainState: any;
  readonly onIncrimentClick: () => void;
  readonly onDecrimentClick: () => void;
  readonly handleFileChange: (e: any) => any;
  readonly handleReturningUserFileUpload: (e: any) => any;
  readonly submitReport: () => any;
  readonly downloadUserData: () => any;
  readonly handleRadioChange: () => any;
}

class Main extends React.Component<MainViewProps> {
  componentDidMount() { console.log("Application started..."); }

  render() {
    return (
      <React.Fragment>
        <div>
          <input type="file" onChange={this.props.handleFileChange} />
          <TextFieldCreator props={this.props} />
        </div>

        <button onClick={this.props.submitReport}>Submit</button>
        <button onClick={this.props.downloadUserData}>Download</button>

        <div>Are you returning user?</div>
        <label>
          <input type="checkbox" name="option1" value="Option 1" onClick={this.props.handleRadioChange} />
        </label>

        <div hidden={!this.props.mainState.isReturningUser}>
          <input type="file" onChange={this.props.handleReturningUserFileUpload} />
          <ExcelParserForReturningUser props={this.props} />
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
