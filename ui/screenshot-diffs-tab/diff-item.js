import React from "react";
import Chevron from "../icons/chevron";

class ScreenshotDiffItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: !props.diff.approved,
      approved: props.diff.approved,
    };
  }

  toggleCollapse() {
    console.log("toggle", this.state.isExpanded);
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  approve() {
    this.props.sendHttpRequest(`${this.props.diff.approveUrl}/approve`);
    this.setState({ approved: true });
  }

  reject() {
    this.props.sendHttpRequest(`${this.props.diff.approveUrl}/reject`);
    this.setState({ approved: false });
  }

  render() {
    const { diff, openUrl, openFile } = this.props;
    const { isExpanded, approved } = this.state;

    return (
      <li
        className={`screenshot-diff-item ${isExpanded ? "expanded" : ""} ${
          approved ? "is-approved" : ""
        }`}
        key={diff.path + diff.fileName}
      >
        <h4>
          {diff.fileName}
          <br />

          <a onClick={() => openFile({ path: diff.path, name: diff.fileName })}>
            {diff.path}
            <i className="fas fa-external-link-alt" />
          </a>
        </h4>
        <div className="click-to-toggle" onClick={() => this.toggleCollapse()}>
          <Chevron className={isExpanded ? "point-down" : "point-right"} />
        </div>
        {isExpanded && (
          <React.Fragment>
            <ul className="image-comparison">
              <li>
                <img
                  src={diff.imageMaster}
                  onClick={() => openUrl(diff.imageMaster)}
                />
                <label>Master</label>
              </li>
              <li>
                <img
                  src={diff.imageDifference}
                  onClick={() => openUrl(diff.imageDifference)}
                />
                <label>Difference</label>
              </li>
              <li>
                <img
                  src={diff.imageBranch}
                  onClick={() => openUrl(diff.imageBranch)}
                />
                <label>Branch</label>
              </li>
            </ul>
            <div className="screenshot-diff-action-butttons">
              {approved ? (
                <button className="warning" onClick={() => this.reject()}>
                  Reject
                </button>
              ) : (
                <button onClick={() => this.approve()}>Approve</button>
              )}
            </div>
          </React.Fragment>
        )}
      </li>
    );
  }
}

export default ScreenshotDiffItem;
