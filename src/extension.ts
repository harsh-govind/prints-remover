import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { ConsoleLogRemover } from './consoleLogRemover';

export function activate(context: vscode.ExtensionContext) {
    console.log('Prints Remover extension is now active!');

    let disposable = vscode.commands.registerCommand('prints-remover.removeConsoleLogs', async () => {
        const remover = new ConsoleLogRemover();
        await remover.removeConsoleLogs();
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { } 