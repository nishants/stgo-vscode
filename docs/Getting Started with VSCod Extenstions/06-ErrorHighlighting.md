refer : https://github.com/phindle/error-lens/blob/master/src/extension.ts



```typescript
// Only process "file://" URIs.
const noHighlight = uriToDecorate.scheme !== "file" || !vscode.window || !vscode.window.activeTextEditor ||!vscode.window.activeTextEditor.document.uri.fsPath;

if(noHighlight){
  return;
}

const activeTextEditor : vscode.TextEditor | undefined = vscode.window.activeTextEditor;


vscode.languages.registerHoverProvider('javascript', {
  provideHover(document, position, token) {
    return {
      contents: ['Hover Content']
    };
  }
});



```

