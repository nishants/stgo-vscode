import React from "react";
const vscode = acquireVsCodeApi();


class App extends React.Component{
  state = {message: 'Welcome to react in webview.'};

  setMessage(message){
    this.setState({message})
  }

  closePanel(){
    vscode.postMessage({
      messageId: 'quit',
      text: 'Lets close the extension as user asked so.'
    })
  }

  componentDidMount() {
    const self = this;
    this.messageListener = window.addEventListener('message', event => {
      const message = event.data;
      switch (message.messageId) {
        case 'retried':
          self.setMessage('Cant run more than one window. !');
          break;
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener(this.messageListener);
  }

  render(){
    return <React.Fragment>
      <div id="branch-selector">
        <label className='column-label'>Branch</label>
        <select className='column-label'>
          <option selcted>ci-124332-saxo-ci</option>
        </select>
      </div>

      <h1>React app in webview !!</h1>
      <span
        id="message"> {this.state.message} </span>
      <div>
        <button onClick={this.closePanel}>Close extension</button>
      </div>
    </React.Fragment>;
  }
}
export default App;

