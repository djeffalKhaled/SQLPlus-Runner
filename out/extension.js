"use strict";
// Code made by https://github.com/djeffalKhaled
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    console.log('SQLPlus Runner is active');
    const disposable = vscode.commands.registerCommand('sqlplus-runner.executeInSQLPlus', async () => {
        console.log('Executing SQLPlus run-commands...');
        const activeEditor = vscode.window.activeTextEditor;
        var filePath = "";
        if (activeEditor) {
            // Gets file path user is in
            filePath = activeEditor.document.uri.fsPath;
            console.log("File path:", filePath);
        }
        else {
            vscode.window.showErrorMessage('Active Editor Error || Make sure the .sql file is selected in the editor');
        }
        if (filePath && filePath.endsWith(".sql")) {
            let mainTerminal;
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
        }
        else {
            vscode.window.showErrorMessage('Could not find SQL file || Left click the .sql file you want to execute.');
        }
    });
    context.subscriptions.push(disposable);
}
// Not In Use || Deletes all instances of terminals besides the main sqlplus terminal
function clearTerminalsBeside(t) {
    const terminals = vscode.window.terminals;
    terminals.forEach((terminal) => {
        if (terminal !== t) {
            terminal.dispose();
        }
    });
}
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=extension.js.map