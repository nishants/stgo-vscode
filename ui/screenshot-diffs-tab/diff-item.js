import React from "react";
import Chevron from "../icons/chevron";

class ScreenshotDiffItem extends React.Component {
  state = {isExpanded: true}

  static getDerivedStateFromProps(props, state) {
    return {isExpanded: state.isExpanded ||! props.diff.approved};
  }

  toggleCollapse() {
    console.log('toggle', this.state.isExpanded)
    this.setState({isExpanded: !this.state.isExpanded});
  }

  render() {
    const {diff, openUrl} = this.props;
    const {isExpanded} = this.state;

    return (
      <li className={`screenshot-diff-item ${isExpanded ? 'expanded' : ''}`} key={diff.path+diff.fileName}>
        <h4>{diff.path} <br/> {diff.fileName}</h4>
        <div className='click-to-toggle' onClick={() => this.toggleCollapse()}>
          <Chevron className={isExpanded ? 'point-down' : 'point-right'}/>
        </div>
        {
          isExpanded && <ul className='image-comparison'>
            <li>
              <img src={diff.imageMaster} onClick={() => openUrl(diff.imageMaster)}/>
              <label>Master</label>
            </li>
            <li>
              <img src={diff.imageDifference} onClick={() => openUrl(diff.imageDifference)}/>
              <label>Difference</label>
            </li>
            <li>
              <img src={diff.imageBranch} onClick={() => openUrl(diff.imageBranch)}/>
              <label>Branch</label>
            </li>
          </ul>
        }

      </li>
    );
  }

}

export default ScreenshotDiffItem;