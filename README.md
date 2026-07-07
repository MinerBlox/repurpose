# Repurpose

Private frontend dashboard for reposting saved TikTok videos.

## What this is

This is not a public SaaS-style website. It is a private utility for one workflow:

1. Edit and post the video on TikTok.
2. TikTok saves the final video to your phone.
3. Open this dashboard.
4. Upload the saved video.
5. Paste the TikTok share link.
6. Detect/edit the caption.
7. Queue it for YouTube Shorts, Instagram Reels, and Facebook Reels.

## Current status

Frontend only.

Included:

- Mobile and desktop private dashboard
- Video upload UI
- TikTok share link input
- Placeholder caption detection
- Editable caption
- Platform checkboxes
- Mock queue/status card

## Files

- `index.html`
- `styles.css`
- `script.js`

## Backend plan

Build in this order:

1. Cloudflare Worker API
2. R2 upload URL creation
3. Save uploaded video metadata
4. YouTube OAuth
5. YouTube Shorts upload
6. Meta OAuth
7. Instagram/Facebook Reels posting

## Hosting

Static hosting works with GitHub Pages or Cloudflare Pages.

Cloudflare Pages settings:

- Build command: empty
- Output directory: `/`
- Root directory: `/`
