# AgGenius - Agricultural Business Website

AgGenius (TAG) is a comprehensive agricultural business website that provides information about agricultural services, blog posts, and contact functionality. The application consists of a frontend built with HTML/CSS/JavaScript and a backend API built with Node.js and Express.

## Features

- **Multi-page Website**: Home, About, Services, Blog, Gallery, Contact, and more
- **User Authentication**: Registration and login functionality
- **Blog System**: Create and view blog posts with commenting system
- **Contact Form**: Contact submission handling
- **File Upload**: Support for image uploads
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- Responsive design with modern UI/UX

### Backend
- Node.js with Express.js
- SQLite database
- JWT authentication
- Multer for file uploads
- CORS enabled for cross-origin requests

## Project Structure

```
AgGenius/
├── frontend/           # Static frontend files
│   ├── index.html     # Main homepage
│   ├── about.html     # About page
│   ├── services.html  # Services page
│   ├── blog.html      # Blog page
│   ├── contact.html   # Contact page
│   ├── login.html     # Login page
│   ├── register.html  # Registration page
│   ├── styles.css     # Main stylesheet
│   ├── script.js      # Main JavaScript file
│   └── *.jpg/png      # Image assets
└── backend/           # Backend API
    ├── routes/        # API route handlers
    ├── uploads/       # File upload directory
    ├── server.js      # Main server file
    ├── database.js    # Database configuration
    ├── database.db    # SQLite database file
    └── package.json   # Dependencies
```

## Local Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Serve the static files using a local server:
   ```bash
   # Using Python 3
   python -m http.server 3000
   
   # Using Node.js http-server (install globally: npm install -g http-server)
   http-server -p 3000
   
   # Using Live Server extension in VS Code
   ```
   The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Blog
- `GET /blog/posts` - Get all blog posts
- `POST /blog/posts` - Create new blog post (authenticated)

### Comments
- `GET /comments/:postId` - Get comments for a post
- `POST /comments` - Add new comment (authenticated)

### Contact
- `POST /contact` - Submit contact form

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
NODE_ENV=production
```

## Deployment

### Render Deployment (Backend)

1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. Create a new Web Service
4. Set the following:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**: Add your environment variables

### Frontend Deployment Options

1. **Netlify/Vercel**: Deploy the `frontend` folder directly
2. **GitHub Pages**: Host static files from the `frontend` directory
3. **Render Static Site**: Deploy frontend as a static site

## Production Considerations

- Database: Consider migrating from SQLite to PostgreSQL for production
- File Storage: Use cloud storage (AWS S3, Cloudinary) instead of local uploads
- Environment Variables: Properly configure all sensitive data
- CORS: Configure CORS for your production frontend URL
- SSL: Ensure HTTPS is enabled
- Monitoring: Add logging and monitoring solutions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the ISC License.

## Contact

For questions or support, please use the contact form on the website or reach out through the repository issues. 