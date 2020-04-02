import React from "react";

const screenshotDiffItem = () => {

};

class ScreenshotDiffs extends React.Component {
  componentDidMount() {
    this.props.getScreenshotDiffs(this.props.branchName);
  }

  render() {
    const {screenshotDiffs} = this.props;
    return <div id="screenshot-diffs-tab">
      <ul>
        {
          screenshotDiffs.files.map(diff => (
            <li>
              {JSON.stringify(diff)}
            </li>
          ))
        }
      </ul>
    </div>;
  }
}

export default ScreenshotDiffs;

