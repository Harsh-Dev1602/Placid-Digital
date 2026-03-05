# Production Data Loading Fix Guide

## Issue
Data not showing on deployed frontend because API calls are failing in production.

## Root Cause
In production (Vercel deployment), the Vite dev proxy doesn't work. API calls need to use absolute URLs to the backend.

## Solution Implemented

### 1. **Updated vite.config.js**
- Now uses environment variable `VITE_API_URL`
- Falls back to `https://placid-digital.onrender.com`

### 2. **Created src/config/apiConfig.js**
- Automatically adds the correct backend URL prefix in production
- Uses relative paths in development (proxied)
- Uses absolute URLs in production

### 3. **Updated src/main.jsx**
- Initializes axios interceptors on app startup
- All API calls automatically get the correct URL

### 4. **Enhanced CourseDetails.jsx**
- Added loading/error states
- Better error logging
- Proper array handling

## What You Need to Do

### For Vercel Deployment:

1. **Add Environment Variable in Vercel Dashboard:**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL=https://placid-digital.onrender.com`
   - Or: `VITE_API_URL=https://placid-digital.vercel.app` (if backend is on Vercel)

2. **Redeploy Your Project**
   - Push changes to GitHub or manually trigger redeploy in Vercel
   - Wait for deployment to complete

3. **Verify CORS on Backend**
   - Your backend must allow requests from your Vercel domain
   - Update Webbackend/index.js:
   ```javascript
   const corsOptions = {
     origin: [
       'https://placid-digital.vercel.app',
       'https://your-vercel-domain.vercel.app',
       'http://localhost:3002'
     ],
     credentials: true,
   };
   App.use(cors(corsOptions));
   ```

### For Local Development:

1. Create `.env.local` in Webfrontend folder:
   ```
   VITE_API_URL=https://placid-digital.onrender.com
   ```

2. Or just use the dev server proxy (no env var needed):
   ```bash
   npm run dev
   ```

## Testing

### Check Browser Console (F12)
1. Open Network tab
2. Look for API calls (they should show the full backend URL in prod)
3. Check Console for any error messages

### Sample Output
**Development**: `/sfs-app/course/all-course` (proxied)
**Production**: `https://placid-digital.onrender.com/sfs-app/course/all-course`

## Debugging Commands

### Check Vercel Environment Variables:
```bash
vercel env list
```

### Local test with specific backend URL:
```bash
VITE_API_URL=https://placid-digital.onrender.com npm run dev
```

### Build locally to test production mode:
```bash
npm run build
npm run preview
```

## Common Issues & Fixes

### Issue: "data.map is not a function"
✅ Fixed - All array operations now have fallback empty arrays

### Issue: 404 on API calls
- Check that API endpoint is correct
- Verify backend CORS allows your frontend domain
- Check Network tab to see actual API URL

### Issue: CORS error in console
- Backend CORS not configured for your frontend domain
- Update Webbackend/index.js with your Vercel domain

## Files Modified

- `vite.config.js` - Uses environment variables
- `src/main.jsx` - Sets up axios interceptors
- `src/config/apiConfig.js` - API URL helper functions
- `src/Course/CourseDetails.jsx` - Better error handling
- `.env.production` - Production API URL

## Backend URL Options

- **Render**: `https://placid-digital.onrender.com`
- **Vercel**: `https://placid-digital.vercel.app`

Choose one and set as `VITE_API_URL` in Vercel dashboard!
