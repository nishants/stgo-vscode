# Use WebView to show video player

- refer: https://code.visualstudio.com/api/extension-guides/webview

- webviews work like` Iframe`

- e.g markdown editor is implemeted like a webview

- APIs

  - [`window.createWebviewPanel`](https://code.visualstudio.com/api/references/vscode-api#window.createWebviewPanel)
  - [`window.registerWebviewPanelSerializer`](https://code.visualstudio.com/api/references/vscode-api#window.registerWebviewPanelSerializer)

- Drawbacks
  - **resource heavy**
  - run as a separate process



### Themeing 

- based on css variables
- https://code.visualstudio.com/api/references/theme-color



### Debugging

- when webview is running open another extension `Cmd Sht P` -> `Developer: Open Webview Developer Tool`



### Cheat sheet

```typescript
//Create a webvew panel, set title, name and layout. Pass options such as enable scripts
let panel = vscode.window.createWebviewPanel(
  'myFirstWebpanelView', // webview reference name
  'Webview Title',       
  vscode.ViewColumn.Beside, // how to display webview
  { enableScripts: true }   // options
);

// Set the HTML content of webview (can update webview as well)
panel.webview.html = `<html><body><h1>Hello Webview !</body></html>`;

// Bring webview to focus 
panel.reveal(vscode.ViewColumn.Beside);

// Send message from extension 
panel.webview.postMessage({ messgae: 'hello from outer extension' });

// Listen for events in webview 
window.addEventListener(message, message => console.log(message))

// Send message from webview
const vscode = acquireVsCodeApi();
vscode.postMessage({
  messageId: 'quit',
  text: 'user opted to close.'
});

// Listen to messages in extension
panel.webview.onDidReceiveMessage(message => console.log(message))

// Capture if webview is closed
panel.onDidDispose(
  () => console.log('webview closed'),
  null,
  context.subscriptions
);

// Close webvdiew from extension
panel.dispose()

// Listen to changes in column of webview
panel.onDidChangeViewState(
  () => console.log(`Displaying as ${panel.viewColumn}`),
  null,
  context.subscriptions
);

// Loading local content

```



### Life cycle

- once created, the reference should be held on by extension
- Dispose : when webview is clsoed
- Visible : when webview is visible to user
- `onDidChangeViewState` : called when webview state changes



### Webview API

```typescript
//Create a webvew panel, set title, name and layout. Pass options such as enable scripts
vscode.window.createWebviewPanel(
  'myFirstWebpanelView',
  'Webview Title',
  vscode.ViewColumn.Beside,
  { enableScripts: true }
);

// Set the HTML content of webview 
panel.webview.html = `<!DOCTYPE html>
<html lang="en">
  <body>
  	<h1>Hello Webview !
  </body>
</html>
`;
```



### Hello World with webview

```typescript
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// Create and show panel
		const panel = vscode.window.createWebviewPanel(
			'catCoding',
			'Cat Coding',
			vscode.ViewColumn.Beside
    );

		// And set its HTML content
		panel.webview.html = `<!DOCTYPE html>
			<html lang="en">
				<body>
					<h1>Hello Webview !
				</body>
			</html>
		`;
	});
}

// this method is called when your extension is deactivated
export function deactivate() { }

```



### Allow only one instance of webview 

- the panel object should be reused if we want only one instance of webview
- webview are resource intensive (so think about avoiding multiple instances)

```typescript
import * as vscode from 'vscode';

const createWebView = (): vscode.WebviewPanel => {
	const panel = vscode.window.createWebviewPanel(
		'catCoding',
		'Cat Coding',
		vscode.ViewColumn.Beside
  );

	// And set its HTML content
	panel.webview.html = `<!DOCTYPE html>
		<html lang="en">
			<body>
				<h1>Hello Webview !
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
			return;
		}
		panel = createWebView();
		panel.onDidDispose(
			() => {
				vscode.window.showInformationMessage("You closed the webview !");
        panel = undefined;
			},
			null,
			context.subscriptions
		);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
```



### Run a script inside webview 

```typescript
import * as vscode from 'vscode';

const createWebView = (): vscode.WebviewPanel => {
	const panel = vscode.window.createWebviewPanel(
		'catCoding',
		'Cat Coding',
		vscode.ViewColumn.Beside,
		{ enableScripts: true}
	);

	// And set its HTML content
	panel.webview.html = `<!DOCTYPE html>
		<html lang="en">
			<body>
				<h1>Hello Webview !</h1>
				<span id="message"></span>
				<script type="text/javascript">
					document.querySelector('#message').innerHTML = 'here is a dynamic message'
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
				vscode.window.showInformationMessage("You closed the webview !");
			},
			null,
			context.subscriptions
		);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

```



### Send message from webview to extension

- Messaging : 

  ```typescript
  // Send message from extension 
  panel.webview.postMessage({ messgae: 'hello from outer extension' });
  
  // Listen for events in webview 
  window.addEventListener(message, message => console.log(message))
  
  // Send message from webview
  const vscode = acquireVsCodeApi();
  vscode.postMessage({
    messageId: 'quit',
    text: 'user opted to close.'
  });
  
  // Listen to messages in extension
  panel.webview.onDidReceiveMessage(message => console.log(message))
  ```

  

```typescript
import * as vscode from 'vscode';

const createWebView = (): vscode.WebviewPanel => {
	const panel = vscode.window.createWebviewPanel(
		'catCoding',
		'Cat Coding',
		vscode.ViewColumn.Beside,
		{ enableScripts: true, enableCommandUris: true, }
	);

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
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

```



### Local content as webview url

- use `Webview.asWebviewUri` to conver local files to urls that canbe accessed inside webview
- 

```

```



Video cannot be played inside the webview : https://stackoverflow.com/a/51735036/1065020

```
This is not possible because VS Code uses a version of electron that does not include ffmpeg. That means that playback of many common media formats is not supported inside vscode, or inside its webviews. There are no plans to change this. (I am the developer of vscode's webview API)

You can try either finding a format that is supported (such as gifs or mjpegs for short clips) or use a library to play back the content in software.

(PS. Don't use vscode.previewHtml; use the proper webview API)
```







```yaml
#all css variables
--vscode-activityBar-activeBorder: #ffffff;
--vscode-activityBar-background: #333333;
--vscode-activityBar-dropBackground: rgba(255, 255, 255, 0.12);
--vscode-activityBar-foreground: #ffffff;
--vscode-activityBar-inactiveForeground: rgba(255, 255, 255, 0.4);
--vscode-activityBarBadge-background: #007acc;
--vscode-activityBarBadge-foreground: #ffffff;
--vscode-badge-background: #4d4d4d;
--vscode-badge-foreground: #ffffff;
--vscode-breadcrumb-activeSelectionForeground: #e0e0e0;
--vscode-breadcrumb-background: #1e1e1e;
--vscode-breadcrumb-focusForeground: #e0e0e0;
--vscode-breadcrumb-foreground: rgba(204, 204, 204, 0.8);
--vscode-breadcrumbPicker-background: #252526;
--vscode-button-background: #0e639c;
--vscode-button-foreground: #ffffff;
--vscode-button-hoverBackground: #1177bb;
--vscode-checkbox-background: #3c3c3c;
--vscode-checkbox-border: #3c3c3c;
--vscode-checkbox-foreground: #f0f0f0;
--vscode-debugExceptionWidget-background: #420b0d;
--vscode-debugExceptionWidget-border: #a31515;
--vscode-debugIcon-breakpointCurrentStackframeForeground: #ffcc00;
--vscode-debugIcon-breakpointDisabledForeground: #848484;
--vscode-debugIcon-breakpointForeground: #e51400;
--vscode-debugIcon-breakpointStackframeForeground: #89d185;
--vscode-debugIcon-breakpointUnverifiedForeground: #848484;
--vscode-debugIcon-continueForeground: #75beff;
--vscode-debugIcon-disconnectForeground: #f48771;
--vscode-debugIcon-pauseForeground: #75beff;
--vscode-debugIcon-restartForeground: #89d185;
--vscode-debugIcon-startForeground: #89d185;
--vscode-debugIcon-stepBackForeground: #75beff;
--vscode-debugIcon-stepIntoForeground: #75beff;
--vscode-debugIcon-stepOutForeground: #75beff;
--vscode-debugIcon-stepOverForeground: #75beff;
--vscode-debugIcon-stopForeground: #f48771;
--vscode-debugToolBar-background: #333333;
--vscode-descriptionForeground: rgba(204, 204, 204, 0.7);
--vscode-diffEditor-insertedTextBackground: rgba(155, 185, 85, 0.2);
--vscode-diffEditor-removedTextBackground: rgba(255, 0, 0, 0.2);
--vscode-dropdown-background: #3c3c3c;
--vscode-dropdown-border: #3c3c3c;
--vscode-dropdown-foreground: #f0f0f0;
--vscode-editor-background: #1e1e1e;
--vscode-editor-findMatchBackground: #515c6a;
--vscode-editor-findMatchHighlightBackground: rgba(234, 92, 0, 0.33);
--vscode-editor-findRangeHighlightBackground: rgba(58, 61, 65, 0.4);
--vscode-editor-focusedStackFrameHighlightBackground: rgba(122, 189, 122, 0.3);
--vscode-editor-foldBackground: rgba(38, 79, 120, 0.3);
--vscode-editor-font-family: Menlo, Monaco, "Courier New", monospace;
--vscode-editor-font-size: 12px;
--vscode-editor-font-weight: normal;
--vscode-editor-foreground: #d4d4d4;
--vscode-editor-hoverHighlightBackground: rgba(38, 79, 120, 0.25);
--vscode-editor-inactiveSelectionBackground: #3a3d41;
--vscode-editor-lineHighlightBorder: #282828;
--vscode-editor-rangeHighlightBackground: rgba(255, 255, 255, 0.04);
--vscode-editor-selectionBackground: #264f78;
--vscode-editor-selectionHighlightBackground: rgba(173, 214, 255, 0.15);
--vscode-editor-snippetFinalTabstopHighlightBorder: #525252;
--vscode-editor-snippetTabstopHighlightBackground: rgba(124, 124, 124, 0.3);
--vscode-editor-stackFrameHighlightBackground: rgba(255, 255, 0, 0.2);
--vscode-editor-symbolHighlightBackground: rgba(234, 92, 0, 0.33);
--vscode-editor-wordHighlightBackground: rgba(87, 87, 87, 0.72);
--vscode-editor-wordHighlightStrongBackground: rgba(0, 73, 114, 0.72);
--vscode-editorActiveLineNumber-foreground: #c6c6c6;
--vscode-editorBracketMatch-background: rgba(0, 100, 0, 0.1);
--vscode-editorBracketMatch-border: #888888;
--vscode-editorCodeLens-foreground: #999999;
--vscode-editorCursor-foreground: #aeafad;
--vscode-editorError-foreground: #f48771;
--vscode-editorGroup-border: #444444;
--vscode-editorGroup-dropBackground: rgba(83, 89, 93, 0.5);
--vscode-editorGroupHeader-noTabsBackground: #1e1e1e;
--vscode-editorGroupHeader-tabsBackground: #252526;
--vscode-editorGutter-addedBackground: #587c0c;
--vscode-editorGutter-background: #1e1e1e;
--vscode-editorGutter-commentRangeForeground: #c5c5c5;
--vscode-editorGutter-deletedBackground: #94151b;
--vscode-editorGutter-modifiedBackground: #0c7d9d;
--vscode-editorHint-foreground: rgba(238, 238, 238, 0.7);
--vscode-editorHoverWidget-background: #252526;
--vscode-editorHoverWidget-border: #454545;
--vscode-editorHoverWidget-foreground: #cccccc;
--vscode-editorHoverWidget-statusBarBackground: #2c2c2d;
--vscode-editorIndentGuide-activeBackground: #707070;
--vscode-editorIndentGuide-background: #404040;
--vscode-editorInfo-foreground: #75beff;
--vscode-editorLightBulb-foreground: #ffcc00;
--vscode-editorLightBulbAutoFix-foreground: #75beff;
--vscode-editorLineNumber-activeForeground: #c6c6c6;
--vscode-editorLineNumber-foreground: #858585;
--vscode-editorLink-activeForeground: #4e94ce;
--vscode-editorMarkerNavigation-background: #2d2d30;
--vscode-editorMarkerNavigationError-background: #f48771;
--vscode-editorMarkerNavigationInfo-background: #75beff;
--vscode-editorMarkerNavigationWarning-background: #cca700;
--vscode-editorOverviewRuler-addedForeground: rgba(88, 124, 12, 0.6);
--vscode-editorOverviewRuler-border: rgba(127, 127, 127, 0.3);
--vscode-editorOverviewRuler-bracketMatchForeground: #a0a0a0;
--vscode-editorOverviewRuler-commonContentForeground: rgba(96, 96, 96, 0.4);
--vscode-editorOverviewRuler-currentContentForeground: rgba(64, 200, 174, 0.5);
--vscode-editorOverviewRuler-deletedForeground: rgba(148, 21, 27, 0.6);
--vscode-editorOverviewRuler-errorForeground: rgba(255, 18, 18, 0.7);
--vscode-editorOverviewRuler-findMatchForeground: rgba(209, 134, 22, 0.49);
--vscode-editorOverviewRuler-incomingContentForeground: rgba(64, 166, 255, 0.5);
--vscode-editorOverviewRuler-infoForeground: #75beff;
--vscode-editorOverviewRuler-modifiedForeground: rgba(12, 125, 157, 0.6);
--vscode-editorOverviewRuler-rangeHighlightForeground: rgba(0, 122, 204, 0.6);
--vscode-editorOverviewRuler-selectionHighlightForeground: rgba(160, 160, 160, 0.8);
--vscode-editorOverviewRuler-warningForeground: #cca700;
--vscode-editorOverviewRuler-wordHighlightForeground: rgba(160, 160, 160, 0.8);
--vscode-editorOverviewRuler-wordHighlightStrongForeground: rgba(192, 160, 192, 0.8);
--vscode-editorPane-background: #1e1e1e;
--vscode-editorRuler-foreground: #5a5a5a;
--vscode-editorSuggestWidget-background: #252526;
--vscode-editorSuggestWidget-border: #454545;
--vscode-editorSuggestWidget-foreground: #d4d4d4;
--vscode-editorSuggestWidget-highlightForeground: #0097fb;
--vscode-editorSuggestWidget-selectedBackground: #062f4a;
--vscode-editorUnnecessaryCode-opacity: rgba(0, 0, 0, 0.67);
--vscode-editorWarning-foreground: #cca700;
--vscode-editorWhitespace-foreground: rgba(227, 228, 226, 0.16);
--vscode-editorWidget-background: #252526;
--vscode-editorWidget-border: #454545;
--vscode-editorWidget-foreground: #cccccc;
--vscode-errorForeground: #f48771;
--vscode-extensionBadge-remoteBackground: #007acc;
--vscode-extensionBadge-remoteForeground: #ffffff;
--vscode-extensionButton-prominentBackground: #327e36;
--vscode-extensionButton-prominentForeground: #ffffff;
--vscode-extensionButton-prominentHoverBackground: #28632b;
--vscode-focusBorder: rgba(14, 99, 156, 0.8);
--vscode-font-family: -apple-system, BlinkMacSystemFont, "Segoe WPC", "Segoe UI", "Ubuntu", "Droid Sans", sans-serif;
--vscode-font-size: 13px;
--vscode-font-weight: normal;
--vscode-foreground: #cccccc;
--vscode-gitDecoration-addedResourceForeground: #81b88b;
--vscode-gitDecoration-conflictingResourceForeground: #6c6cc4;
--vscode-gitDecoration-deletedResourceForeground: #c74e39;
--vscode-gitDecoration-ignoredResourceForeground: #8c8c8c;
--vscode-gitDecoration-modifiedResourceForeground: #e2c08d;
--vscode-gitDecoration-submoduleResourceForeground: #8db9e2;
--vscode-gitDecoration-untrackedResourceForeground: #73c991;
--vscode-icon-foreground: #c5c5c5;
--vscode-imagePreview-border: rgba(128, 128, 128, 0.35);
--vscode-input-background: #3c3c3c;
--vscode-input-foreground: #cccccc;
--vscode-input-placeholderForeground: #a6a6a6;
--vscode-inputOption-activeBackground: rgba(14, 99, 156, 0.4);
--vscode-inputOption-activeBorder: rgba(0, 122, 204, 0);
--vscode-inputValidation-errorBackground: #5a1d1d;
--vscode-inputValidation-errorBorder: #be1100;
--vscode-inputValidation-infoBackground: #063b49;
--vscode-inputValidation-infoBorder: #007acc;
--vscode-inputValidation-warningBackground: #352a05;
--vscode-inputValidation-warningBorder: #b89500;
--vscode-list-activeSelectionBackground: #094771;
--vscode-list-activeSelectionForeground: #ffffff;
--vscode-list-dropBackground: #383b3d;
--vscode-list-errorForeground: #f88070;
--vscode-list-filterMatchBackground: rgba(234, 92, 0, 0.33);
--vscode-list-focusBackground: #062f4a;
--vscode-list-highlightForeground: #0097fb;
--vscode-list-hoverBackground: #2a2d2e;
--vscode-list-inactiveSelectionBackground: #37373d;
--vscode-list-invalidItemForeground: #b89500;
--vscode-list-warningForeground: #cca700;
--vscode-listFilterWidget-background: #653723;
--vscode-listFilterWidget-noMatchesOutline: #be1100;
--vscode-listFilterWidget-outline: rgba(0, 0, 0, 0);
--vscode-menu-background: #252526;
--vscode-menu-foreground: #cccccc;
--vscode-menu-selectionBackground: #094771;
--vscode-menu-selectionForeground: #ffffff;
--vscode-menu-separatorBackground: #bbbbbb;
--vscode-menubar-selectionBackground: rgba(255, 255, 255, 0.1);
--vscode-menubar-selectionForeground: #cccccc;
--vscode-merge-commonContentBackground: rgba(96, 96, 96, 0.16);
--vscode-merge-commonHeaderBackground: rgba(96, 96, 96, 0.4);
--vscode-merge-currentContentBackground: rgba(64, 200, 174, 0.2);
--vscode-merge-currentHeaderBackground: rgba(64, 200, 174, 0.5);
--vscode-merge-incomingContentBackground: rgba(64, 166, 255, 0.2);
--vscode-merge-incomingHeaderBackground: rgba(64, 166, 255, 0.5);
--vscode-minimap-errorHighlight: rgba(255, 18, 18, 0.7);
--vscode-minimap-findMatchHighlight: #d18616;
--vscode-minimap-selectionHighlight: #264f78;
--vscode-minimap-warningHighlight: #cca700;
--vscode-minimapGutter-addedBackground: #587c0c;
--vscode-minimapGutter-deletedBackground: #94151b;
--vscode-minimapGutter-modifiedBackground: #0c7d9d;
--vscode-notificationCenterHeader-background: #303031;
--vscode-notificationLink-foreground: #3794ff;
--vscode-notifications-background: #252526;
--vscode-notifications-border: #303031;
--vscode-notifications-foreground: #cccccc;
--vscode-notificationsErrorIcon-foreground: #f48771;
--vscode-notificationsInfoIcon-foreground: #75beff;
--vscode-notificationsWarningIcon-foreground: #cca700;
--vscode-panel-background: #1e1e1e;
--vscode-panel-border: rgba(128, 128, 128, 0.35);
--vscode-panel-dropBackground: rgba(255, 255, 255, 0.12);
--vscode-panelTitle-activeBorder: #e7e7e7;
--vscode-panelTitle-activeForeground: #e7e7e7;
--vscode-panelTitle-inactiveForeground: rgba(231, 231, 231, 0.6);
--vscode-peekView-border: #007acc;
--vscode-peekViewEditor-background: #001f33;
--vscode-peekViewEditor-matchHighlightBackground: rgba(255, 143, 0, 0.6);
--vscode-peekViewEditorGutter-background: #001f33;
--vscode-peekViewResult-background: #252526;
--vscode-peekViewResult-fileForeground: #ffffff;
--vscode-peekViewResult-lineForeground: #bbbbbb;
--vscode-peekViewResult-matchHighlightBackground: rgba(234, 92, 0, 0.3);
--vscode-peekViewResult-selectionBackground: rgba(51, 153, 255, 0.2);
--vscode-peekViewResult-selectionForeground: #ffffff;
--vscode-peekViewTitle-background: #1e1e1e;
--vscode-peekViewTitleDescription-foreground: rgba(204, 204, 204, 0.7);
--vscode-peekViewTitleLabel-foreground: #ffffff;
--vscode-pickerGroup-border: #3f3f46;
--vscode-pickerGroup-foreground: #3794ff;
--vscode-problemsErrorIcon-foreground: #f48771;
--vscode-problemsInfoIcon-foreground: #75beff;
--vscode-problemsWarningIcon-foreground: #cca700;
--vscode-progressBar-background: #0e70c0;
--vscode-quickInput-background: #252526;
--vscode-scrollbar-shadow: #000000;
--vscode-scrollbarSlider-activeBackground: rgba(191, 191, 191, 0.4);
--vscode-scrollbarSlider-background: rgba(121, 121, 121, 0.4);
--vscode-scrollbarSlider-hoverBackground: rgba(100, 100, 100, 0.7);
--vscode-searchEditor-findMatchBackground: rgba(234, 92, 0, 0.22);
--vscode-settings-checkboxBackground: #3c3c3c;
--vscode-settings-checkboxBorder: #3c3c3c;
--vscode-settings-checkboxForeground: #f0f0f0;
--vscode-settings-dropdownBackground: #3c3c3c;
--vscode-settings-dropdownBorder: #3c3c3c;
--vscode-settings-dropdownForeground: #f0f0f0;
--vscode-settings-dropdownListBorder: #454545;
--vscode-settings-headerForeground: #e7e7e7;
--vscode-settings-modifiedItemIndicator: #0c7d9d;
--vscode-settings-numberInputBackground: #292929;
--vscode-settings-numberInputForeground: #cccccc;
--vscode-settings-textInputBackground: #292929;
--vscode-settings-textInputForeground: #cccccc;
--vscode-sideBar-background: #252526;
--vscode-sideBar-dropBackground: rgba(255, 255, 255, 0.12);
--vscode-sideBarSectionHeader-background: rgba(128, 128, 128, 0.2);
--vscode-sideBarTitle-foreground: #bbbbbb;
--vscode-statusBar-background: #007acc;
--vscode-statusBar-debuggingBackground: #cc6633;
--vscode-statusBar-debuggingForeground: #ffffff;
--vscode-statusBar-foreground: #ffffff;
--vscode-statusBar-noFolderBackground: #68217a;
--vscode-statusBar-noFolderForeground: #ffffff;
--vscode-statusBarItem-activeBackground: rgba(255, 255, 255, 0.18);
--vscode-statusBarItem-hoverBackground: rgba(255, 255, 255, 0.12);
--vscode-statusBarItem-prominentBackground: rgba(0, 0, 0, 0.5);
--vscode-statusBarItem-prominentForeground: #ffffff;
--vscode-statusBarItem-prominentHoverBackground: rgba(0, 0, 0, 0.3);
--vscode-statusBarItem-remoteBackground: #16825d;
--vscode-statusBarItem-remoteForeground: #ffffff;
--vscode-symbolIcon-arrayForeground: #cccccc;
--vscode-symbolIcon-booleanForeground: #cccccc;
--vscode-symbolIcon-classForeground: #ee9d28;
--vscode-symbolIcon-colorForeground: #cccccc;
--vscode-symbolIcon-constantForeground: #cccccc;
--vscode-symbolIcon-constructorForeground: #b180d7;
--vscode-symbolIcon-enumeratorForeground: #ee9d28;
--vscode-symbolIcon-enumeratorMemberForeground: #75beff;
--vscode-symbolIcon-eventForeground: #ee9d28;
--vscode-symbolIcon-fieldForeground: #75beff;
--vscode-symbolIcon-fileForeground: #cccccc;
--vscode-symbolIcon-folderForeground: #cccccc;
--vscode-symbolIcon-functionForeground: #b180d7;
--vscode-symbolIcon-interfaceForeground: #75beff;
--vscode-symbolIcon-keyForeground: #cccccc;
--vscode-symbolIcon-keywordForeground: #cccccc;
--vscode-symbolIcon-methodForeground: #b180d7;
--vscode-symbolIcon-moduleForeground: #cccccc;
--vscode-symbolIcon-namespaceForeground: #cccccc;
--vscode-symbolIcon-nullForeground: #cccccc;
--vscode-symbolIcon-numberForeground: #cccccc;
--vscode-symbolIcon-objectForeground: #cccccc;
--vscode-symbolIcon-operatorForeground: #cccccc;
--vscode-symbolIcon-packageForeground: #cccccc;
--vscode-symbolIcon-propertyForeground: #cccccc;
--vscode-symbolIcon-referenceForeground: #cccccc;
--vscode-symbolIcon-snippetForeground: #cccccc;
--vscode-symbolIcon-stringForeground: #cccccc;
--vscode-symbolIcon-structForeground: #cccccc;
--vscode-symbolIcon-textForeground: #cccccc;
--vscode-symbolIcon-typeParameterForeground: #cccccc;
--vscode-symbolIcon-unitForeground: #cccccc;
--vscode-symbolIcon-variableForeground: #75beff;
--vscode-tab-activeBackground: #1e1e1e;
--vscode-tab-activeForeground: #ffffff;
--vscode-tab-activeModifiedBorder: #3399cc;
--vscode-tab-border: #252526;
--vscode-tab-inactiveBackground: #2d2d2d;
--vscode-tab-inactiveForeground: rgba(255, 255, 255, 0.5);
--vscode-tab-inactiveModifiedBorder: rgba(51, 153, 204, 0.5);
--vscode-tab-unfocusedActiveBackground: #1e1e1e;
--vscode-tab-unfocusedActiveForeground: rgba(255, 255, 255, 0.5);
--vscode-tab-unfocusedActiveModifiedBorder: rgba(51, 153, 204, 0.5);
--vscode-tab-unfocusedInactiveForeground: rgba(255, 255, 255, 0.25);
--vscode-tab-unfocusedInactiveModifiedBorder: rgba(51, 153, 204, 0.25);
--vscode-terminal-ansiBlack: #000000;
--vscode-terminal-ansiBlue: #2472c8;
--vscode-terminal-ansiBrightBlack: #666666;
--vscode-terminal-ansiBrightBlue: #3b8eea;
--vscode-terminal-ansiBrightCyan: #29b8db;
--vscode-terminal-ansiBrightGreen: #23d18b;
--vscode-terminal-ansiBrightMagenta: #d670d6;
--vscode-terminal-ansiBrightRed: #f14c4c;
--vscode-terminal-ansiBrightWhite: #e5e5e5;
--vscode-terminal-ansiBrightYellow: #f5f543;
--vscode-terminal-ansiCyan: #11a8cd;
--vscode-terminal-ansiGreen: #0dbc79;
--vscode-terminal-ansiMagenta: #bc3fbc;
--vscode-terminal-ansiRed: #cd3131;
--vscode-terminal-ansiWhite: #e5e5e5;
--vscode-terminal-ansiYellow: #e5e510;
--vscode-terminal-background: #1e1e1e;
--vscode-terminal-border: rgba(128, 128, 128, 0.35);
--vscode-terminal-foreground: #cccccc;
--vscode-terminal-selectionBackground: rgba(255, 255, 255, 0.25);
--vscode-textBlockQuote-background: rgba(127, 127, 127, 0.1);
--vscode-textBlockQuote-border: rgba(0, 122, 204, 0.5);
--vscode-textCodeBlock-background: rgba(10, 10, 10, 0.4);
--vscode-textLink-activeForeground: #3794ff;
--vscode-textLink-foreground: #3794ff;
--vscode-textPreformat-foreground: #d7ba7d;
--vscode-textSeparator-foreground: rgba(255, 255, 255, 0.18);
--vscode-titleBar-activeBackground: #3c3c3c;
--vscode-titleBar-activeForeground: #cccccc;
--vscode-titleBar-inactiveBackground: rgba(60, 60, 60, 0.6);
--vscode-titleBar-inactiveForeground: rgba(204, 204, 204, 0.6);
--vscode-tree-indentGuidesStroke: #585858;
--vscode-widget-shadow: #000000;
```
