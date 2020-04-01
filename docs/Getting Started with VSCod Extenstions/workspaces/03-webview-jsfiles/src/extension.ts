import * as vscode from 'vscode';
import * as path from 'path';

const createWebView = (context: vscode.ExtensionContext): vscode.WebviewPanel => {
	const panel = vscode.window.createWebviewPanel(
		'catCoding',
		'Cat Coding',
		vscode.ViewColumn.Beside,
		{
			enableScripts: true, enableCommandUris: true,
			localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'script'))]
		}
	);
	// Get path to resource on disk
	const scriptLocalPath = vscode.Uri.file(
		path.join(context.extensionPath, 'script', 'index.js')
	);
	const scriptUri = panel.webview.asWebviewUri(scriptLocalPath).fsPath;

	// And set its HTML content
	panel.webview.html = `<!DOCTYPE html>
		<html lang="en">
			<head>
			</head>
			<body>
				<h1>Hello Webview !</h1>
				<span id="message"></span>
				<button onclick='window.closePanel()'>Exit</button>
				<script type="text/javascript" src="${scriptUri}"></script>
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

		panel = createWebView(context);
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
