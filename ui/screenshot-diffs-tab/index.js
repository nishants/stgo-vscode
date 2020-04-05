import React from 'react';
import ScreenshotDiffItem from './diff-item.js';

class ScreenshotDiffs extends React.Component {
    loadDataForBranch() {
        this.props.getScreenshotDiffs(this.props.branchName);
    }

    componentDidMount() {
        this.loadDataForBranch();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentBranchName !== this.props.currentBranchName) {
            this.loadDataForBranch();
        }
    }

    render() {
        const {
            screenshotDiffs,
            openUrl,
            sendHttpRequest,
            openFile,
        } = this.props;
        return (
            <div id="screenshot-diffs-tab">
                <ul>
                    {screenshotDiffs.files.length
                        ? screenshotDiffs.files.map((diff) => (
                              <li className="file-screenshot-diff-group">
                                  <ul>
                                      {diff.screenshots.map((diff) => (
                                          <ScreenshotDiffItem
                                              diff={diff}
                                              openUrl={openUrl}
                                              sendHttpRequest={sendHttpRequest}
                                              openFile={openFile}
                                          />
                                      ))}
                                  </ul>
                              </li>
                          ))
                        : 'No screenshot diffs found.'}
                </ul>
            </div>
        );
    }
}

export default ScreenshotDiffs;
