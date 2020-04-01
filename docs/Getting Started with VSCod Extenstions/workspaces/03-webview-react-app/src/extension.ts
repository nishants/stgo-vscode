import * as vscode from 'vscode';
import * as app from './vscode-app';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		app.render(context);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
