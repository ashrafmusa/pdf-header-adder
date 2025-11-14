# Contributing to PDF Header Adder

Thank you for your interest in contributing to PDF Header Adder! We welcome contributions from the community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to ashraf.a.m.ishag@gmail.com.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternative solutions you've considered**

### Pull Requests

- Fill in the required template
- Follow the coding standards
- Include appropriate test cases
- Update documentation as needed
- Ensure all tests pass

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/pdf-header-adder.git
   cd pdf-header-adder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development**
   ```bash
   # Terminal 1: Start Vite dev server
   npm run dev
   
   # Terminal 2: Start Electron app
   npm start -- --dev
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Pull Request Process

1. **Update documentation** - Ensure the README.md and any relevant documentation are updated
2. **Test your changes** - Make sure the app builds and runs correctly
3. **Follow the coding standards** - Ensure your code follows the project's style
4. **Write descriptive commit messages** - Use clear and meaningful commit messages
5. **Create the Pull Request** - Provide a clear description of the changes
6. **Respond to feedback** - Be responsive to review comments

### Commit Message Guidelines

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

Example:
```
Add PDF rotation feature

- Implement rotation logic in pdfService
- Add rotation controls to UI
- Update tests for rotation functionality

Fixes #123
```

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for type safety
- Follow ESLint rules (if configured)
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### React Components

- Use functional components with hooks
- Keep components focused on a single responsibility
- Use proper prop typing with TypeScript
- Follow React best practices

### File Organization

- Place components in the `components/` directory
- Place services in the `services/` directory
- Keep related files together

## Testing

Before submitting a pull request:

1. **Test the build**
   ```bash
   npm run build
   ```

2. **Test packaging**
   ```bash
   npm run package
   ```

3. **Manual testing** - Test the application functionality thoroughly

## Questions?

Feel free to open an issue with your question or contact the maintainers directly.

Thank you for contributing! 🎉
