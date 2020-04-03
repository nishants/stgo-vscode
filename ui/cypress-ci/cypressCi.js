import React from "react";
import Banner from '../Components/Banner.js';

function CypressCi ({data=[]}, callBack=()=>{}) {
      return (
        <div>
          <button className='btn cypButton' onClick={(e)=> callBack(e)}>Run Cypress Tests</button>
          {data.map(item => <Banner commitId={item.sourceVersion} result={item.result} status={item.status} />)}
        </div>
        
      );
  }
  
  export default CypressCi;

