import React from "react";
import Chevron from "../icons/chevron";

const screenshotDiffItem = (diff, openUrl, isExpanded) => (
  <li className={'screenshot-diff-item'}>
    <h4>{diff.path} <br/> {diff.fileName}</h4>
    <Chevron className={isExpanded ? 'point-down' : 'point-right'}/>
    <ul className='image-comparison'>
      <li>
        <img src={diff.imageMaster} onClick={() =>  openUrl(diff.imageMaster)}/>
        <label>Master</label>
      </li>
      <li>
        <img src={diff.imageDifference} onClick={() =>  openUrl(diff.imageDifference)}/>
        <label>Difference</label>
      </li>
      <li>
        <img src={diff.imageBranch} onClick={() =>  openUrl(diff.imageBranch)}/>
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
    const {screenshotDiffs, openUrl} = this.props;
    return <div id="screenshot-diffs-tab">
      <ul>
        {
          screenshotDiffs.files.map(diff => (
            <li className='file-screenshot-diff-group'>
              <ul>
                {
                  diff.screenshots.map(diff => screenshotDiffItem(diff, openUrl))
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

