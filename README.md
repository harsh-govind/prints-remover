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

1. Download the latest `.vsix` file from the [Releases](https://github.com/harsh-govind/prints-remover/releases) page
2. In VS Code, go to Extensions (Ctrl+Shift+X)
3. Click the "..." menu and select "Install from VSIX..."
4. Choose the downloaded `.vsix` file
5. Restart VS Code

### From Source

1. Clone this repository
2. Run `npm install`
3. Run `npm run compile`
4. Press F5 to launch the extension in a new VS Code window

## Usage

### Quick Start

1. Open VS Code
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux) to open the command palette
3. Type "Remove Prints" and select the command
4. Follow the prompts to configure your removal preferences

### Keyboard Shortcut

- **Mac**: `Cmd+Shift+R`
- **Windows/Linux**: `Ctrl+Shift+R`

### Context Menu

Right-click in any code file and select "Remove Prints" from the context menu.

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
- Keyboard shortcuts and context menu integration
