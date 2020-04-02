import React from "react";
import { TABS } from "../constants";

export default ({ selectTab, selectedTab }) => {

  const getTabButton = (key) => {
      let className1 = "tab";
      
      if(TABS[key]==selectedTab) {
        className1+= " tab--active";
      }
      
      return <button className={className1} onClick={() => selectTab(TABS[key])}>{TABS[key]}</button>
  }

  return (
    <div className='tab-buttons'>
      {
        Object.keys(TABS).map((tabKey) => getTabButton(tabKey))
      }
     </div>
  );
};

