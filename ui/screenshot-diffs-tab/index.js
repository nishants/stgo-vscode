import React from "react";
import ScreenshotDiffItem from "./diff-item.js";

class ScreenshotDiffs extends React.Component {
  componentDidMount() {
    this.props.getScreenshotDiffs(this.props.branchName);
  }

  render() {
    const {screenshotDiffs, openUrl, sendHttpRequest, openFile} = this.props;
    debugger;
    return <div id="screenshot-diffs-tab">
      <ul>
        {
          screenshotDiffs.files.length ? screenshotDiffs.files.map(diff => (
            <li className='file-screenshot-diff-group'>
              <ul>
                {
                  diff.screenshots.map(diff => <ScreenshotDiffItem diff={diff} openUrl={openUrl} sendHttpRequest={sendHttpRequest} openFile={openFile}/>)
                }
              </ul>
            </li>
          )) : "No screenshot diffs found."
        }
      </ul>
    </div>;
  }
}

export default ScreenshotDiffs;

