# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-14

### Added
- Initial release of PDF Header Adder
- Desktop application support for Windows, macOS, and Linux
- Web application deployment to GitHub Pages
- PDF header image overlay functionality
- Adjustable header position (left, center, right)
- Header opacity control (0-100%)
- Header scale control (5-100% of page width)
- Live preview of header placement
- Client-side PDF processing (no server upload required)
- GitHub Actions CI/CD pipeline for automated builds
- GitHub Actions deployment workflow for GitHub Pages
- Comprehensive documentation:
  - README with setup and usage instructions
  - CONTRIBUTING guide for contributors
  - CODE_OF_CONDUCT for community standards
  - SECURITY policy for vulnerability reporting
- Professional repository structure with proper .gitignore
- MIT License

### Features
- **Desktop App**: Native file system integration for saving PDFs
- **Web App**: Browser-based download functionality
- **Cross-platform**: Works on Windows, macOS, Linux, and web browsers
- **Privacy-focused**: All processing happens locally on your device
- **User-friendly**: Intuitive interface with drag-and-drop support
- **Responsive Design**: Works on desktop and mobile browsers

### Technical
- Built with Electron for desktop applications
- React for UI components
- TypeScript for type safety
- Vite for fast development and optimized builds
- Tailwind CSS for styling
- pdf-lib for PDF manipulation
- GitHub Actions for CI/CD

## [Unreleased]

### Planned
- Batch processing for multiple PDF files
- Additional header customization options
- Support for footer images
- Page range selection for header application
- Template saving and loading
- Dark mode support

---

[1.0.0]: https://github.com/ashrafmusa/pdf-header-adder/releases/tag/v1.0.0
