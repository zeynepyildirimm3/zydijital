# Design System: Refined (TypeUI)

Source: TypeUI Design System (Refined)
Adapted for: Modern All-in-One Showcase (Portfolio, Services, Blog, Landing)

---

## 1. Brand & Aesthetic Direction
- **Style:** Refined (Modern, Minimal, Editorial Elegance)
- **Concept:** Quiet luxury, curated aesthetic, deliberate whitespace, and high typographic contrast.
- **Tone:** Prestijli, güven veren, net ve sofistike.

---

## 2. Design Tokens

### Colors
- **Primary (Accent):** `#3B82F6` (Electric Blue / Sapphire)
- **Secondary:** `#8B5CF6` (Soft Violet)
- **Surface / Background:**
  - Dark Mode: `#0F172A` (Slate 900) / Surface: `#1E293B` (Slate 800)
  - Light Mode: `#FFFFFF` / Surface: `#F8FAFC` (Slate 50)
- **Text:**
  - Dark Mode: Primary `#F8FAFC` (Slate 50), Muted `#94A3B8` (Slate 400)
  - Light Mode: Primary `#0F172A` (Slate 900), Muted `#64748B` (Slate 500)
- **Semantic:**
  - Success: `#16A34A`
  - Warning: `#D97706`
  - Danger: `#DC2626`
  - Neutral / Border: `#334155` (Dark) / `#E2E8F0` (Light)

### Typography
- **Headings (Display / H1 - H3):** `"Playfair Display", Georgia, serif`
  - Editorial, confident, high aesthetic authority.
- **Body & UI Controls (P-tag, Buttons, Nav):** `"Plus Jakarta Sans", system-ui, sans-serif`
  - *Not:* TypeUI varsayılanında body için de Playfair önerilmektedir; ancak küçük fontlarda ve uzun metinlerde okunabilirliği korumak için gövde sans-serif olarak optimize edilmiştir.
- **Tags, Badges & Code:** `"JetBrains Mono", monospace`

### Spacing & Layout
- **Scale:** 4px / 8px / 12px / 16px / 24px / 32px / 48px / 64px
- **Border Radius:**
  - Small elements (Badges, tags): `rounded-full` veya `rounded-md` (6px)
  - Cards & Containers: `rounded-xl` (12px) - `rounded-2xl` (16px)
- **Whitespace:** Generous padding on sections (`py-20` - `py-28`), giving content room to breathe.

---

## 3. UI Guidelines & Rules

### Do:
- Use strong typographic contrast (e.g., large serif H1 paired with clean, crisp sans-serif lead paragraph).
- Use subtle borders (`border border-slate-800` / `border-slate-200`) instead of heavy shadows.
- Keep interactive states explicit and micro-animated (subtle hover scale, smooth color transitions: `transition-all duration-300`).
- Strict WCAG 2.2 AA color contrast and visible focus rings (`focus-visible:ring-2 focus-visible:ring-primary`).

### Don't:
- Do not clutter screens with competing bright accent colors.
- Avoid generic template gradients or noisy backgrounds; prefer subtle radial ambient glows.
- Do not use serif fonts on small buttons, inputs, or metadata badges.
