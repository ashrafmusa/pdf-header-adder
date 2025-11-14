# Deployment Guide for PDF Header Adder

This guide explains how to deploy the PDF Header Adder application.

## Web App Deployment (GitHub Pages)

### Automatic Deployment

The web app is automatically deployed to GitHub Pages when changes are merged to the `main` or `master` branch.

**Live URL:** https://ashrafmusa.github.io/pdf-header-adder/

### Enable GitHub Pages (First Time Setup)

1. Go to your repository on GitHub
2. Click on **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The app will be automatically built and deployed

### Manual Deployment

To manually trigger a deployment:

1. Go to **Actions** tab in your repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Select the branch and click **Run workflow**

## Desktop App Deployment (Releases)

### Create a New Release

1. **Update version** in `package.json`:
   ```json
   {
     "version": "1.0.0"
   }
   ```

2. **Commit the version change**:
   ```bash
   git add package.json
   git commit -m "Bump version to 1.0.0"
   git push
   ```

3. **Create and push a tag**:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

4. **GitHub Actions will automatically**:
   - Build for Windows (NSIS installer)
   - Build for macOS (DMG)
   - Build for Linux (AppImage)
   - Create a GitHub Release with all binaries

### Download Releases

Users can download the desktop app from:
https://github.com/ashrafmusa/pdf-header-adder/releases

## Local Development

### Web Version
```bash
npm install
npm run dev
```
Open http://localhost:3000

### Desktop Version
```bash
# Terminal 1
npm run dev

# Terminal 2
npm start -- --dev
```

## Building Locally

### Build Web App
```bash
npm run build:gh-pages
# Output: dist/
```

### Build Desktop App
```bash
npm run build
npm run package
# Output: release/
```

## Troubleshooting

### GitHub Pages Not Working

1. Ensure GitHub Pages is enabled in repository settings
2. Check the Actions tab for deployment errors
3. Verify the base path in `vite.config.ts` matches your repository name

### Desktop Build Fails

1. Ensure all dependencies are installed: `npm install`
2. Check Node.js version (requires v20+)
3. Review the Actions logs for specific errors

## Supported Platforms

- **Web**: All modern browsers (Chrome, Firefox, Safari, Edge)
- **Windows**: Windows 10 and later
- **macOS**: macOS 10.13 (High Sierra) and later
- **Linux**: Most modern distributions with GLIBC 2.28+

## Architecture

### Web App
- React frontend
- Vite build tool
- pdf-lib for PDF processing
- All processing happens client-side (no server required)

### Desktop App
- Electron wrapper around the web app
- Native file system integration
- Same core functionality as web version

## Deployment Checklist

Before deploying to production:

- [ ] Update version in package.json
- [ ] Update CHANGELOG.md
- [ ] Test build locally
- [ ] Run security checks (CodeQL)
- [ ] Test on all target platforms
- [ ] Create release notes
- [ ] Tag the release
- [ ] Announce the release

## Support

For deployment issues:
- Open an issue: https://github.com/ashrafmusa/pdf-header-adder/issues
- Email: ashraf.a.m.ishag@gmail.com
