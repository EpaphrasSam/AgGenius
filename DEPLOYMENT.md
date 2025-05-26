# Deployment Guide for AgGenius

This guide covers deploying the AgGenius application to production using various hosting platforms.

## Render Deployment (Recommended)

### Backend Deployment on Render

1. **Push to GitHub**

   - Ensure your code is pushed to a GitHub repository
   - Make sure the `.gitignore` file excludes sensitive files

2. **Create Render Account**

   - Sign up at [render.com](https://render.com)
   - Connect your GitHub account

3. **Deploy Backend**

   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: `aggenius-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free (or paid for better performance)

4. **Environment Variables**
   Add these environment variables in Render dashboard:

   ```
   NODE_ENV=production
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=10000
   ```

5. **Database Considerations**
   - For production, consider upgrading to PostgreSQL
   - Render offers free PostgreSQL databases
   - Update your database configuration accordingly

### Frontend Deployment Options

#### Option 1: Render Static Site

1. Create a new "Static Site" on Render
2. Connect the same GitHub repository
3. Set **Publish Directory**: `frontend`
4. Deploy

#### Option 2: Netlify

1. Sign up at [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Set **Publish Directory**: `frontend`
4. Deploy

#### Option 3: Vercel

1. Sign up at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set **Framework Preset**: Other
4. Set **Root Directory**: `frontend`
5. Deploy

## Alternative Deployment Platforms

### Heroku

1. Install Heroku CLI
2. Create a new Heroku app
3. Add a `Procfile` in the backend directory:
   ```
   web: npm start
   ```
4. Deploy using Git

### Railway

1. Sign up at [railway.app](https://railway.app)
2. Connect GitHub repository
3. Configure build and start commands
4. Deploy

## Production Checklist

### Security

- [ ] Set strong JWT secret
- [ ] Configure CORS for production URLs
- [ ] Use HTTPS (SSL certificates)
- [ ] Validate and sanitize all inputs
- [ ] Rate limiting for API endpoints

### Database

- [ ] Migrate from SQLite to PostgreSQL for production
- [ ] Set up database backups
- [ ] Configure connection pooling

### File Storage

- [ ] Move from local file storage to cloud storage (AWS S3, Cloudinary)
- [ ] Configure proper file upload limits
- [ ] Implement file type validation

### Monitoring

- [ ] Set up error logging (Sentry, LogRocket)
- [ ] Configure uptime monitoring
- [ ] Set up performance monitoring

### Performance

- [ ] Enable gzip compression
- [ ] Configure caching headers
- [ ] Optimize images
- [ ] Minify CSS/JS files

## Environment Variables for Production

Create these environment variables in your hosting platform:

```env
# Required
NODE_ENV=production
JWT_SECRET=your_super_secret_jwt_key_here
PORT=10000

# Optional (for enhanced functionality)
DATABASE_URL=postgresql://username:password@host:port/database
FRONTEND_URL=https://your-frontend-domain.com
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif

# For cloud storage (if implemented)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_bucket_name
AWS_REGION=us-east-1
```

## Post-Deployment Steps

1. **Test all functionality**

   - User registration and login
   - Blog post creation and viewing
   - Comment system
   - Contact form submission
   - File uploads

2. **Configure custom domain** (optional)

   - Set up DNS records
   - Configure SSL certificate

3. **Set up monitoring**

   - Configure uptime monitoring
   - Set up error alerts

4. **Performance optimization**
   - Test loading speeds
   - Optimize images and assets
   - Configure CDN if needed

## Troubleshooting

### Common Issues

1. **CORS Errors**

   - Update CORS configuration in backend
   - Add production frontend URL to allowed origins

2. **Database Connection Issues**

   - Check database URL format
   - Verify database credentials
   - Ensure database is accessible from hosting platform

3. **File Upload Issues**

   - Check file size limits
   - Verify upload directory permissions
   - Consider moving to cloud storage

4. **Environment Variable Issues**
   - Verify all required environment variables are set
   - Check for typos in variable names
   - Ensure sensitive data is not in source code

### Getting Help

- Check hosting platform documentation
- Review application logs
- Test locally with production environment variables
- Use browser developer tools for frontend issues
