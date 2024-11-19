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
			vscode.window.showErrorMessage('Active Editor Error || Make sure the .sql file is selected in the editor');
		}

		if (filePath && filePath.endsWith(".sql")) {
			let mainTerminal : vscode.Terminal;
			if (vscode.window.activeTerminal !== undefined) {
				vscode.window.activeTerminal.dispose();
			}

			mainTerminal = vscode.window.createTerminal("sqlplus");
			mainTerminal.show();
			mainTerminal.sendText(`sqlplus / as sysdba`); // opens sqlplus
			
			
			console.log("executing: " + "@'" + filePath + "'");
			setTimeout(() => {
				mainTerminal.sendText("@'" + filePath + "'");
			}, 2000); // Awaits for sqlplus to run then runs the main exec script
			console.log("Execution successful");
		} else {
			vscode.window.showErrorMessage('Could not find SQL file || Left click the .sql file you want to execute.');
		}
		
	});



	context.subscriptions.push(disposable);
}

// Not In Use || Deletes all instances of terminals besides the main sqlplus terminal
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
