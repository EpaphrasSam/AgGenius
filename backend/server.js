const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

// Import routes
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const commentRoutes = require("./routes/comments");
const contactRoutes = require("./routes/contact");

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? [
          process.env.FRONTEND_URL || "https://epaphrassam.github.io",
          "https://epaphrassam.github.io",
        ]
      : [
          "http://localhost:3000",
          "http://127.0.0.1:3000",
          "http://127.0.0.1:5500",
        ],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "AgGenius Backend API is running!",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// File upload configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = process.env.ALLOWED_FILE_TYPES?.split(",") || [
      "image/jpeg",
      "image/png",
      "image/gif",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

// Use routes
app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);
app.use("/comments", commentRoutes);
app.use("/contact", contactRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: "File too large" });
  }

  if (err.message === "Invalid file type") {
    return res.status(400).json({ error: "Invalid file type" });
  }

  res.status(500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Something went wrong!"
        : err.message,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
