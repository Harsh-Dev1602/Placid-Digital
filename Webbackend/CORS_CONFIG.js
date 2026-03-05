// BACKEND CORS CONFIGURATION FOR DEPLOYMENT
// Update your Webbackend/index.js to use this CORS configuration for production

// Replace: App.use(cors());
// With:

const corsOptions = {
  origin: [
    "http://localhost:3002",        // Development
    "https://placid-digital.vercel.app",   // Vercel Frontend
    "https://placid-digital.onrender.com", // Render Backend (if frontend is hosted here)
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

App.use(cors(corsOptions));

// Or if you want to allow all origins (less secure):
// App.use(cors());
