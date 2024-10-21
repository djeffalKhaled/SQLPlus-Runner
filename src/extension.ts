// Code made by https://github.com/djeffalKhaled

import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {

	console.log('SQLPlus Runner is active');

	const disposable = vscode.commands.registerCommand('sqlplus-runner.executeInSQLPlus', async() => {
		console.log('Executing SQLPlus run-commands...');
		
		const activeEditor = vscode.window.activeTextEditor;
		var filePath : string = "";

		if (activeEditor) {
			// Gets file path user is in
			filePath = activeEditor.document.uri.fsPath;
			console.log("File path:", filePath);
		} else {
			vscode.window.showInformationMessage('Active Editor Error || Please check your explorer section and right click on your SQL file to show the text editor.');
		}

		if (filePath) {
			let t = vscode.window.createTerminal();
			clearTerminalsBeside(t);
			t.show();
			t.sendText(`sqlplus / as sysdba`); 
			console.log("executing: " + "@'" + filePath + "'");
			setTimeout(() => {
				t.sendText("@'" + filePath + "'");
			}, 2000); // Awaits for sqlplus to run then runs the main exec script
			console.log("Execution successful");
		} else {
			vscode.window.showInformationMessage('Could not find SQL file || Please make sure the SQL file exists and you are viewing its text editor.');
		}
		
	});



	context.subscriptions.push(disposable);
}

// Two suggestions either I delete all of them as it's defined now or call the above createTerminal once
function clearTerminalsBeside(t : vscode.Terminal) {
	const terminals = vscode.window.terminals;

    terminals.forEach((terminal) => {
        if (terminal !== t) { 
            terminal.dispose();
        }
    })
}

// This method is called when your extension is deactivated
export function deactivate() {}
