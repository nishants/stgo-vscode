import * as vscode from 'vscode';
import * as app from './vscode-app';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.stgoci', async () => {
	    try{
		    await app.render(context);
        } catch(error) {
            vscode.window.showErrorMessage('Error rendering app', error.message);
        }
	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
