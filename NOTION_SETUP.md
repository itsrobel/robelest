# Notion CMS Setup Guide

This guide will walk you through setting up Notion as a CMS for your SvelteKit blog.

> **⚠️ API Version Note**: This implementation uses **Notion SDK v2.x** (`@notionhq/client@^2.2.15`).
>
> **Why v2?** The Notion SDK v5+ introduced breaking changes that removed traditional `databases.query()` support. The migration path for existing databases in v5 is unclear, so we use the stable v2 API which is well-documented and widely used.
>
> **Future Migration**: When Notion's v5 API matures and provides clear migration documentation for traditional databases, this codebase will need to be updated. Monitor the [Notion SDK releases](https://github.com/makenotion/notion-sdk-js/releases) and [API changelog](https://developers.notion.com/page/changelog) for migration guides.

## Step 1: Create a Notion Integration

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click **"+ New integration"**
3. Name it something like "Blog CMS" or "Portfolio Blog"
4. Select your workspace
5. Click **"Submit"**
6. Copy the **"Internal Integration Token"** (starts with `secret_`)
7. Save this token - you'll need it for your `.env` file

## Step 2: Create Your Blog Database

1. Open Notion and create a new **full-page database**
2. Name it "Blog Posts" or similar
3. Add the following properties to your database:

   | Property Name | Type | Description |
   |--------------|------|-------------|
   | **Title** | Title | The blog post title (this is default) |
   | **Slug** | Text | URL-friendly identifier (e.g., "my-first-post") |
   | **Published** | Checkbox | Controls if post is visible on site |
   | **PublishDate** | Date | When the post was/will be published |
   | **Tags** | Multi-select | Categories/topics for the post |
   | **Description** | Text | Short summary for SEO and previews |
   | **OGImage** | URL | Social media preview image URL (optional) |

4. The property names **must match exactly** as shown above (including capitalization)

## Step 3: Share Database with Integration

1. Open your Blog Posts database in Notion
2. Click the **"•••"** (three dots) menu in the top right
3. Scroll down and click **"+ Add connections"**
4. Search for and select your integration (e.g., "Blog CMS")
5. Click **"Confirm"**

This gives your integration permission to read the database.

## Step 4: Get Your Database ID

The database ID is in the URL when viewing your database:

```
https://www.notion.so/[workspace]/[DATABASE_ID]?v=[view_id]
```

Example:
```
https://www.notion.so/myworkspace/a1b2c3d4e5f6?v=xyz123
```

The database ID is `a1b2c3d4e5f6` (the part between the workspace and the `?v=`)

Copy this ID - you'll need it for your `.env` file.

## Step 5: Configure Environment Variables

1. Create a `.env` file in the root of your project
2. Add your Notion credentials:

```env
NOTION_API_KEY=secret_your_integration_token_here
NOTION_DATABASE_ID=your_database_id_here
```

3. **Important**: Never commit the `.env` file to git (it's already in `.gitignore`)

## Step 6: Create Your First Blog Post

1. Open your Blog Posts database in Notion
2. Click **"+ New"** to create a new entry
3. Fill in the properties:
   - **Title**: "My First Blog Post"
   - **Slug**: "my-first-post" (no spaces, lowercase, hyphens ok)
   - **Published**: Check the box
   - **PublishDate**: Select today's date
   - **Tags**: Add some tags (e.g., "Tutorial", "Getting Started")
   - **Description**: Write a short summary
4. In the page body, write your blog post content using Notion's rich text editor
5. Supported content types:
   - Paragraphs
   - Headings (H1, H2, H3)
   - Bulleted lists
   - Numbered lists
   - Code blocks
   - Quotes
   - Callouts
   - Images
   - Dividers

## Step 7: Test Your Blog

1. Make sure your `.env` file is configured
2. Start your development server:
   ```bash
   npm run dev
   ```
3. Visit `http://localhost:5173/blog` to see your blog
4. Click on your post to view the full content

## Tips for Content Creators

### Writing Slugs
- Keep them short and descriptive
- Use lowercase letters
- Use hyphens instead of spaces
- Example: "introducing-notion-cms" not "Introducing Notion CMS"

### SEO Best Practices
- Always fill in the **Description** field (150-160 characters ideal)
- Use descriptive **Titles** (50-60 characters ideal)
- Add relevant **Tags** for organization
- Add an **OGImage** URL for better social media sharing

### Publishing Workflow
1. Create a new page with **Published** unchecked (draft mode)
2. Write and refine your content
3. Preview by temporarily checking **Published** (won't be cached yet)
4. When ready, check **Published** and set the **PublishDate**
5. Posts will appear on the site within 1 hour (ISR cache refresh)

### Forcing Immediate Updates
If you need changes to appear immediately:
1. Make your edits in Notion
2. Rebuild/redeploy your site, or
3. Wait up to 1 hour for the ISR cache to refresh

## Troubleshooting

### "Missing required title or slug" warning
- Make sure every published post has both a **Title** and **Slug**
- Property names are case-sensitive

### Posts not showing up
- Verify the **Published** checkbox is checked
- Check that your integration has access to the database
- Verify environment variables are set correctly
- Check the server console for error messages

### Images not loading
- Notion-hosted images may expire after a few hours
- For permanent images, host them externally (Cloudinary, Imgur, etc.)
- Add the URL to an image in your content or as the **OGImage**

### "Database not found" error
- Double-check your `NOTION_DATABASE_ID` in `.env`
- Verify the integration has access to the database
- Make sure you copied the full database ID from the URL

## Need Help?

The blog implementation uses these key files:
- `src/lib/notion.ts` - Notion client initialization
- `src/lib/notion-blog.ts` - Helper functions for fetching and parsing content
- `src/routes/blog/+page.server.ts` - Blog listing page loader
- `src/routes/blog/[slug]/+page.server.ts` - Individual post loader

Check these files if you need to customize the behavior or add new features.
