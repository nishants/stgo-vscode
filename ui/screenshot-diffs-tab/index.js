import React from "react";

const screenshotDiffItem = (diff) => (
  <li className={'screenshot-diff-item'}>
    <h4>{diff.fileName}</h4>
    <ul className='image-comparison'>
      <li>
        <label>Master</label>
        <img src={diff.imageMaster}/>
      </li>
      <li>
        <label>Difference</label>
        <img src={diff.imageDifference}/>
      </li>
      <li>
        <label>Branch</label>
        <img src={diff.imageBranch}/>
      </li>
    </ul>
  </li>
);

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
            <li className='file-screenshot-diff-group'>
              <h3>
                {diff.path}
              </h3>

              <ul>
                {
                  diff.screenshots.map(diff => screenshotDiffItem(diff))
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

