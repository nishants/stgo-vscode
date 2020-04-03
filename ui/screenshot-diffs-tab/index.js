import React from "react";
import ScreenshotDiffItem from "./diff-item.js";


class ScreenshotDiffs extends React.Component {
  componentDidMount() {
    this.props.getScreenshotDiffs(this.props.branchName);
  }

  render() {
    const {screenshotDiffs, openUrl, sendHttpRequest} = this.props;
    return <div id="screenshot-diffs-tab">
      <ul>
        {
          screenshotDiffs.files.map(diff => (
            <li className='file-screenshot-diff-group'>
              <ul>
                {
                  diff.screenshots.map(diff => <ScreenshotDiffItem diff={diff} openUrl={openUrl} sendHttpRequest={sendHttpRequest}/>)
                }
              </ul>

            </li>
          ))
        }
      </ul>
    </div>;
  }
}

export default ScreenshotDiffs;

