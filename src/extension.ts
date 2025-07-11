import * as vscode from 'vscode';
import { ConsoleLogRemover } from './consoleLogRemover';

export function activate(context: vscode.ExtensionContext) {
    console.log('Prints Remover extension is now active!');

    // Register the command
    const disposable = vscode.commands.registerCommand('prints-remover.removeConsoleLogs', async () => {
        try {
            const remover = new ConsoleLogRemover();
            await remover.removeConsoleLogs();
        } catch (error) {
            vscode.window.showErrorMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { } 