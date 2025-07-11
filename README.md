# Prints Remover

A powerful VS Code extension that helps you remove console.log, console.error, and other console statements from your code with ease.

## Features

- **Multiple Scope Options**: Remove console logs from current file, specific file, or entire folder
- **Selective Console Type Removal**: Choose to remove specific console types (log, error, warn, info, debug) or all console statements
- **Multi-language Support**: Works with JavaScript, TypeScript, React, Vue, Python, Java, C++, and many more languages
- **Smart Processing**: Preserves comments, handles multi-line statements, and maintains code structure
- **Progress Tracking**: Real-time progress indication during processing
- **Detailed Results**: Comprehensive output showing what was removed and any errors encountered

## Installation

### From VSIX (Recommended)

1. Download the latest `.vsix` file from the releases
2. In VS Code, go to Extensions (Ctrl+Shift+X)
3. Click the "..." menu and select "Install from VSIX..."
4. Choose the downloaded `.vsix` file

### From Source

1. Clone this repository
2. Run `npm install`
3. Run `npm run compile`
4. Press F5 to launch the extension in a new VS Code window

## Usage

### Basic Usage

1. Open VS Code
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) to open the command palette
3. Type "Remove Prints" and select the command
4. Follow the prompts to configure your removal preferences

### Step-by-Step Process

1. **Choose Scope**:

   - **Current File**: Remove console logs from the currently active file
   - **Specific File**: Select a specific file to process
   - **Entire Folder**: Process all supported files in a selected folder

2. **Select Console Types**:

   - **console.log only**: Remove only console.log statements
   - **console.error only**: Remove only console.error statements
   - **console.warn only**: Remove only console.warn statements
   - **console.info only**: Remove only console.info statements
   - **console.debug only**: Remove only console.debug statements
   - **All console types**: Remove all console statements (log, error, warn, info, debug, trace, dir, table, etc.)
   - **Custom selection**: Choose specific console types to remove

3. **Review Results**: The extension will show you a summary of what was removed and provide detailed results in the output channel.

## Supported File Types

The extension supports a wide range of file types:

- JavaScript (.js, .jsx)
- TypeScript (.ts, .tsx)
- Vue (.vue)
- Svelte (.svelte)
- HTML (.html)
- PHP (.php)
- Python (.py)
- Java (.java)
- C# (.cs)
- C++ (.cpp, .c)
- Go (.go)
- Rust (.rs)
- Swift (.swift)
- Kotlin (.kt)
- Scala (.scala)
- Ruby (.rb)
- Perl (.pl)
- Shell scripts (.sh, .ps1, .bat, .cmd)

## Features in Detail

### Smart Comment Preservation

- Preserves single-line comments (`//`, `#`)
- Preserves multi-line comments (`/* */`)
- Maintains code structure and indentation

### Intelligent Console Detection

- Detects console statements at the beginning of lines
- Handles various console methods (log, error, warn, info, debug, trace, dir, table, etc.)
- Supports different coding styles and formatting

### Progress Tracking

- Real-time progress bar during processing
- Shows current file being processed
- Displays completion percentage

### Error Handling

- Graceful error handling for file access issues
- Detailed error reporting in output channel
- Continues processing even if individual files fail

### Output Channel

- Detailed results for each processed file
- Summary of total files processed and console statements removed
- Error reporting for troubleshooting

## Configuration

The extension works out of the box with default settings. No additional configuration is required.

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- VS Code

### Setup

```bash
git clone https://github.com/harsh-govind/prints-remover.git
cd prints-remover
npm install
npm run compile
```

### Building

```bash
npm run compile
```

### Testing

```bash
npm run test
```

### Packaging

```bash
npm run vscode:prepublish
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have feature requests, please open an issue on GitHub.

## Changelog

### Version 1.0.0

- Initial release
- Support for multiple file types
- Interactive scope and console type selection
- Progress tracking and detailed results
- Smart comment preservation
- Comprehensive error handling
