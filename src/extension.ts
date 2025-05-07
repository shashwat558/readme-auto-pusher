// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { aiChangeSummarizer } from './ai';
import { createRepo } from './github';


export async function activate(context: vscode.ExtensionContext) {

  
  let token = context.globalState.get<string>("githubToken");

  
  if (!token) {
    const setPatCommand = vscode.commands.registerCommand("readme-proof-of-work.set-pat", async () => {
      
      token = await vscode.window.showInputBox({
        prompt: "Enter your GitHub Personal Access Token",
        ignoreFocusOut: true,
        password: true, 
      });

     
      if (token) {
        await context.globalState.update("githubToken", token);
        vscode.window.showInformationMessage("GitHub token saved. Enjoy coding!");
      } else {
        vscode.window.showInformationMessage("GitHub token was not saved.");
      }
    });

	let repoInitialized = context.globalState.get("repoInitialized");
	if(!repoInitialized){
		//call github.ts to create repo
		await createRepo({token: token ?? ""});
		//call git.ts to init and set-remote
		await 

		await context.globalState.update("repoInitialized", true);

    
    context.subscriptions.push(setPatCommand);
  }
}
}

// This method is called when your extension is deactivated
export function deactivate() {}
