// Configuration for different environments
const config = {
  development: {
    API_URL: "http://localhost:5000",
    DEBUG: true,
  },
  production: {
    API_URL: "https://aggenius-backend.onrender.com", // Your live backend URL
    DEBUG: false,
  },
};

// Determine current environment
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "";

const currentEnv = isLocalhost ? "development" : "production";

// Export current configuration
const CONFIG = config[currentEnv];

// Make it globally available
window.CONFIG = CONFIG;
