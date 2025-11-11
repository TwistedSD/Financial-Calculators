# 🚀 Quick Start Guide

Choose your deployment method:

## Option 1: Automated Script (Easiest) ⚡

1. **Create GitHub repository first:**
   - Go to https://github.com/new
   - Name: `mortgage-calculator` (or any name)
   - Make it **Public**
   - **Don't** add README, .gitignore, or license
   - Click "Create repository"

2. **Run the deployment script:**
   ```powershell
   # Right-click deploy.ps1 → "Run with PowerShell"
   # OR open PowerShell here and run:
   .\deploy.ps1
   ```

3. **Enter your details when prompted:**
   - GitHub username
   - Repository name

4. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Set Source to "GitHub Actions"

**Done! Your site will be live in 2-3 minutes!**

---

## Option 2: Manual Git Commands 💻

See detailed instructions in **[DEPLOYMENT.md](DEPLOYMENT.md)**

---

## 📁 Project Structure

```
├── index.html              # Mortgage calculator (main page)
├── loan-calculator.html    # Loan calculator
├── compound-interest.html  # Compound interest
├── retirement-calculator.html
├── budget-planner.html
├── investment-calculator.html
├── privacy-policy.html     # Required for AdSense
├── about.html
├── contact.html
├── css/
│   ├── style.css          # Main styles
│   └── print.css          # Print styles
├── js/
│   ├── mortgage.js        # Calculator logic
│   ├── loan.js
│   ├── compound-interest.js
│   ├── retirement.js
│   ├── budget.js
│   └── investment.js
└── .github/workflows/
    └── deploy.yml         # Auto-deployment config
```

---

## 🎯 Next Steps After Deployment

### 1. Test Your Site
Visit: `https://YOUR-USERNAME.github.io/REPO-NAME/`

### 2. Apply for Google AdSense
- Wait 1-2 days after deployment
- Apply at: https://www.google.com/adsense/start/
- Use your GitHub Pages URL

### 3. Add AdSense Codes
Once approved, provide your:
- Publisher ID: `ca-pub-XXXXXXXXXX`
- Ad unit codes (I'll integrate them for you)

### 4. Optional Enhancements
- Add custom domain
- Set up Google Analytics
- Submit to Google Search Console

---

## 📞 Need Help?

- **Deployment Issues?** Check [DEPLOYMENT.md](DEPLOYMENT.md)
- **Feature Details?** See [README.md](README.md)
- **Git Problems?** Make sure Git is installed: https://git-scm.com

---

## 💡 Key Features

✅ 6 Professional Financial Calculators  
✅ SEO Optimized (Meta tags, Schema.org)  
✅ AdSense Ready (Strategic ad placements)  
✅ Mobile Responsive  
✅ Fast Loading (<2 seconds)  
✅ Privacy Policy Included  
✅ Auto-Deployment via GitHub Actions  

---

**Your future website URL:**
```
https://YOUR-USERNAME.github.io/REPO-NAME/
```

**Example:** If username is `john-doe` and repo is `mortgage-calculator`:
```
https://john-doe.github.io/mortgage-calculator/
```
