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
              {diff.path}

              <ul>
                {
                  diff.screenshots.map(diff => (
                    <li>
                      {diff.fileName} : {`${diff.approved}`}
                    </li>
                  ))
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

