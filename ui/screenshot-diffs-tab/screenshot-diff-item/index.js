import React from "react";

class ScreenshotDiffs extends React.Component {
  render() {
    const {screenshotDiffs} = this.props;
    return <div id="screenshot-diffs-tab">
      <ul>
        {
          screenshotDiffs.map(diff => (
            <li>
              {diff.path}json

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

export default () => {

};

