import React from "react";

class CypressCi extends React.Component {
    render() {
      return (
        <div>
          <button className='btn'>Run Cypress Tests</button>
          <button className='btn btn--success'>Success</button>
          <button className='btn btn--fail'>Failed</button>
        </div>
      );
    }
  }
  
  export default CypressCi;

