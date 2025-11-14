# PDF Header Adder

An Electron-based desktop application to add custom headers to PDF files with image overlay capabilities.

## Features

- Add custom image headers to PDF files
- Adjust header position (left, center, right)
- Control header opacity and scale
- Live PDF preview
- Cross-platform support (Windows, macOS, Linux)

## Development

**Prerequisites:** Node.js v20 or higher

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. In a separate terminal, start the Electron app:
   ```bash
   npm start -- --dev
   ```

## Building

Build the application for your platform:

```bash
npm run build
npm run package
```

This will create a distributable application in the `release/` directory.

## Deployment

The application uses GitHub Actions for automated builds and releases:

- **Continuous Integration**: Builds are automatically triggered on pushes to `main`/`master` branches
- **Automated Releases**: Create a git tag starting with `v` (e.g., `v1.0.0`) to trigger an automated release
- **Multi-platform**: Builds are created for Windows (NSIS installer), macOS (DMG), and Linux (AppImage)

### Creating a Release

1. Update the version in `package.json`
2. Commit the changes
3. Create and push a tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
4. GitHub Actions will automatically build and create a release with installers for all platforms

## License

See [LICENSE](LICENSE) file for details.
