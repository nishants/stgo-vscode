import React from "react";

class ScreenshotDiffs extends React.Component {
  st
  render() {
    const {screenshotDiffs} = this.props;
    return <div id="screenshot-diffs-tab">
      <ul>
        {
          screenshotDiffs.map(diff => (
            <li>
              {JSON.stringify(diff)}
            </li>
          ))
        }
      </ul>
    </div>;
  }
}

export default () => {

};

