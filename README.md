# Antone Holmes Portfolio - Notion CMS Integration

Portfolio website with Notion as a headless CMS, deployed on Vercel.

## Features

- ✨ Edit content through Notion (no code editing needed!)
- 🔥 Auto-deploys from GitHub to Vercel
- 📝 Manage articles, gallery, books, and settings in Notion
- 🎨 Same beautiful design, now with easy content management

## Setup Instructions

### 1. Notion Setup (Already Done ✅)

You should have:
- Notion integration created
- 4 databases: Articles, Recent Creations, Books, Site Settings
- Integration connected to all databases
- Database IDs copied

### 2. Vercel Environment Variables

In Vercel, add these environment variables:

```
NOTION_API_KEY=secret_your_integration_token_here
NOTION_ARTICLES_DB=your_articles_database_id
NOTION_CREATIONS_DB=your_creations_database_id
NOTION_BOOKS_DB=your_books_database_id
NOTION_SETTINGS_ID=your_settings_page_id
```

### 3. Deploy to Vercel

1. Push these new files to your GitHub repo:
   - `package.json`
   - `vercel.json`
   - `api/build-data.js`
   - `script.js` (updated version)

2. In Vercel, click **"Deploy"**

3. Vercel will:
   - Install dependencies
   - Run `npm run build` (fetches Notion data)
   - Create `data.json` with your content
   - Deploy the site

### 4. Update Content

To update your site content:

1. **Edit Notion databases** (add/edit articles, change images, etc.)
2. **Redeploy on Vercel**:
   - Option A: Push a change to GitHub (triggers auto-deploy)
   - Option B: Click "Redeploy" button in Vercel dashboard
3. Site updates in ~30 seconds!

## Notion Database Structure

### Articles Table
- **Title** (Title) - Article headline
- **URL** (URL) - Link to Medium article
- **Description** (Text) - Brief excerpt
- **Published** (Date) - Publication date
- **Order** (Number) - Display order (1, 2, 3...)
- **Status** (Select) - Published or Draft

### Recent Creations Table
- **Name** (Title) - Creation name
- **Image URL** (URL) - Link to image (GitHub or external)
- **Order** (Number) - Display order
- **Status** (Select) - Published or Draft

### Books Reading Table
- **Title** (Title) - Book title
- **Author** (Text) - Author name
- **Cover Image URL** (URL) - Book cover image
- **Amazon Link** (URL) - Link to Amazon
- **Order** (Number) - Display order
- **Status** (Select) - Published or Draft

### Site Settings (Page Properties)
- **Profile Image URL** (URL)
- **LinkedIn URL** (URL)
- **Behance URL** (URL)
- **Medium URL** (URL)
- **Email** (Email)

## File Structure

```
AH-FE-2.0/
├── api/
│   └── build-data.js       # Fetches Notion data at build time
├── admin/                  # Admin interface (optional)
├── index.html             # Main HTML
├── styles.css             # Styling
├── script.js              # JavaScript (updated to use Notion data)
├── favicon.svg            # Favicon
├── newman_thumb.jpg       # Book cover
├── ProHeadshot_web-copy.jpg  # Profile photo
├── package.json           # Dependencies
├── vercel.json           # Vercel config
├── data.json             # Generated from Notion (created at build)
└── README.md             # This file
```

## How It Works

1. **Build Time**: Vercel runs `api/build-data.js`
   - Connects to Notion API
   - Fetches all content from your databases
   - Generates `data.json` file

2. **Runtime**: Site loads `data.json`
   - `script.js` fetches from `data.json`
   - Populates articles, gallery, books
   - Updates social links and profile

3. **Fallback**: If Notion data fails to load
   - Site displays hardcoded fallback content
   - Still functions normally

## Admin Access

The "Admin Login" button opens your Notion workspace where you can edit content.

Update the link in `script.js` (line ~285):
```javascript
window.open('https://notion.so/your-workspace-url', '_blank');
```

## Local Development

```bash
# Install dependencies
npm install

# Build data from Notion
npm run build

# Serve locally (needs Python 3)
npm run dev
```

Visit `http://localhost:8000`

## Troubleshooting

**Data not updating?**
- Check environment variables in Vercel
- Verify Notion integration has access to databases
- Check database IDs are correct
- Redeploy on Vercel

**Build failing?**
- Check Vercel build logs
- Verify `NOTION_API_KEY` is set correctly
- Make sure all database IDs are valid

**Images not showing?**
- Verify image URLs in Notion are publicly accessible
- GitHub URLs should be: `https://raw.githubusercontent.com/...` or `https://your-username.github.io/...`

## Next Steps / V3 Ideas

- [ ] Add rebuild webhook (update site when Notion changes)
- [ ] Add image upload directly to GitHub via admin interface
- [ ] Add analytics integration
- [ ] Add blog post preview before publishing
- [ ] Add search functionality for articles

---

**Built with ❤️ by Antone Holmes**
