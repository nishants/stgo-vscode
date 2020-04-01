import * as vscode from 'vscode';
import  * as fs from 'fs';
import  * as path from 'path';

const createWebView = (): vscode.WebviewPanel => {
	const panel = vscode.window.createWebviewPanel(
		'catCoding',
		'Cat Coding',
		vscode.ViewColumn.Beside,
		{ enableScripts: true, enableCommandUris: true, }
	);

	const html = readFileSync(path.join(__dirname, 'react'))
	// And set its HTML content
	panel.webview.html = `<!DOCTYPE html>
		<html lang="en">
			<body>
				<h1>Hello Webview !</h1>
				<span id="message"></span>
				<button onclick='window.closePanel()'>Exit</button>
				<script type="text/javascript">
					document.querySelector('#message').innerHTML = 'hello !'
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
						})
					};

				</script>
			</body>
		</html>
	`;

	return panel;
};

//  allow only one instance of webview at a time
let panel: vscode.WebviewPanel | undefined = undefined;

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		if (panel) {
			panel.reveal(vscode.ViewColumn.Beside);
			panel.webview.postMessage({ messageId: 'retried' });
			return;
		}
		panel = createWebView();
		panel.onDidDispose(
			() => {
				panel = undefined;
				vscode.window.showInformationMessage("You closed the webview !");
			},
			null,
			context.subscriptions
		);
		// Handle messages from the webview
		panel.webview.onDidReceiveMessage(
			message => {
				switch (message.messageId) {
					case 'quit':
						vscode.window.showWarningMessage("Closed by clicking on quit.");
						panel?.dispose();
						return;
				}
			},
			undefined,
			context.subscriptions
		);

		panel.onDidChangeViewState(
			e => {
				console.log(`Displaying as ${panel?.viewColumn}`, e)
			},
			null,
			context.subscriptions
		);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
