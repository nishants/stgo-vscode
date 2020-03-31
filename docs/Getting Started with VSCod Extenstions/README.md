

### Extension API

- **Designed for extensibility**
- **Almost every aspect is programmable** via extensions API.
- **UI, editor** are all programmable via API
- **some core features** of VSCode work via API as well

- refer : https://code.visualstudio.com/api

- capabilities: https://code.visualstudio.com/api/extension-capabilities/overview
- guide: https://code.visualstudio.com/api/extension-guides/overview



### Capabilites: 

- show a webview with custom webpage : [Awesome](https://code.visualstudio.com/api/extension-guides/webview) 
- Add custom components/Views in UI : [Workbench API](https://code.visualstudio.com/api/extension-capabilities/extending-workbench)
- More, that we don't want to go into right now.



Bytes: 

- [HelloWorld](./01-HelloWorld.md) 
  - create an extension
  - add command to extension
  - interact with user using information window
  - debug code
- [WriteFile](./02-WriteFile.md) 
  - get workspace path
  - create a new file from extension
  - check if file exists, show warning
- [**03-WebView.md**](./03-WebView.md)
  - can show html pages
  - cannot play video as electron version used does not supprt media
  - could not configure to load external js files
- [GitApi](./05-GitApi.md) 
  - get HEAD
  - get the current branch and commit from HEAD
  - get any other branch by name
- [ErrorHighlighting](./06-ErrorHighlighting.md) 





Randome notes: 

- Open an external url : ` vscode.env.openExternal(vscode.Uri.parse("<external-url-here>"));`