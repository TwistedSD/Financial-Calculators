# Financial Calculators - GitHub Deploy Script
# Run this script to initialize and push to GitHub

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  Financial Calculators Deployment  " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
Write-Host "Checking for Git installation..." -ForegroundColor Yellow
$gitVersion = git --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Git is not installed!" -ForegroundColor Red
    Write-Host "Please download and install Git from: https://git-scm.com/download/win" -ForegroundColor Red
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}
Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
Write-Host ""

# Get repository information
Write-Host "Enter your GitHub repository details:" -ForegroundColor Yellow
Write-Host ""

$username = Read-Host "GitHub Username"
$reponame = Read-Host "Repository Name (e.g., mortgage-calculator)"

Write-Host ""
Write-Host "Your GitHub repository URL will be:" -ForegroundColor Cyan
Write-Host "https://github.com/$username/$reponame" -ForegroundColor White
Write-Host ""
Write-Host "Your live website will be at:" -ForegroundColor Cyan
Write-Host "https://$username.github.io/$reponame/" -ForegroundColor White
Write-Host ""

$confirm = Read-Host "Is this correct? (Y/N)"
if ($confirm -ne "Y" -and $confirm -ne "y") {
    Write-Host "Setup cancelled. Please run the script again." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  Initializing Git Repository...    " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Initialize git if not already initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git already initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "Adding all files..." -ForegroundColor Yellow
git add .

Write-Host "✅ Files added" -ForegroundColor Green
Write-Host ""

Write-Host "Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Professional financial calculators website"

Write-Host "✅ Commit created" -ForegroundColor Green
Write-Host ""

Write-Host "Setting main branch..." -ForegroundColor Yellow
git branch -M main
Write-Host "✅ Branch set to main" -ForegroundColor Green
Write-Host ""

Write-Host "Connecting to GitHub repository..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/$username/$reponame.git"

# Remove existing remote if it exists
git remote remove origin 2>$null

git remote add origin $remoteUrl
Write-Host "✅ Connected to $remoteUrl" -ForegroundColor Green
Write-Host ""

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  Pushing to GitHub...               " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "You may be prompted for GitHub credentials..." -ForegroundColor Yellow
Write-Host "Use your GitHub username and Personal Access Token (not password)" -ForegroundColor Yellow
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Green
    Write-Host "  🎉 DEPLOYMENT SUCCESSFUL! 🎉      " -ForegroundColor Green
    Write-Host "=====================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Enable GitHub Pages:" -ForegroundColor Yellow
    Write-Host "   - Go to: https://github.com/$username/$reponame/settings/pages" -ForegroundColor White
    Write-Host "   - Under 'Build and deployment', select 'GitHub Actions'" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Wait 2-3 minutes for deployment" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "3. Visit your live site:" -ForegroundColor Yellow
    Write-Host "   https://$username.github.io/$reponame/" -ForegroundColor White
    Write-Host ""
    Write-Host "4. Check deployment status:" -ForegroundColor Yellow
    Write-Host "   https://github.com/$username/$reponame/actions" -ForegroundColor White
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "📚 For detailed instructions, see DEPLOYMENT.md" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Red
    Write-Host "  ❌ DEPLOYMENT FAILED               " -ForegroundColor Red
    Write-Host "=====================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Repository doesn't exist on GitHub" -ForegroundColor White
    Write-Host "   Solution: Create it first at https://github.com/new" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Authentication failed" -ForegroundColor White
    Write-Host "   Solution: Use a Personal Access Token instead of password" -ForegroundColor White
    Write-Host "   Create one at: https://github.com/settings/tokens" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Network issues" -ForegroundColor White
    Write-Host "   Solution: Check your internet connection and try again" -ForegroundColor White
    Write-Host ""
}

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
