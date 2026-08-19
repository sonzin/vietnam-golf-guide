# Vietnam Golf Guide

A Jekyll site hosted on GitHub Pages — a free resource for planning golf in Vietnam, positioned as a **resource/tool site** that naturally routes readers to [Wingolf](https://wingolf.com.vn/) for booking. Not a satellite blog, not a PBN.

Live demo (test): `https://<your-username>.github.io/vietnam-golf-guide/`

## Pages (MVP — 8 URLs)

| URL | Type | Wingolf destination |
|---|---|---|
| `/` | Homepage | Wingolf homepage |
| `/golf-courses/` | Course directory | `/san-golf/` |
| `/golf-courses-hanoi/` | Destination guide | Individual Hanoi courses |
| `/da-nang-golf/` | Destination guide | Golf tours / Da Nang |
| `/ho-chi-minh-golf/` | Destination guide | Individual HCMC courses |
| `/nha-trang-golf/` | Destination guide | Nha Trang / Cam Ranh courses |
| `/phu-quoc-golf/` | Destination guide | Phu Quoc packages |
| `/dalat-golf/` | Destination guide | Da Lat courses |
| `/stay-and-play-vietnam/` | Guide | Stay & Play packages + guide article |
| `/golf-trip-planner/` | JS tool | Golf tours |
| `/corporate-golf-event/` | JS tool | Corporate golf events |

Plus: `/about/`, `404`, `robots.txt`, `sitemap.xml`.

## Deploy (5 minutes)

1. Create a new GitHub repo named `vietnam-golf-guide` (private or public — public is required for GitHub Pages on free plans).
2. Push this folder's contents to the repo:
   ```bash
   cd vietnam-golf-guide
   git init
   git add .
   git commit -m "chore: initial Vietnam Golf Guide MVP"
   git branch -M main
   git remote add origin https://github.com/<your-username>/vietnam-golf-guide.git
   git push -u origin main
   ```
3. Repo **Settings → Pages** → Source: **Deploy from a branch** → Branch: **`main`** → Folder: **`/root`** → Save.
4. Wait 1–2 minutes; the site goes live at `https://<your-username>.github.io/vietnam-golf-guide/`.

### Custom domain (later)

GitHub Pages supports a custom domain with HTTPS for free — set it in **Settings → Pages** and add a CNAME. No code changes needed.

## Configuration

Edit `_config.yml` **before** the first push:

```yaml
url: "https://<your-username>.github.io"   # your GitHub Pages root
baseurl: /vietnam-golf-guide              # repo name; set to "" if you use <username>.github.io
```

The `wingolf:` block holds all outbound URLs — update it if Wingolf URLs change.

## Local development

GitHub Pages builds with Jekyll automatically, so local build is optional. To preview locally:

```bash
# Option A — exact GitHub Pages parity (requires Ruby >= 3.0)
bundle install
bundle exec jekyll serve

# Option B — plain Jekyll (lighter)
# (on macOS: brew install ruby, then:)
gem install jekyll jekyll-sitemap jekyll-seo-tag
# temporarily rename Gemfile so bundler doesn't intercept, then:
jekyll serve
```

Preview at `http://localhost:4000/vietnam-golf-guide/`.

## Structure

```
vietnam-golf-guide/
├── _config.yml              # site config + Wingolf URLs
├── _data/golf-courses.yml   # course dataset (single source of truth)
├── _layouts/default.html    # HTML shell + SEO head + JSON-LD
├── _includes/               # header, footer, course-card, schema
├── assets/css/main.css      # design system
├── assets/js/               # main (nav+finder), planner, checklist
├── <page>/index.md|html     # 8 pages + about
└── sitemap.xml / robots.txt / favicon.svg
```

## Adding courses

Add an entry to `_data/golf-courses.yml`. It automatically appears on the homepage finder and the `/golf-courses/` directory. Fields:

```yaml
- alias: my-new-course      # = Wingolf course slug (must be live at wingolf.com.vn/san-golf/<alias>)
  name: My New Course
  city: Location, Province
  region: north             # north | central | south
  destination: Hanoi        # groups the finder dropdown
  distance: 45–60 min from X
  holes: 18
  style: Parkland
  designer: Designer Name
  green_fee: From X VND
  wingolf: true
```

Course card thumbnails load automatically from `assets/images/courses/<alias>.webp` — only courses with a file there get a photo.

## Images

Real course photography is downloaded from `wingolf.com.vn` (owned by Wingolf) and self-hosted in `assets/images/courses/` so the site never depends on hotlinking. Re-download/refresh images with `scripts/fetch-images.py` (see script header).

## Content updates

- Destination pages (`/golf-courses-hanoi/`, `/da-nang-golf/`, `/ho-chi-minh-golf/`) are Markdown — edit and push; GitHub Pages rebuilds automatically.
- The trip planner and corporate checklist are static HTML + vanilla JS — no dependencies, no build step beyond Jekyll.

## SEO notes

- Canonical URLs, meta description, OpenGraph and JSON-LD (Organization + Article/WebSite/WebApplication + BreadcrumbList) are generated per page.
- `sitemap.xml` and `robots.txt` are generated automatically.
- All internal links use Jekyll's `relative_url`, so the site works under any `baseurl` without code changes.
- Course cards deep-link to `wingolf.com.vn/san-golf/<alias>` with natural anchor text ("Course details & tee times") — no exact-match spam.

## Roadmap

- **Phase 1 (this repo):** MVP — 8 pages, course finder, two tools, full SEO scaffolding.
- **Phase 2:** Expand the course dataset to 40–50 courses, add filter/search/map.
- **Phase 3:** Add per-course and per-destination detail pages only for queries that show impressions in GSC.