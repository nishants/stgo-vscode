import * as vscode from 'vscode';

export function render() {
    // Create and show panel
    const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.Beside,
        { enableScripts: true , enableCommandUris: true, }
    );

    // And set its HTML content
    panel.webview.html = getWebviewContent();
}

function getWebviewContent() {

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img id="gif" src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
    <video width="320" height="240" controls >
        <source src="https://www.w3schools.com/tags/movie.mp4" type="video/mp4">
        <source src="https://www.w3schools.com/tags/movie.ogg" type="video/ogg">
        Your browser does not support the video tag.
    </video>
    <script type="text/javascript" >
    var promise = document.querySelector('#gif').onclick = () => {
        console.log("tyring to play this..")
        window.promise = document.querySelector('video').play();
        if (promise !== undefined) {
            promise.catch(error => {
                // Auto-play was prevented
                // Show a UI element to let the user manually start playback
                console.error(error)
            }).then(() => {
                // Auto-play started
                console.error('Auto-play started')
            });
        }
    }

    </script>
</body>
</html>`;
}

