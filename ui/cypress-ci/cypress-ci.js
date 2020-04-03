import React from "react";
import Status from './status';

function CypressCi ({data=[]}, callBack=()=>{}) {
      const classNam = [1].indexOf(data[0].status) > -1 ? 'btn disabled' : 'btn' ;

      return (
        <div className='cypressCi'>
          <button className={classNam} onClick={(e)=> callBack(e)}>Run Cpress Tests</button>
          {data.map(item => <Status commitId={item.sourceVersion} result={item.result} status={item.status} commitBuildHref={item._links.web.href}/>)}
        </div>
        
      );
  }
  
  export default CypressCi;

