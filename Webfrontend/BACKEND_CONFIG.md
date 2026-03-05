# Backend Deployment URLs Configuration Guide

## Available Backend URLs

- **Render**: `https://placid-digital.onrender.com`
- **Vercel**: `https://placid-digital.vercel.app`

## How to Configure

### For Development

1. Create or edit the `.env.local` file in the `Webfrontend` directory
2. Add the desired backend URL:
   ```
   VITE_BACKEND_URL=https://placid-digital.onrender.com
   ```
   Or
   ```
   VITE_BACKEND_URL=https://placid-digital.vercel.app
   ```
3. Restart your development server: `npm run dev`

### For Production

The backend URL is configured in `.env.production` (currently set to Render):
```
VITE_BACKEND_URL=https://placid-digital.onrender.com
```

To switch to Vercel for production:
1. Edit `.env.production`
2. Change the URL to: `https://placid-digital.vercel.app`
3. Rebuild: `npm run build`

## How It Works

- **Development**: The Vite dev server proxies API calls (`/sfs-app/*`) to the configured backend URL
- **Production**: The frontend makes direct API calls to the backend URL (CORS must be enabled on backend)

## API Endpoint Examples

All frontend API calls use relative paths like:
- `/sfs-app/course/all-course`
- `/sfs-app/admin/all-job`

These are automatically routed to:
- `https://placid-digital.onrender.com/sfs-app/course/all-course`
- Or `https://placid-digital.vercel.app/sfs-app/admin/all-job` (depending on configuration)
