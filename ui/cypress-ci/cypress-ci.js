import React from "react";
import Status from './status';

function CypressCi ({data=[]}, callBack=()=>{}) {
      return (
        <div className='cypressCi'>
          <button className='btn' onClick={(e)=> callBack(e)}>Run Cypress Tests</button>
          {data.map(item => <Status commitId={item.sourceVersion} result={item.result} status={item.status} commitBuildHref={item._links.web.href}/>)}
        </div>
        
      );
  }
  
  export default CypressCi;

