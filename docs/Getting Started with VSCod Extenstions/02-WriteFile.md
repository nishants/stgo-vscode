# Read and Write Files with VSCode extensins

Learnt : 

- you cananot write file to workspace if no workspace is openened.
- you cannot overwrite a fiel (gives error sometimes....but WHY? )



Lets first modify our `extension.ts` as 

```typescript
const options = {
  "sayHello": "Options 1 - Say back hello",
  "createFile": "Create helloworld.ps1"
};

vscode.window.showInformationMessage(
  'Hello World!',
  ...Object.values(options)
).then(chosen => {
  if (chosen === options.createFile) {
    openSnippet.showSnippet(chosen);
    return;
  }
  vscode.window.showInformationMessage(`You chose : ${chosen || 'nothing'}`);
});
```



### Bit 1 - Chose a workspace

- To create a file, user first needs to first get open workspace

- **If user has not openend any workspace, we will show an error**

  ```javascript
  if (!vscode.workspace.workspaceFolders?.length) {
  	vscode.window.showErrorMessage("Please create a workspace first !");
  	return;
  }
  ```

  

### Bit 2 - Create a files in workspace

- Create a file in 

  ```javascript
  const newFileName = 'hello-world.ps1';
  const fileContent = '<# You first \n script #>';
  
  const worlspaceFolder = [...vscode.workspace.workspaceFolders].pop();
  const filePath = path.join(worlspaceFolder.uri.fsPath, newFileName);
  
  fs.writeFileSync(filePath, fileContent, 'utf8');
  
  vscode.workspace.openTextDocument(filePath).then(doc => {
    vscode.window.showTextDocument(doc);
  });
  ```



### Bit 3 - Do not create file if it already exists

- Simply check if path exists : 

  ```javascript
  const worlspaceFolder = [...vscode.workspace.workspaceFolders].pop();
  const filePath = path.join(worlspaceFolder.uri.fsPath, newFileName);
  
  if (fs.existsSync(filePath)) {
  	vscode.window.showWarningMessage("File already exits. Not overwritting !");
  }
  ```

  

