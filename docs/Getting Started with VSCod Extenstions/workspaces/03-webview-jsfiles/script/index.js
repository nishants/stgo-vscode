
document.querySelector('#message').innerHTML = 'hello !';
window.addEventListener('message', event => {
    const message = event.data; // The JSON data our extension sent
    switch (message.messageId) {
        case 'retried':
            document.querySelector('#message').innerHTML = 'Cant run more than one window. !'
            break;
    }
});

const vscode = acquireVsCodeApi();
window.closePanel = () => {
    vscode.postMessage({
        messageId: 'quit',
        text: 'user opted to close.'
    });
};