# Quick Setup Guide for AgGenius

## 🚀 Push to GitHub

1. **Create a new repository on GitHub**

   - Go to [github.com](https://github.com) and click "New repository"
   - Name it `aggenius` or `agricultural-website`
   - Don't initialize with README (we already have one)
   - Make it public for free hosting

2. **Connect your local repository to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

## 🌐 Deploy Backend to Render

1. **Sign up at [render.com](https://render.com)**

   - Connect your GitHub account

2. **Create a new Web Service**

   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `aggenius-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free

3. **Set Environment Variables**

   ```
   NODE_ENV=production
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   PORT=10000
   ```

4. **Copy your backend URL**
   - After deployment, copy the URL (e.g., `https://aggenius-backend.onrender.com`)

## 🎨 Deploy Frontend

### Option 1: Render Static Site

1. Create new "Static Site" on Render
2. Connect same GitHub repository
3. Set **Publish Directory**: `frontend`
4. **Before deploying**: Update `frontend/config.js` with your backend URL

### Option 2: Netlify (Recommended)

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `frontend` folder
3. **Before deploying**: Update `frontend/config.js` with your backend URL

## 📝 Important: Update Configuration

**Before deploying frontend**, update `frontend/config.js`:

```javascript
production: {
  API_URL: "https://YOUR_ACTUAL_BACKEND_URL.onrender.com", // Replace with your Render backend URL
  DEBUG: false
}
```

## ✅ Post-Deployment Checklist

- [ ] Backend is running and accessible
- [ ] Frontend can connect to backend
- [ ] User registration works
- [ ] User login works
- [ ] Blog posts can be created
- [ ] Contact form works
- [ ] File uploads work (if needed)

## 🔧 Troubleshooting

- **CORS errors**: Make sure your frontend URL is added to backend CORS configuration
- **API not found**: Check that your frontend config.js has the correct backend URL
- **Database issues**: SQLite works for demo, consider PostgreSQL for production

## 📞 Need Help?

Check the detailed `DEPLOYMENT.md` file for comprehensive deployment instructions and troubleshooting.
