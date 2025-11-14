# PDF Header Adder

An Electron-based desktop application and web app to add custom headers to PDF files with image overlay capabilities.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://ashrafmusa.github.io/pdf-header-adder/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/release/ashrafmusa/pdf-header-adder.svg)](https://github.com/ashrafmusa/pdf-header-adder/releases)

## ✨ Features

- 📄 Add custom image headers to PDF files
- 🎯 Adjust header position (left, center, right)
- 🎨 Control header opacity and scale
- 👀 Live PDF preview
- 💻 Cross-platform support (Windows, macOS, Linux)
- 🌐 Available as both desktop app and web app
- 🔒 Client-side processing (your files never leave your device)

## 🚀 Quick Start

### Web Version (Recommended)

Try it now without installation: [https://ashrafmusa.github.io/pdf-header-adder/](https://ashrafmusa.github.io/pdf-header-adder/)

### Desktop Application

Download the latest release for your platform:
- **Windows**: [Download Installer](https://github.com/ashrafmusa/pdf-header-adder/releases)
- **macOS**: [Download DMG](https://github.com/ashrafmusa/pdf-header-adder/releases)
- **Linux**: [Download AppImage](https://github.com/ashrafmusa/pdf-header-adder/releases)

## 🛠️ Development

**Prerequisites:** Node.js v20 or higher

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashrafmusa/pdf-header-adder.git
   cd pdf-header-adder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **For Electron development** (in a separate terminal):
   ```bash
   npm start -- --dev
   ```

## 📦 Building

### Web Version

```bash
npm run build:gh-pages
```

The build output will be in the `dist/` directory.

### Desktop Application

```bash
npm run build
npm run package
```

This will create a distributable application in the `release/` directory.

## 🚢 Deployment

### GitHub Pages (Web App)

The web app is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The deployment workflow:

1. Builds the application for GitHub Pages
2. Deploys to `https://ashrafmusa.github.io/pdf-header-adder/`

### Desktop App Releases

To create a new release:

1. Update the version in `package.json`
2. Commit the changes
3. Create and push a tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
4. GitHub Actions will automatically build and create a release with installers for all platforms

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting a pull request.

## 🔒 Security

For security concerns, please review our [Security Policy](SECURITY.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Ashraf A. Musa**
- Email: ashraf.a.m.ishag@gmail.com
- GitHub: [@ashrafmusa](https://github.com/ashrafmusa)

## 🙏 Acknowledgments

- Built with [Electron](https://www.electronjs.org/)
- PDF processing powered by [pdf-lib](https://pdf-lib.js.org/)
- UI built with [React](https://react.dev/) and [Tailwind CSS](https://tailwindcss.com/)

---

Made with ❤️ for the PDF community
