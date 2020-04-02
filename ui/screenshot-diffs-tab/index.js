import React from "react";

const screenshotDiffItem = (diff) => (
  <li className={'screenshot-diff-item'}>
    <h4>{diff.path} <br/> {diff.fileName}</h4>
    <ul className='image-comparison'>
      <li>
        <img src={diff.imageMaster}/>
        <label>Master</label>
      </li>
      <li>
        <img src={diff.imageDifference}/>
        <label>Difference</label>
      </li>
      <li>
        <img src={diff.imageBranch}/>
        <label>Branch</label>
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

