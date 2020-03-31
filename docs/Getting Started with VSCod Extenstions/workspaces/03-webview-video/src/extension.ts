import * as vscode from 'vscode';
import * as openSnippet from './lib/openSnippet';
import * as app from './lib/webViewApp';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		app.render();
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
