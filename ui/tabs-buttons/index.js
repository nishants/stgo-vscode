import React from "react";

export default ({selectTab}) => (
  <div id='tab-button'>
    <ul className='tabs'>
      <li onClick={() => selectTab('overview')}>Overview</li>
      <li onClick={() => selectTab('cypress-ci')}>Cypress-CI</li>
      <li onClick={() => selectTab('screenshot-comparison')}>ScreenshotComparison</li>
      <li>CI Logs</li>
    </ul>
  </div>
);

