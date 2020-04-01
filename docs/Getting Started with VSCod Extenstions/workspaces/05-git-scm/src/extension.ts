// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage(
			'Hello World!',
			"Options 1 - Say back hello",
			"Options 2 - Ignore the hello :-(",
			"Options 3 - Checkout this option",
		).then(async chosen => {
			vscode.window.showInformationMessage(`You chose : ${chosen || 'nothing'}`);

			const gitExtension = vscode.extensions.getExtension('vscode.git').exports;
			const api = gitExtension.getAPI(1);
			const repo = api.repositories[0];
			const head = repo.state.HEAD;

			// get the branch and head 
			const {commit,name: branch} = head;

			// get head of any other branch
			const mainBranch = 'master'
			const branchDetails = await repo.getBranch(mainBranch);
			const lastMergeCommit = await repo.getMergeBase(branch, mainBranch);

			const status = await repo.status();

			console.log({ branch, commit, lastMergeCommit, needsSync: lastMergeCommit !== commit });
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
