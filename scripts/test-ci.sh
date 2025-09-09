#!/bin/bash

# Test CI Pipeline Locally
# This script runs the same commands that GitHub Actions will run

set -e

echo "🚀 Testing CI Pipeline Locally"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    print_error "pnpm is not installed. Please install pnpm first."
    echo "Install with: npm install -g pnpm"
    exit 1
fi

print_status "pnpm is installed"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile
print_status "Dependencies installed"

# Run linting
echo ""
echo "🔍 Running ESLint..."
if pnpm lint; then
    print_status "ESLint passed"
else
    print_error "ESLint failed"
    exit 1
fi

# Run type checking
echo ""
echo "🔧 Running TypeScript type check..."
if pnpm check-types; then
    print_status "TypeScript type check passed"
else
    print_error "TypeScript type check failed"
    exit 1
fi

# Run tests
echo ""
echo "🧪 Running tests..."
if pnpm test:ci; then
    print_status "Tests passed"
else
    print_error "Tests failed"
    exit 1
fi

# Run security audit
echo ""
echo "🔒 Running security audit..."
if pnpm audit --audit-level moderate; then
    print_status "Security audit passed"
else
    print_warning "Security audit found issues (non-blocking)"
fi

# Build the application
echo ""
echo "🏗️  Building application..."
if pnpm build; then
    print_status "Build successful"
else
    print_error "Build failed"
    exit 1
fi

echo ""
echo "🎉 All CI checks passed! Your code is ready for deployment."
echo ""
echo "Next steps:"
echo "1. Commit your changes"
echo "2. Push to your branch"
echo "3. Create a pull request"
echo "4. The GitHub Actions workflow will run automatically"
