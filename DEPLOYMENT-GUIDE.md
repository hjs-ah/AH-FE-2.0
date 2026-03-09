# 🚀 DEPLOYMENT STEPS - Follow These Exactly

## Step 1: Upload New Files to GitHub

You need to add these **3 NEW files** to your repo:

1. **`package.json`** → Root of repo
2. **`vercel.json`** → Root of repo  
3. **`api/build-data.js`** → Create `api` folder, put this file inside

And **REPLACE** this file:
4. **`script.js`** → Replace your existing script.js with the new one

### How to Upload:

**Option A: Via GitHub Website**
1. Go to your repo: `https://github.com/yourusername/AH-FE-2.0`
2. Click "Add file" → "Upload files"
3. Drag the 3 new files + updated script.js
4. Scroll down, click "Commit changes"

**Option B: Via Terminal (if you cloned locally)**
```bash
cd /path/to/AH-FE-2.0
# Copy new files to repo
# Then:
git add .
git commit -m "Add Notion CMS integration"
git push
```

---

## Step 2: Configure Vercel

Now go back to your Vercel tab (the one asking for settings).

### Environment Variables - Add These:

Click "Environment Variables" and add each one:

```
Name: NOTION_API_KEY
Value: [Paste your Notion integration token from Step 1 of Notion setup]

Name: NOTION_ARTICLES_DB  
Value: [Paste your Articles database ID]

Name: NOTION_CREATIONS_DB
Value: [Paste your Recent Creations database ID]

Name: NOTION_BOOKS_DB
Value: [Paste your Books database ID]

Name: NOTION_SETTINGS_ID
Value: [Paste your Site Settings page ID]
```

### Build Settings:

- **Framework Preset:** Other
- **Root Directory:** `./`
- **Build Command:** `npm run build`
- **Output Directory:** `.`
- **Install Command:** `npm install`

---

## Step 3: Deploy! 🎉

1. Click the **"Deploy"** button
2. Wait 1-2 minutes while Vercel:
   - Installs dependencies
   - Fetches your Notion data
   - Builds the site
3. You'll get a URL like: `https://your-site.vercel.app`

---

## Step 4: Test It

1. Visit your new Vercel URL
2. Check that:
   - Articles are showing
   - Gallery images display
   - Books section looks good
   - Profile info is correct

---

## Step 5: Update Content (Future)

When you want to update your site:

1. **Edit your Notion databases**
   - Add a new article
   - Change a gallery image  
   - Update book info
   - Whatever you need!

2. **Redeploy on Vercel**
   - Go to Vercel dashboard
   - Click your project
   - Click "Deployments" tab
   - Click the "..." menu on latest deployment
   - Click "Redeploy"

3. **Site updates in ~30 seconds!**

---

## Troubleshooting

**❌ Build fails?**
- Double-check all 5 environment variables are set correctly
- Make sure database IDs don't have extra spaces
- Verify Notion integration token starts with `secret_`

**❌ Data not showing?**
- Check that Notion integration is connected to all databases
- Verify each database has at least 1 "Published" item
- Check that Order numbers are set (1, 2, 3...)

**❌ Images not loading?**
- Make sure image URLs in Notion are publicly accessible
- GitHub URLs should be raw: `https://raw.githubusercontent.com/...`
- Or use your GitHub Pages URL: `https://yourusername.github.io/repo/image.jpg`

---

## Need Help?

If something breaks:
1. Check Vercel build logs (shows errors)
2. Verify all 5 environment variables
3. Make sure GitHub has all 4 files uploaded
4. Check that Notion databases have "Published" items

---

## Summary of What You're Uploading:

```
Your GitHub Repo Should Have:
├── api/
│   └── build-data.js          ← NEW
├── admin/                      (existing folders)
├── adminv2/                    (existing folders)
├── index.html                  (existing)
├── styles.css                  (existing)
├── script.js                   ← REPLACE with new version
├── favicon.svg                 (existing)
├── newman_thumb.jpg            (existing)
├── ProHeadshot_web-copy.jpg    (existing)
├── package.json                ← NEW
├── vercel.json                 ← NEW
├── firebase-test.html          (existing, can delete later)
└── README.md                   (existing, can replace with new one)
```

**Files to Download and Upload:**
1. ✅ package.json (NEW)
2. ✅ vercel.json (NEW)
3. ✅ api/build-data.js (NEW - create api folder first!)
4. ✅ script.js (REPLACE existing)
5. ✅ README.md (OPTIONAL - better docs)

---

**Once deployed, you'll never need to touch code again!** 
Just edit Notion and redeploy. 🎯
