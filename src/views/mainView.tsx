import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../viewConnectors/vcMain";
import TextFieldCreator from "./TextFieldCreator";

interface MainViewProps {
  readonly mainState: any;
  readonly onIncrimentClick: () => void;
  readonly onDecrimentClick: () => void;
  readonly handleFileChange: (e: any) => any;
  readonly submitReport: () => any;
}

class Main extends React.Component<MainViewProps> {
  componentDidMount() { }

  render() {
    return (
      <React.Fragment>
        <div>
          <input type="file" onChange={this.props.handleFileChange} />
        </div>

        <button onClick={this.props.submitReport}>Submit</button>

        <TextFieldCreator props={this.props} />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
