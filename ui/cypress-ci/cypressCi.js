import React from "react";

class CypressCi extends React.Component {
    componentDidMount() {
    //   this.messageListener = window.addEventListener('message', event => {
    //     const message = event.data;
    //     console.log("Received data from shell : ", message);
    //     switch (message.messageId) {
    //       case 'retried':
    //         this.setMessage('Cant run more than one window. !');
    //         break;
    //     }
    //   });
    //   // TODO : Just to test, remove this
    //   sendMessage({messageId: 'get-current-branch-info'});
    //   sendMessage({messageId: 'get-pull-request', data: {branchName: "xyz-branch"}});
    //   sendMessage({messageId: 'get-cypress-builds', data: {branchName: "xyz-branch"}});
    }
  
    componentWillUnmount() {
    //   window.removeEventListener(this.messageListener);
    }
  
    render() {
    //   const {showTab} = this.props;
  
      return (
        <div>
          <button>Run Cypress Tests</button>
        </div>
      );
    }
  }
  
  export default CypressCi;

