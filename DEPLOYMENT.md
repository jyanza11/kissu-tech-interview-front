# 🚀 Deployment Guide

## Quick Start

### 1. Set up GitHub Secrets
Go to your repository → Settings → Secrets and variables → Actions, and add:

- `VERCEL_TOKEN`: Get from [Vercel Dashboard](https://vercel.com/account/tokens)
- `VERCEL_ORG_ID`: Get from Vercel Team Settings → General → Team ID
- `VERCEL_PROJECT_ID`: Get from Vercel Project Settings → General → Project ID
- `NEXT_PUBLIC_API_URL`: Your backend API URL (optional)

### 2. Test Locally
```bash
# Run the same checks as CI
pnpm test:ci-local

# Or run individual commands
pnpm lint
pnpm check-types
pnpm test:ci
pnpm build
```

### 3. Deploy
- Push to `main` or `master` branch
- GitHub Actions will automatically deploy to Vercel
- Check the Actions tab for deployment status

## 📁 Files Created

- `.github/workflows/ci-cd.yml` - Main CI/CD pipeline
- `.github/workflows/dependency-update.yml` - Weekly dependency updates
- `vercel.json` - Vercel configuration
- `scripts/test-ci.sh` - Local CI testing script
- `.github/CI-CD-SETUP.md` - Detailed setup documentation

## 🔄 Workflow Features

✅ **Linting & Type Checking**  
✅ **Unit Tests with Coverage**  
✅ **Security Audits**  
✅ **Production Builds**  
✅ **Automatic Vercel Deployment**  
✅ **Weekly Dependency Updates**  
✅ **Build Summaries**  

## 🎯 Next Steps

1. **Set up the GitHub secrets** (see above)
2. **Test the pipeline locally**: `pnpm test:ci-local`
3. **Push to main branch** to trigger deployment
4. **Monitor deployments** in GitHub Actions tab

For detailed information, see [`.github/CI-CD-SETUP.md`](.github/CI-CD-SETUP.md)
