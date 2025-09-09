# CI/CD Setup Guide

This document explains the CI/CD pipeline setup for the Kissu Tech Interview Front project.

## 🚀 Overview

The project uses GitHub Actions for continuous integration and deployment to Vercel. The pipeline includes:

- **Linting & Type Checking**: ESLint and TypeScript validation
- **Testing**: Jest unit tests with coverage reporting
- **Building**: Next.js production build
- **Security Audit**: Dependency vulnerability scanning
- **Deployment**: Automatic deployment to Vercel (production)
- **Dependency Updates**: Weekly automatic dependency updates

## 📋 Workflows

### 1. Main CI/CD Pipeline (`.github/workflows/ci-cd.yml`)

**Triggers:**
- Push to `main`, `master`, or `develop` branches
- Pull requests to `main`, `master`, or `develop` branches

**Jobs:**
1. **Lint & Type Check**: Runs ESLint and TypeScript type checking
2. **Test**: Executes Jest tests with coverage reporting
3. **Build**: Creates production build of the application
4. **Security Audit**: Scans for dependency vulnerabilities
5. **Deploy**: Deploys to Vercel (only on main/master branches)
6. **Build Summary**: Creates a summary of all job results

### 2. Dependency Update Workflow (`.github/workflows/dependency-update.yml`)

**Triggers:**
- Weekly schedule (every Monday at 9 AM UTC)
- Manual trigger via GitHub Actions UI

**Features:**
- Updates all dependencies to latest versions
- Creates automatic pull requests for dependency updates
- Includes testing instructions in PR description

## 🔧 Required GitHub Secrets

To enable Vercel deployment, you need to set up the following secrets in your GitHub repository:

### 1. Go to Repository Settings
Navigate to: `Settings` → `Secrets and variables` → `Actions`

### 2. Add Required Secrets

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `VERCEL_TOKEN` | Vercel authentication token | [Vercel Dashboard](https://vercel.com/account/tokens) → Create Token |
| `VERCEL_ORG_ID` | Vercel organization ID | [Vercel Dashboard](https://vercel.com/account) → Settings → General → Team ID |
| `VERCEL_PROJECT_ID` | Vercel project ID | [Vercel Dashboard](https://vercel.com/dashboard) → Project Settings → General → Project ID |
| `NEXT_PUBLIC_API_URL` | Backend API URL (optional) | Your backend API endpoint URL |

### 3. How to Get Vercel Credentials

#### VERCEL_TOKEN:
1. Go to [Vercel Dashboard](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Give it a name (e.g., "GitHub Actions")
4. Copy the generated token

#### VERCEL_ORG_ID:
1. Go to [Vercel Dashboard](https://vercel.com/account)
2. Click on "Settings" → "General"
3. Copy the "Team ID" (this is your ORG_ID)

#### VERCEL_PROJECT_ID:
1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on "Settings" → "General"
3. Copy the "Project ID"

## 🏗️ Vercel Configuration

The project includes a `vercel.json` configuration file with:

- **Build Settings**: Uses pnpm for package management
- **Security Headers**: Adds security headers to all responses
- **Redirects**: Handles URL redirects
- **Function Configuration**: Sets timeout limits for serverless functions

## 📊 Coverage Reporting

The pipeline includes code coverage reporting via Codecov:

1. Tests run with coverage collection
2. Coverage reports are uploaded to Codecov
3. Coverage badges can be added to README

To enable Codecov:
1. Sign up at [Codecov](https://codecov.io)
2. Connect your GitHub repository
3. The workflow will automatically upload coverage reports

## 🔄 Branch Protection Rules

Recommended branch protection rules for `main`/`master`:

1. **Require status checks to pass before merging**
   - ✅ Lint & Type Check
   - ✅ Test
   - ✅ Build

2. **Require branches to be up to date before merging**

3. **Require pull request reviews before merging**

4. **Restrict pushes that create files larger than 100MB**

## 🚨 Troubleshooting

### Common Issues:

#### 1. Build Failures
- Check if all dependencies are properly installed
- Verify environment variables are set correctly
- Review build logs for specific error messages

#### 2. Test Failures
- Ensure all tests are passing locally
- Check for flaky tests that might fail intermittently
- Review test coverage requirements

#### 3. Deployment Failures
- Verify Vercel secrets are correctly set
- Check Vercel project configuration
- Ensure the project exists in Vercel dashboard

#### 4. Dependency Update Issues
- Review the generated PR for breaking changes
- Test the updated dependencies locally
- Check for peer dependency conflicts

## 📈 Monitoring

### GitHub Actions Insights:
- Go to your repository → "Actions" tab
- View workflow run history and performance
- Monitor job success rates and execution times

### Vercel Analytics:
- Monitor deployment performance
- Track build times and success rates
- Review function execution metrics

## 🔧 Customization

### Adding New Jobs:
1. Edit `.github/workflows/ci-cd.yml`
2. Add new job under the `jobs` section
3. Configure dependencies using `needs` parameter

### Modifying Deployment:
1. Update the `deploy` job in the workflow
2. Modify Vercel configuration in `vercel.json`
3. Adjust environment variables as needed

### Changing Test Configuration:
1. Update `jest.config.mjs` for test settings
2. Modify test scripts in `package.json`
3. Adjust coverage thresholds in workflow

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Jest Configuration](https://jestjs.io/docs/configuration)
- [pnpm Documentation](https://pnpm.io/)

## 🤝 Contributing

When contributing to this project:

1. Ensure all CI checks pass before submitting PR
2. Add tests for new features
3. Update documentation as needed
4. Follow the established code style and linting rules

---

*Last updated: $(date)*
