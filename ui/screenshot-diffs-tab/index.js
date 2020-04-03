import React from "react";
import ScreenshotDiffItem from "./diff-item.js";
import WithBranchChange  from '../withBranchChange';

class ScreenshotDiffs extends React.Component {
  render() {
    const {screenshotDiffs, openUrl, sendHttpRequest, openFile} = this.props;
    return <div id="screenshot-diffs-tab">
      <ul>
        {
          screenshotDiffs.files.length ? screenshotDiffs.files.map(diff => (
            <li className='file-screenshot-diff-group'>
              <ul>
                {
                  diff.screenshots.map(diff => <ScreenshotDiffItem
                    diff={diff}
                    openUrl={openUrl}
                    sendHttpRequest={sendHttpRequest}
                    openFile={openFile}
                  />)
                }
              </ul>
            </li>
          )) : "No screenshot diffs found."
        }
      </ul>
    </div>;
  }
}

export default WithBranchChange(ScreenshotDiffs);

