# Repurpose

Apple-style frontend MVP for a TikTok-first reposting tool.

## Idea

1. Post/edit inside TikTok.
2. TikTok saves the final video to your phone.
3. Upload the saved MP4/MOV here.
4. Paste the TikTok share link.
5. Backend detects the caption.
6. Backend reposts the uploaded video + caption to YouTube Shorts, Instagram Reels, Facebook Reels, etc.

## Current status

This repo is frontend-only. It includes:

- Responsive landing page
- Upload UI
- TikTok share link input
- Placeholder caption detection
- Editable caption field
- Platform selector
- Mock queue/status panel
- Placeholder account connection cards

## Files

- `index.html` — main page
- `styles.css` — full responsive Apple-style design
- `script.js` — frontend interactions/mock queue

## Backend plan

Recommended backend stack:

- Cloudflare Pages for frontend hosting
- Cloudflare Workers for API routes
- Cloudflare R2 for video storage
- Cloudflare D1 or Supabase for database
- Cloudflare Queues for posting jobs
- YouTube Data API first
- Meta Graph API later for Instagram/Facebook

## Deploy

You can host this as a static site on GitHub Pages or Cloudflare Pages.

For Cloudflare Pages:

1. Connect this GitHub repo to Cloudflare Pages.
2. Use no build command.
3. Use `/` as the output directory.
4. Deploy.

For GitHub Pages:

1. Go to Settings → Pages.
2. Source: deploy from branch.
3. Branch: `main`.
4. Folder: `/root`.
