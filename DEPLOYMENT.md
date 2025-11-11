# 🚀 GitHub Pages Deployment Guide

This guide will help you deploy your Financial Calculators website to GitHub Pages with automatic deployment.

## 📋 Prerequisites

- Git installed on your computer ([Download Git](https://git-scm.com/download/win))
- GitHub account ([Sign up at GitHub](https://github.com))

## 🎯 Quick Deploy (5 Minutes)

### Step 1: Create a New GitHub Repository

1. Go to https://github.com/new
2. Fill in repository details:
   - **Repository name**: `mortgage-calculator` (or your preferred name)
   - **Description**: "Professional mortgage and financial calculators"
   - **Visibility**: Public ✅ (required for free GitHub Pages)
   - **❌ DO NOT** check "Add a README file"
   - **❌ DO NOT** add .gitignore or license (we already have them)
3. Click **"Create repository"**

### Step 2: Initialize Git and Push Your Files

Open **PowerShell** and run these commands:

```powershell
# Navigate to your website folder
cd "C:\Users\demps\Desktop\Mortgage website"

# Initialize git repository
git init

# Add all files
git add .

# Commit your files
git commit -m "Initial commit: Financial calculators website"

# Rename branch to main (if needed)
git branch -M main

# Connect to your GitHub repository
# ⚠️ REPLACE 'YOUR-USERNAME' and 'mortgage-calculator' with your actual values
git remote add origin https://github.com/YOUR-USERNAME/mortgage-calculator.git

# Push to GitHub
git push -u origin main
```

**Example:**
If your GitHub username is `john-doe`, the command would be:
```powershell
git remote add origin https://github.com/john-doe/mortgage-calculator.git
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR-USERNAME/mortgage-calculator`
2. Click the **"Settings"** tab (top menu)
3. Click **"Pages"** in the left sidebar
4. Under "Build and deployment":
   - **Source**: Select **"GitHub Actions"** ⚡
5. That's it! The GitHub Action will automatically deploy your site

### Step 4: Wait for Deployment

1. Go to the **"Actions"** tab in your repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Wait 2-3 minutes for it to complete (green checkmark ✅)
4. Your site will be live at:
   ```
   https://YOUR-USERNAME.github.io/mortgage-calculator/
   ```

## ✅ Verify Your Deployment

1. Click on the latest workflow run in the Actions tab
2. Look for the deployment URL in the "deploy" job
3. Visit your live website!

## 🔄 Future Updates

After the initial setup, updating your site is easy:

```powershell
# Make your changes to any files
# Then commit and push:

cd "C:\Users\demps\Desktop\Mortgage website"
git add .
git commit -m "Updated calculator features"
git push
```

The GitHub Action will automatically redeploy your site! ⚡

## 🎨 Using a Custom Domain (Optional)

Want to use your own domain like `www.mycalculators.com`?

1. **Buy a domain** from:
   - Namecheap: https://www.namecheap.com
   - GoDaddy: https://www.godaddy.com
   - Cloudflare: https://www.cloudflare.com

2. **Configure DNS** (in your domain provider):
   - Add a CNAME record:
     - Name: `www`
     - Value: `YOUR-USERNAME.github.io`
   - Add A records for apex domain:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. **Add Custom Domain in GitHub**:
   - Go to Settings → Pages
   - Enter your custom domain
   - Click Save
   - Wait for DNS check (can take up to 24 hours)
   - Enable "Enforce HTTPS" once DNS is verified

## 🔧 Troubleshooting

### Git Not Found
```powershell
# Check if git is installed
git --version

# If not installed, download from:
# https://git-scm.com/download/win
```

### Authentication Issues
GitHub may ask for credentials. Use a **Personal Access Token**:

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` and `workflow` permissions
3. Use the token as your password when pushing

### Site Not Loading
- Wait 5 minutes after deployment
- Check Actions tab for errors
- Verify GitHub Pages is enabled with "GitHub Actions" source
- Clear browser cache

### Wrong URL
Your site URL is based on your username and repository name:
```
https://YOUR-USERNAME.github.io/REPOSITORY-NAME/
```

## 📱 Next Steps After Deployment

1. ✅ Test all calculators on your live site
2. ✅ Share the URL with friends/family for feedback
3. ✅ Apply for Google AdSense using your live URL
4. ✅ Submit to Google Search Console
5. ✅ Add Google Analytics (optional)

## 💰 Adding Google AdSense

Once your site is live for a few days:

1. Apply at: https://www.google.com/adsense/start/
2. Enter your GitHub Pages URL
3. After approval, provide me with:
   - Your AdSense publisher ID (`ca-pub-XXXXXXXXXX`)
   - Ad unit codes

I'll update all pages with your AdSense ads!

## 📊 Monitoring Your Site

### View Deployment Status
- Go to Actions tab: `https://github.com/YOUR-USERNAME/mortgage-calculator/actions`

### Check Traffic (Add Google Analytics)
1. Create account at: https://analytics.google.com
2. Get your tracking ID
3. I can add it to all pages for you!

## 🆘 Need Help?

If you encounter any issues:
1. Check the GitHub Actions logs for errors
2. Verify all files were pushed correctly
3. Make sure repository is public
4. Review GitHub Pages documentation: https://docs.github.com/pages

## 🎉 You're All Set!

Your professional mortgage calculator website is now:
- ✅ Live on the internet
- ✅ Automatically deployed on every update
- ✅ Hosted for free by GitHub
- ✅ Ready for Google AdSense
- ✅ SEO optimized
- ✅ Mobile responsive

**Share your live URL with me once deployed, and I can help with any customizations!**

---

**Quick Reference Commands:**

```powershell
# First time setup
cd "C:\Users\demps\Desktop\Mortgage website"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
git push -u origin main

# Future updates
git add .
git commit -m "Your update description"
git push
```

**Your site will be at:** `https://YOUR-USERNAME.github.io/REPO-NAME/`
