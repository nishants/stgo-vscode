import React from "react";
import Status from './status';

function CypressCi ({data=[]}, callBack=()=>{}) {
      const disabled = !![1].indexOf(data[0].status) > -1 ;
      return (
        <div className='cypressCi'>
          <button className='btn' disabled={disabled} onClick={(e)=> callBack(e)}>Run Cypress Tests</button>
          {data.map(item => <Status commitId={item.sourceVersion} result={item.result} status={item.status} commitBuildHref={item._links.web.href}/>)}
        </div>
        
      );
  }
  
  export default CypressCi;

