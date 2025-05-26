# GitHub Pages + Render Deployment Guide

## 🎨 Frontend on GitHub Pages (FREE!)

### Step 1: Push to GitHub

```bash
# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/aggenius.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

### Step 3: Configure for GitHub Pages

Since GitHub Pages serves from root, we need to move frontend files to root:

```bash
# Move frontend files to root for GitHub Pages
git mv frontend/* .
git mv frontend/.* . 2>/dev/null || true  # Move hidden files if any
git rm -rf frontend/
git add .
git commit -m "Move frontend files to root for GitHub Pages"
git push
```

Your site will be available at: `https://YOUR_USERNAME.github.io/aggenius`

## 🗄️ SQLite Database on Render - YES, It Works!

**Good news**: Render DOES support SQLite! Here's what you need to know:

### ✅ SQLite on Render Works For:

- Development and testing
- Small to medium applications
- Read-heavy workloads
- Prototypes and demos

### ⚠️ Important Considerations:

1. **File System**: Render's file system is ephemeral (resets on deploys)
2. **Data Persistence**: Your database will reset when you redeploy
3. **Scaling**: SQLite doesn't support multiple concurrent writers

### 🔧 Make SQLite Work on Render:

1. **Ensure database directory exists**:

```javascript
// Add to your backend/database.js
const fs = require("fs");
const path = require("path");

// Ensure database directory exists
const dbDir = path.dirname("./database.db");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}
```

2. **Add database initialization**:

```javascript
// In your backend/server.js, add after database import:
const db = require("./database");

// Initialize database on startup
db.serialize(() => {
  console.log("Database initialized successfully");
});
```

## 🚀 Deployment Steps:

### Backend to Render:

1. Deploy backend to Render (SQLite will work!)
2. Set environment variables:
   ```
   NODE_ENV=production
   JWT_SECRET=your_super_secret_key
   PORT=10000
   ```
3. Copy your backend URL (e.g., `https://aggenius-backend.onrender.com`)

### Frontend to GitHub Pages:

1. Update `config.js` with your Render backend URL
2. Push to GitHub
3. Enable GitHub Pages
4. Your frontend will be at `https://YOUR_USERNAME.github.io/aggenius`

## 🔄 For Production (Optional Upgrade):

If you want persistent data later, you can easily upgrade to PostgreSQL:

1. **Add PostgreSQL to Render** (free tier available)
2. **Update your database.js**:

```javascript
// For PostgreSQL (when you're ready to upgrade)
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});
```

## 📝 Quick Summary:

- ✅ **Frontend**: GitHub Pages (100% free, perfect for static sites)
- ✅ **Backend**: Render with SQLite (works great for demos/small apps)
- ✅ **Database**: SQLite is supported on Render
- 🔄 **Future**: Easy upgrade to PostgreSQL when needed

Your current setup is perfect for getting started!
