# 🚀 FRESH DEPLOYMENT - All Files Included

## What's in This Package

✅ **7 Core Files** - Everything you need for the portfolio with Notion CMS

## File Checklist

Upload ALL of these files to the ROOT of your GitHub repo:

- [ ] `index.html` - Main website page
- [ ] `styles.css` - All styling
- [ ] `script.js` - JavaScript + Notion integration
- [ ] `favicon.svg` - "AH" favicon
- [ ] `package.json` - Dependencies
- [ ] `vercel.json` - Vercel configuration
- [ ] `build-data.js` - Notion data fetcher

## Additional Files You Should Keep

These are already in your repo - keep them:

- `newman_thumb.jpg` - Book cover image
- `ProHeadshot_web-copy.jpg` - Profile photo
- `README.md` - (optional, can replace with this one)

## Files You Can DELETE

Delete these if they exist:

- ❌ `api/` folder (entire folder and contents)
- ❌ `firebase-test.html` (not needed)
- ❌ `admin/` and `adminv2/` folders (old admin attempts)
- ❌ Any old `build-data.js` in wrong locations

---

## Step-by-Step Deployment

### 1. Clean Your GitHub Repo

1. Go to: `https://github.com/hjs-ah/AH-FE-2.0`
2. Delete EVERYTHING except:
   - `newman_thumb.jpg`
   - `ProHeadshot_web-copy.jpg`
3. Your repo should be almost empty

### 2. Upload Fresh Files

1. Click "Add file" → "Upload files"
2. Drag ALL 7 files from this package:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `favicon.svg`
   - `package.json`
   - `vercel.json`
   - `build-data.js`
3. Commit changes

### 3. Verify File Structure

Your repo should look like this:

```
AH-FE-2.0/
├── build-data.js
├── favicon.svg
├── index.html
├── newman_thumb.jpg
├── package.json
├── ProHeadshot_web-copy.jpg
├── README.md (optional)
├── script.js
├── styles.css
└── vercel.json
```

**NO FOLDERS!** Everything in the root.

### 4. Set Vercel Environment Variables

In Vercel, add these 5 variables:

```
NOTION_API_KEY = secret_your_token_here
NOTION_ARTICLES_DB = your_articles_db_id
NOTION_CREATIONS_DB = your_creations_db_id
NOTION_BOOKS_DB = your_books_db_id
NOTION_SETTINGS_ID = your_settings_page_id
```

### 5. Deploy on Vercel

Settings:
- **Framework Preset:** Other
- **Root Directory:** `./`
- **Build Command:** `npm run build`
- **Output Directory:** `.`
- **Install Command:** `npm install`

Click **"Deploy"**!

---

## What Happens During Build

1. Vercel runs `npm install` → Installs @notionhq/client
2. Vercel runs `npm run build` → Runs `node build-data.js`
3. `build-data.js` connects to Notion → Fetches your content
4. Creates `data.json` with all your data
5. Site goes live!

---

## Troubleshooting

**Build fails with "Cannot find module"?**
- Check that `build-data.js` is in ROOT (not in a folder)
- Check that `package.json` is in ROOT
- Verify no `api/` folder exists

**"NOTION_API_KEY is not defined"?**
- Double-check environment variables in Vercel
- Make sure they're spelled exactly right
- No extra spaces in the values

**Data not showing?**
- Check Notion databases have items with Status = "Published"
- Verify integration is connected to all databases
- Check Order numbers are set (1, 2, 3...)

---

## After Successful Deployment

### Update Your Notion Link

In `script.js`, find line ~280 and update:

```javascript
window.open('https://notion.so/your-workspace/Portfolio-Content-abc123', '_blank');
```

Replace with your actual Notion page URL.

### Test Everything

- [ ] Articles showing?
- [ ] Gallery images loading?
- [ ] Books section working?
- [ ] Profile photo visible?
- [ ] Social links working?
- [ ] Theme toggle working?
- [ ] Copyright year correct?

### Update Content

1. Edit Notion databases
2. In Vercel: Deployments → ... menu → Redeploy
3. Wait 30 seconds
4. Refresh your site!

---

## Support

If you still get errors:
1. Check Vercel build logs
2. Verify all 5 environment variables
3. Confirm file structure matches above
4. Make sure Notion integration has database access

---

**You're ready to deploy! 🎉**
