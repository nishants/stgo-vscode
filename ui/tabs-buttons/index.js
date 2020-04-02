import React from "react";
import { TABS } from "../constants";

export default ({ selectTab, selectedTab }) => {
  const TAB_NAMES = {
    overview: 'Overview',
    cypressCi: 'Cypress CI',
    screenshotDiffs: 'Screenshot Differences',
    ciLogs: 'Branch Logs',
  };

  const getTabButton = (key) => {
      let className1 = "tab";
      
      if(TABS[key]==selectedTab) {
        className1+= " tab--active";
      }

      return <button className={className1} onClick={() => selectTab(TABS[key])}>{TAB_NAMES[key]}</button>
  }

  return (
    <div className='tab-buttons'>
      {
        Object.keys(TABS).map((tabKey) => getTabButton(tabKey))
      }
     </div>
  );
};

