// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { aiChangeSummarizer } from './ai';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "readme-auto-pusher" is now active!');

	const disposableChange = vscode.workspace.onDidChangeTextDocument(async(event) => {
	   const document = event.document;
	   const filename = document.fileName;

	   const changes = event.contentChanges;
	   let changeRange;
	   let changeText;

	   const changeTime = new Date().toISOString();
	   console.log(changeTime);
	   changes.forEach((change) => {
		changeRange = `${change.range.start.line} - ${change.range.end.line}`;
		console.log(changeRange);
		changeText = change.text;

		
	   });

	   const aiChangeSummary = await aiChangeSummarizer({change: {
		changedFileName: filename,
		changeLines: changeRange ?? "",
		changeText: changeText ?? "",
		changeTime: changeTime
	   }});

	   console.log(aiChangeSummary.text);


	});


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposableCommitNow = vscode.commands.registerCommand('readme-auto-pusher.commitNow', () => {
		console.log("Commit is triggered");
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from readme-auto-pusher!');
	});

	context.subscriptions.push(disposableCommitNow);
	context.subscriptions.push(disposableChange);
}

// This method is called when your extension is deactivated
export function deactivate() {}
