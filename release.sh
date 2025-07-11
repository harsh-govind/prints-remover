#!/bin/bash

# Release script for Prints Remover VS Code Extension

echo "🚀 Starting release process for Prints Remover..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Get version from package.json
VERSION=$(node -p "require('./package.json').version")
echo "📦 Version: $VERSION"

# Compile the extension
echo "🔨 Compiling extension..."
npm run compile

if [ $? -ne 0 ]; then
    echo "❌ Compilation failed!"
    exit 1
fi

# Package the extension
echo "📦 Packaging extension..."
vsce package

if [ $? -ne 0 ]; then
    echo "❌ Packaging failed!"
    exit 1
fi

# Check if VSIX file exists
VSIX_FILE="prints-remover-$VERSION.vsix"
if [ ! -f "$VSIX_FILE" ]; then
    echo "❌ VSIX file not found: $VSIX_FILE"
    exit 1
fi

echo "✅ Extension packaged successfully: $VSIX_FILE"

# Create release notes
echo "📝 Creating release notes..."
RELEASE_NOTES="## What's New in v$VERSION

### ✨ Features
- Remove console.log, console.error, and other console statements
- Support for multiple file types (JavaScript, TypeScript, Python, Java, C++, etc.)
- Interactive scope selection (current file, specific file, entire folder)
- Selective console type removal
- Smart comment preservation
- Progress tracking and detailed results

### 🎯 Quick Start
1. Install the VSIX file
2. Use Command Palette: `Cmd+Shift+P` → \"Remove Prints\"
3. Or use keyboard shortcut: `Cmd+Shift+R` (Mac) / `Ctrl+Shift+R` (Windows/Linux)
4. Or right-click in editor → \"Remove Prints\"

### 📋 Supported File Types
- JavaScript (.js, .jsx)
- TypeScript (.ts, .tsx)
- Vue (.vue), Svelte (.svelte)
- Python (.py), Java (.java)
- C++ (.cpp, .c), C# (.cs)
- Go (.go), Rust (.rs)
- And many more...

### 🔧 Installation
1. Download the VSIX file
2. In VS Code: Extensions → ... → Install from VSIX
3. Restart VS Code

### 🐛 Bug Fixes
- Fixed command registration issues
- Improved extension activation
- Enhanced error handling

### 📦 Files
- \`prints-remover-$VERSION.vsix\` - VS Code extension package"

echo "$RELEASE_NOTES" > "RELEASE_NOTES.md"
echo "✅ Release notes created: RELEASE_NOTES.md"

echo ""
echo "🎉 Release preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Commit your changes: git add . && git commit -m \"Release v$VERSION\""
echo "2. Push to GitHub: git push origin main"
echo "3. Create a new release on GitHub:"
echo "   - Go to: https://github.com/harsh-govind/prints-remover/releases/new"
echo "   - Tag: v$VERSION"
echo "   - Title: Prints Remover v$VERSION"
echo "   - Description: Copy from RELEASE_NOTES.md"
echo "   - Upload: $VSIX_FILE"
echo ""
echo "📁 Files ready for release:"
echo "- $VSIX_FILE"
echo "- RELEASE_NOTES.md" 