# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of PDF Header Adder seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please DO NOT:

- Open a public GitHub issue for the vulnerability
- Disclose the vulnerability publicly before it has been addressed

### Please DO:

1. **Email us directly** at ashraf.a.m.ishag@gmail.com with:
   - A description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact
   - Any suggested fixes (if available)

2. **Wait for a response** - We will acknowledge your email within 48 hours and send a more detailed response within 7 days.

3. **Work with us** - We may ask for additional information or guidance.

### What to Expect

- **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 48 hours
- **Assessment**: We will assess the vulnerability and determine its impact and severity
- **Fix Development**: We will work on a fix and coordinate the release timing with you
- **Public Disclosure**: Once the fix is released, we will publicly disclose the vulnerability (with credit to you, if desired)

### Security Update Process

1. The security issue is received and assigned to a primary handler
2. The problem is confirmed and affected versions are determined
3. Code is audited to find any similar problems
4. Fixes are prepared for all supported releases
5. Fixes are released as quickly as possible

## Security Best Practices for Users

When using PDF Header Adder:

1. **Download from official sources only** - Only download the application from official GitHub releases
2. **Verify checksums** - Verify the integrity of downloaded files when available
3. **Keep updated** - Always use the latest version to ensure you have the latest security patches
4. **Review permissions** - Be aware of the file system permissions the application requires
5. **Scan files** - Consider scanning PDF files from untrusted sources before processing

## Known Security Considerations

### File Processing

- PDF Header Adder processes PDF files locally on your machine
- No data is transmitted to external servers
- All file operations are performed using standard Electron security practices

### Electron Security

This application follows Electron security best practices:

- Context isolation is enabled
- Node integration is disabled in renderer processes
- Remote module is not used
- Preload scripts are used for secure IPC communication

## Dependencies

We regularly update dependencies to patch known vulnerabilities. The project uses:

- Automated dependency scanning via GitHub Dependabot
- Regular security audits of npm packages

## Security Checklist for Contributors

If you're contributing code, please ensure:

- [ ] No hardcoded credentials or secrets
- [ ] Input validation for all user inputs
- [ ] Proper error handling that doesn't leak sensitive information
- [ ] Dependencies are up to date and free of known vulnerabilities
- [ ] Follow the principle of least privilege
- [ ] Use secure defaults

## Contact

For any security-related questions or concerns, please contact:
- Email: ashraf.a.m.ishag@gmail.com

Thank you for helping keep PDF Header Adder and its users safe!
