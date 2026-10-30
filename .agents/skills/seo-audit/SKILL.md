---
name: seo-audit
description: Review, verify and implement technical and on-page SEO best practices. Covers meta tags, Open Graph, Twitter Cards, JSON-LD Schema structured data, canonical URLs, and heading hierarchy.
license: MIT
metadata:
  author: Technical SEO Standards
  version: "1.0.0"
---

# Technical & On-Page SEO Guidelines

A comprehensive guideline and checklist for ensuring web pages achieve maximum search visibility, social share attractiveness, and crawlability.

---

## 1. Document Head & Metadata

### Title & Meta Description
- **Title Tag:**
  - Length: 50–60 characters (max 600px display width).
  - Structure: `[Sayfa Başlığı / Birincil Değer Önerisi] | [Marka Adı]`
  - Unique per page; front-load important keywords.
- **Meta Description:**
  - Length: 140–160 characters.
  - Action-oriented copy (clear value proposition + Call to Action).
  - Must not duplicate across different routes.

### Viewport & Canonical
- Viewport tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`
- Canonical link: `<link rel="canonical" href="https://example.com/current-path" />` (prevents duplicate content penalties).
- Language attribute: `<html lang="tr">` to ensure correct localization signals.

---

## 2. Social Sharing (Open Graph & Twitter Cards)

Every public page must contain complete Open Graph and Twitter Card tags:
```html
<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://example.com/" />
<meta property="og:title" content="Özgün Başlık" />
<meta property="og:description" content="Kısa ve etkileyici açıklama metni." />
<meta property="og:image" content="https://example.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="tr_TR" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Özgün Başlık" />
<meta name="twitter:description" content="Kısa ve etkileyici açıklama metni." />
<meta name="twitter:image" content="https://example.com/og-image.jpg" />
```

---

## 3. Structured Data (JSON-LD)

Implement JSON-LD script blocks in the `<head>` to qualify for Google Rich Snippets:
- **Person / Organization Schema:**
  ```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ad Soyad",
    "url": "https://example.com",
    "jobTitle": "Full Stack Developer & Designer",
    "sameAs": [
      "https://github.com/kullanici",
      "https://linkedin.com/in/kullanici"
    ]
  }
  </script>
  ```
- **WebSite Schema:** Includes name, url, and potentialAction (search).

---

## 4. Semantic Hierarchy & Image Optimization
- **Single `<h1>`:** Exactly one `<h1>` per page representing the core subject.
- **Strict Heading Progression:** Never skip levels (e.g. `h2` directly to `h4`).
- **Descriptive Image Alt Text:** All informational images have meaningful, contextual alt text; no keyword stuffing.
- **Sitemap & Robots:** Provide clean `sitemap.xml` and `robots.txt` files for search crawler discovery.
