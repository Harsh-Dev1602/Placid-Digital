# Backend Deployment Configuration Guide

## Overview

Your application can now use either of these backend URLs:
- **Render**: https://placid-digital.onrender.com
- **Vercel**: https://placid-digital.vercel.app

## Frontend Configuration

### Files Created:

1. **`.env.local`** - Development environment variables
2. **`.env.production`** - Production environment variables  
3. **`.env.example`** - Template for environment setup
4. **`src/services/api.js`** - Centralized API client (for future enhancements)
5. **`vite.config.js`** - Updated to use environment variables

### How to Switch Backend URLs

#### For Development:

1. Edit `.env.local` in the `Webfrontend` directory
2. Set the backend URL:
   ```
   VITE_BACKEND_URL=https://placid-digital.onrender.com
   ```
   or
   ```
   VITE_BACKEND_URL=https://placid-digital.vercel.app
   ```
3. Restart dev server: `npm run dev`

#### For Production (Vercel):

1. Go to Vercel Project Settings → Environment Variables
2. Add or update: `VITE_BACKEND_URL=https://placid-digital.onrender.com`
3. Redeploy your project

Alternatively, edit `.env.production` locally and rebuild:
```bash
npm run build
```

## Backend Configuration (Important!)

### Update CORS on Backend

Your backend currently allows all origins. For production, update `Webbackend/index.js`:

Replace:
```javascript
App.use(cors());
```

With explicit origin allowlist:
```javascript
const corsOptions = {
  origin: [
    "http://localhost:3002",                    // Development
    "https://placid-digital.vercel.app",        // Vercel Frontend
    "https://placid-digital.onrender.com",      // Render (if frontend hosted here)
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

App.use(cors(corsOptions));
```

## Deployment Checklist

### For Vercel Frontend + Render Backend:
- [ ] Frontend deployed to Vercel
- [ ] `.env.production` in Vercel set to `VITE_BACKEND_URL=https://placid-digital.onrender.com`
- [ ] Backend CORS configured to allow `https://placid-digital.vercel.app`
- [ ] Test API calls in production

### For Render Frontend + Vercel Backend:
- [ ] Frontend deployed to Render  
- [ ] Environment variable set to `VITE_BACKEND_URL=https://placid-digital.vercel.app`
- [ ] Backend CORS configured to allow `https://placid-digital.onrender.com`
- [ ] Test API calls in production

## Testing

### Development:
```bash
cd Webfrontend
npm run dev
```
All API calls will be proxied through the `.env.local` configured URL.

### Production:
- Vite will build with the environment variables from `.env.production`
- API calls will go directly to the configured backend URL

## Troubleshooting

### CORS Errors in Production?
- Check backend CORS configuration
- Verify `VITE_BACKEND_URL` environment variable is set correctly
- Check that the frontend deployment URL is whitelisted in backend CORS

### API calls still going to wrong URL?
- Clear browser cache
- Rebuild frontend: `npm run build`
- Verify environment variables with: `echo $VITE_BACKEND_URL`

### Different URLs for Different Environments?
- Use `.env.local` for development
- Use `.env.production` for production builds
- Use Vercel/Render dashboard for deployed environment variables

## File Locations

```
Webfrontend/
├── .env.local              ← Edit for development
├── .env.production         ← Edit for production
├── .env.example            ← Reference template
├── BACKEND_CONFIG.md       ← Configuration guide
├── vite.config.js          ← Updated to use env vars
└── src/
    └── services/
        └── api.js          ← API client (for future use)

Webbackend/
└── CORS_CONFIG.js          ← CORS reference configuration
```
