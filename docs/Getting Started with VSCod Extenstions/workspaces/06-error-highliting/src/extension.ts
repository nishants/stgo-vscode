// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage(
			'Hello World!',
			"Options 1 - Say back hello",
			"Options 2 - Ignore the hello :-(",
			"Options 3 - Checkout this option",
		).then(async chosen => {
			vscode.window.showInformationMessage(`You chose : ${chosen || 'nothing'}`);

			if (!vscode.window.activeTextEditor) {
				console.error("no active text editor...");
				return;
			}

			const editor = vscode.window.activeTextEditor;
			const document = editor.document;
			// setDecorations(decorationType: TextEditorDecorationType, rangesOrOptions: Range[] | DecorationOptions[]): void;

			// if (!document) {
			// 	console.error("no docuemtn");
			// 	return;
			// }
			// const { fileName, languageId: souceCodeLanguage } = document;
			// const path = document.uri.path;

			const searchForTextInFile = (text: string) => {
				const foundLines = [];
				for (let i = 0; i < document.lineCount; i++) {
					if (document.lineAt(i).text.toLowerCase().indexOf(text) !== -1) {
						foundLines.push({
							line: i,
							text: document.lineAt(i).text
						});
					}
				}
				return foundLines;
			};

			const searchResult = searchForTextInFile('#');

			// console.log({ editor, searchResult });

			// const decorOptions: vscode.DecorationInstanceRenderOptions = {
			// 	after: {
			// 		contentText: "Great !! I wanted to shwo this content in decorated text",
			// 		fontStyle: 'italic',
			// 		fontWeight: 'heavy',
			// 		margin: '10px',
			// 		color: 'red'
			// 	}
			// };

			// const diagnosticDecorationOptions: vscode.DecorationOptions = {
			// 	range: new vscode.Range(0, 1),
			// 	renderOptions: decorOptions
			// };

			const decorType = vscode.window.createTextEditorDecorationType({
				isWholeLine: false,
				backgroundColor: "red"
			});

			const range = [new vscode.Range(
				new vscode.Position(3, 8),
				new vscode.Position(3, 15),
			)];

			await editor.setDecorations(decorType, range);
			// const noHighlight = uriToDecorate.scheme !== "file" || !vscode.window || !vscode.window.activeTextEditor ||!vscode.window.activeTextEditor.document.uri.fsPath;
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
