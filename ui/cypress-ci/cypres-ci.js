import React from "react";
import Status from './status';

function CypressCi ({data=[]}, callBack=()=>{}) {
      return (
        <div>
          <button onClick={(e)=> callBack(e)}>Run Cypress Tests</button>
          {data.map(item => <Status commitId={item.sourceVersion} result={item.result} status={item.status} />)}
        </div>
        
      );
  }
  
  export default CypressCi;

