# Deploy पर Data दिखाने के लिए करने के काम (Steps to Fix Data on Production Deploy)

## समस्या (Problem):
- Vercel/Render में deploy करने के बाद data नहीं दिख रहा
- API calls fail हो रहे हैं
- Network tab में 404 error दिखराही है

## समाधान (Solution):

### Step 1: Vercel Dashboard में Environment Variable Add करें
1. Vercel Dashboard खोलें → अपना Project select करें
2. **Settings** → **Environment Variables** पर जाएं
3. **Add** बटन दबाएं और यह data fill करें:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://placid-digital.onrender.com`
   - **Environment**: Production (चेक करें)
4. **Save** करें

```
Name: VITE_API_URL
Value: https://placid-digital.onrender.com
Environment: Production, Preview, Development (सभी चेक करें)
```

### Step 2: Deployments को Redeploy करें
1. Vercel Dashboard में जाएं
2. **Deployments** tab खोलें
3. सबसे latest deployment पर hover करें
4. **Redeploy** बटन दबाएं
5. **OK** पर click करें
6. Deploy complete होने का इंतज़ार करें (2-3 minutes)

### Step 3: Backend CORS Update करें
Backend `/Webbackend/index.js` में CORS update करें:

```javascript
const corsOptions = {
  origin: [
    "https://placid-digital.vercel.app",     // आपका Vercel domain
    "https://placid-digital.onrender.com",   // Backend domain
    "http://localhost:3002"                   // Local development
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

App.use(cors(corsOptions));
```

### Step 4: Website खोलें और Check करें
1. अपनी website का link खोलें
2. **F12** दबाएं (Developer Tools खोलें)
3. **Network** tab में जाएं
4. Page को refresh करें (Ctrl+R)
5. API calls देखें:
   - ✅ URL should start with: `https://placid-digital.onrender.com/sfs-app/...`
   - ✅ Status code should be: 200 (green)
   - ❌ अगर 404, 500, या CORS error दिख सकते हैं तो debug करें

## Environment Variables List

### Vercel में जो होना चाहिए:
```
VITE_API_URL=https://placid-digital.onrender.com
```

### Render में जो होना चाहिए (अगर backend Render पर है):
```
MONGO_DB_URL=your-mongodb-url
PORT=3001
NODE_ENV=production
```

## Local Testing

अगर आप local में test करना चाहते हैं:

```bash
cd Webfrontend
npm run build
npm run preview
```

फिर `http://localhost:4173` खोलें

## Checklist (सब कुछ check करें)

- [ ] Vercel Environment Variable जोड़ दिया? (`VITE_API_URL`)
- [ ] Redeploy किया?
- [ ] Backend CORS update किया?
- [ ] Browser cache clear किया? (Ctrl+Shift+Delete)
- [ ] F12 Network tab में API URLs देख सकते हैं?
- [ ] API calls status 200 आ रहे हैं?
- [ ] Data page पर दिख रहा है?

## Common Errors & Fixes

### Error: "Failed to fetch" या 404
**कारण**: Backend URL गलत है या CORS error है  
**हल**: 
1. Vercel env variable सही है check करें
2. Backend CORS update करें
3. 5 minutes का इंतज़ार करें

### Error: "CORS error"
**कारण**: Frontend domain backend CORS में नहीं है  
**हल**: Backend/index.js में अपना Vercel domain add करें

### Error: "data.map is not a function"
**कारण**: API response सही न आ रहा हो  
**हल**: Network tab में API response check करें, backend logs देखें

## Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Render Dashboard**: https://dashboard.render.com
- **Environment Variables**: Project Settings → Environment Variables

---

**Last Step**: अगर भी problem है तो:
1. Browser console errors note करें
2. Network tab से API response check करें
3. Backend logs देखें (Render Console)
