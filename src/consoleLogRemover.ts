import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export enum ConsoleType {
    LOG = 'console.log',
    ERROR = 'console.error',
    WARN = 'console.warn',
    INFO = 'console.info',
    DEBUG = 'console.debug',
    ALL = 'all'
}

export enum Scope {
    CURRENT_FILE = 'current_file',
    SPECIFIC_FILE = 'specific_file',
    ENTIRE_FOLDER = 'entire_folder'
}

export class ConsoleLogRemover {
    private readonly supportedExtensions = [
        '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.html', '.php', '.py', '.java', '.cs', '.cpp', '.c', '.go', '.rs', '.swift', '.kt', '.scala', '.rb', '.php', '.pl', '.sh', '.ps1', '.bat', '.cmd'
    ];

    public async removeConsoleLogs(): Promise<void> {
        try {
            // Step 1: Ask for scope
            const scope = await this.getScope();
            if (!scope) return;

            // Step 2: Ask for console types to remove
            const consoleTypes = await this.getConsoleTypes();
            if (!consoleTypes) return;

            // Step 3: Get target files based on scope
            const files = await this.getTargetFiles(scope);
            if (!files || files.length === 0) {
                vscode.window.showInformationMessage('No files found to process.');
                return;
            }

            // Step 4: Process files
            const results = await this.processFiles(files, consoleTypes);

            // Step 5: Show results
            this.showResults(results);

        } catch (error) {
            vscode.window.showErrorMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    private async getScope(): Promise<Scope | undefined> {
        const options = [
            { label: 'Current File', value: Scope.CURRENT_FILE },
            { label: 'Specific File', value: Scope.SPECIFIC_FILE },
            { label: 'Entire Folder', value: Scope.ENTIRE_FOLDER }
        ];

        const selected = await vscode.window.showQuickPick(options, {
            placeHolder: 'Choose what to process:',
            canPickMany: false
        });

        return selected?.value;
    }

    private async getConsoleTypes(): Promise<ConsoleType[] | undefined> {
        const options = [
            { label: 'console.log only', value: [ConsoleType.LOG] },
            { label: 'console.error only', value: [ConsoleType.ERROR] },
            { label: 'console.warn only', value: [ConsoleType.WARN] },
            { label: 'console.info only', value: [ConsoleType.INFO] },
            { label: 'console.debug only', value: [ConsoleType.DEBUG] },
            { label: 'All console types', value: [ConsoleType.ALL] },
            { label: 'Custom selection', value: 'custom' }
        ];

        const selected = await vscode.window.showQuickPick(options, {
            placeHolder: 'Choose console types to remove:',
            canPickMany: false
        });

        if (!selected) return undefined;

        if (selected.value === 'custom') {
            return this.getCustomConsoleTypes();
        }

        return selected.value as ConsoleType[];
    }

    private async getCustomConsoleTypes(): Promise<ConsoleType[] | undefined> {
        const options = [
            { label: 'console.log', value: ConsoleType.LOG, picked: true },
            { label: 'console.error', value: ConsoleType.ERROR, picked: true },
            { label: 'console.warn', value: ConsoleType.WARN, picked: true },
            { label: 'console.info', value: ConsoleType.INFO, picked: false },
            { label: 'console.debug', value: ConsoleType.DEBUG, picked: false }
        ];

        const selected = await vscode.window.showQuickPick(options, {
            placeHolder: 'Select console types to remove:',
            canPickMany: true
        });

        return selected?.map(item => item.value);
    }

    private async getTargetFiles(scope: Scope): Promise<string[] | undefined> {
        switch (scope) {
            case Scope.CURRENT_FILE:
                const activeEditor = vscode.window.activeTextEditor;
                if (!activeEditor) {
                    vscode.window.showErrorMessage('No active file found.');
                    return undefined;
                }
                return [activeEditor.document.fileName];

            case Scope.SPECIFIC_FILE:
                const fileUri = await vscode.window.showOpenDialog({
                    canSelectFiles: true,
                    canSelectFolders: false,
                    canSelectMany: false,
                    filters: {
                        'Supported Files': this.supportedExtensions
                    }
                });
                return fileUri?.map(uri => uri.fsPath);

            case Scope.ENTIRE_FOLDER:
                const folderUri = await vscode.window.showOpenDialog({
                    canSelectFiles: false,
                    canSelectFolders: true,
                    canSelectMany: false
                });
                if (!folderUri || folderUri.length === 0) return undefined;
                return this.getAllFilesInFolder(folderUri[0].fsPath);

            default:
                return undefined;
        }
    }

    private getAllFilesInFolder(folderPath: string): string[] {
        const files: string[] = [];

        const processDirectory = (dirPath: string) => {
            try {
                const items = fs.readdirSync(dirPath);

                for (const item of items) {
                    const fullPath = path.join(dirPath, item);
                    const stat = fs.statSync(fullPath);

                    if (stat.isDirectory()) {
                        // Skip node_modules, .git, and other common directories
                        if (!['node_modules', '.git', '.vscode', 'dist', 'build', 'out'].includes(item)) {
                            processDirectory(fullPath);
                        }
                    } else if (stat.isFile()) {
                        const ext = path.extname(item).toLowerCase();
                        if (this.supportedExtensions.includes(ext)) {
                            files.push(fullPath);
                        }
                    }
                }
            } catch (error) {
                console.warn(`Error reading directory ${dirPath}:`, error);
            }
        };

        processDirectory(folderPath);
        return files;
    }

    private async processFiles(files: string[], consoleTypes: ConsoleType[]): Promise<{ file: string; removed: number; errors: string[] }[]> {
        const results: { file: string; removed: number; errors: string[] }[] = [];

        const progressOptions = {
            location: vscode.ProgressLocation.Notification,
            title: "Removing prints...",
            cancellable: false
        };

        await vscode.window.withProgress(progressOptions, async (progress) => {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                progress.report({
                    message: `Processing ${path.basename(file)} (${i + 1}/${files.length})`,
                    increment: (100 / files.length)
                });

                try {
                    const result = await this.processFile(file, consoleTypes);
                    results.push(result);
                } catch (error) {
                    results.push({
                        file,
                        removed: 0,
                        errors: [error instanceof Error ? error.message : 'Unknown error']
                    });
                }
            }
        });

        return results;
    }

    private async processFile(filePath: string, consoleTypes: ConsoleType[]): Promise<{ file: string; removed: number; errors: string[] }> {
        const errors: string[] = [];
        let removed = 0;

        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const lines = content.split('\n');
            const newLines: string[] = [];
            let inMultiLineComment = false;
            let inString = false;
            let stringDelimiter = '';

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const trimmedLine = line.trim();

                // Skip empty lines
                if (!trimmedLine) {
                    newLines.push(line);
                    continue;
                }

                // Handle multi-line comments
                if (trimmedLine.startsWith('/*')) {
                    inMultiLineComment = true;
                    newLines.push(line);
                    continue;
                }

                if (trimmedLine.includes('*/')) {
                    inMultiLineComment = false;
                    newLines.push(line);
                    continue;
                }

                if (inMultiLineComment) {
                    newLines.push(line);
                    continue;
                }

                // Handle single-line comments
                if (trimmedLine.startsWith('//') || trimmedLine.startsWith('#')) {
                    newLines.push(line);
                    continue;
                }

                // Check if line contains console statements
                const shouldRemove = this.shouldRemoveLine(line, consoleTypes);

                if (shouldRemove) {
                    removed++;
                    // Don't add the line to newLines (effectively removing it)
                } else {
                    newLines.push(line);
                }
            }

            // Write the modified content back to the file
            if (removed > 0) {
                fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
            }

        } catch (error) {
            errors.push(`Error processing file: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }

        return { file: filePath, removed, errors };
    }

    private shouldRemoveLine(line: string, consoleTypes: ConsoleType[]): boolean {
        const trimmedLine = line.trim();

        // Skip empty lines and comments
        if (!trimmedLine || trimmedLine.startsWith('//') || trimmedLine.startsWith('#')) {
            return false;
        }

        // Check for console statements
        const consolePatterns = this.getConsolePatterns(consoleTypes);

        for (const pattern of consolePatterns) {
            if (pattern.test(trimmedLine)) {
                return true;
            }
        }

        return false;
    }

    private getConsolePatterns(consoleTypes: ConsoleType[]): RegExp[] {
        const patterns: RegExp[] = [];

        for (const consoleType of consoleTypes) {
            switch (consoleType) {
                case ConsoleType.LOG:
                    patterns.push(/^\s*console\.log\s*\(/);
                    break;
                case ConsoleType.ERROR:
                    patterns.push(/^\s*console\.error\s*\(/);
                    break;
                case ConsoleType.WARN:
                    patterns.push(/^\s*console\.warn\s*\(/);
                    break;
                case ConsoleType.INFO:
                    patterns.push(/^\s*console\.info\s*\(/);
                    break;
                case ConsoleType.DEBUG:
                    patterns.push(/^\s*console\.debug\s*\(/);
                    break;
                case ConsoleType.ALL:
                    patterns.push(/^\s*console\.(log|error|warn|info|debug|trace|dir|table|group|groupEnd|time|timeEnd|count|countReset|assert|clear)\s*\(/);
                    break;
            }
        }

        return patterns;
    }

    private showResults(results: { file: string; removed: number; errors: string[] }[]): void {
        const totalRemoved = results.reduce((sum, result) => sum + result.removed, 0);
        const totalErrors = results.reduce((sum, result) => sum + result.errors.length, 0);
        const processedFiles = results.length;

        let message = `Processed ${processedFiles} file(s). Removed ${totalRemoved} console statement(s).`;

        if (totalErrors > 0) {
            message += ` ${totalErrors} error(s) occurred.`;
        }

        if (totalRemoved > 0) {
            vscode.window.showInformationMessage(message);
        } else {
            vscode.window.showInformationMessage('No print statements found to remove.');
        }

        // Show detailed results in output channel
        this.showDetailedResults(results);
    }

    private showDetailedResults(results: { file: string; removed: number; errors: string[] }[]): void {
        const outputChannel = vscode.window.createOutputChannel('Prints Remover');
        outputChannel.show();

        outputChannel.appendLine('=== Prints Remover Results ===\n');

        for (const result of results) {
            outputChannel.appendLine(`File: ${path.basename(result.file)}`);
            outputChannel.appendLine(`Path: ${result.file}`);
            outputChannel.appendLine(`Removed: ${result.removed} console statement(s)`);

            if (result.errors.length > 0) {
                outputChannel.appendLine('Errors:');
                for (const error of result.errors) {
                    outputChannel.appendLine(`  - ${error}`);
                }
            }

            outputChannel.appendLine('');
        }

        const totalRemoved = results.reduce((sum, result) => sum + result.removed, 0);
        const totalErrors = results.reduce((sum, result) => sum + result.errors.length, 0);

        outputChannel.appendLine(`=== Summary ===`);
        outputChannel.appendLine(`Total files processed: ${results.length}`);
        outputChannel.appendLine(`Total print statements removed: ${totalRemoved}`);
        outputChannel.appendLine(`Total errors: ${totalErrors}`);
    }
} 