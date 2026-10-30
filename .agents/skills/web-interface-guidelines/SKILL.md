---
name: web-interface-guidelines
description: Review and enforce Web Interface Guidelines compliance. Covers interaction details, animations without layout thrashing, optical alignment, form UX, keyboard support, and polish.
license: MIT
metadata:
  author: Vercel Labs
  version: "1.1.0"
---

# Web Interface Guidelines (Vercel Standards)

A high-signal engineering and design checklist to ensure web interfaces are rock-solid, fast, and polished down to the sub-pixel.

---

## 1. Interaction & Keyboard
- **Keyboard works everywhere:** All interactive flows are keyboard-operable via `Tab`, `Enter`, and `Space`. Never use `<div onClick>` where a `<button>` or `<a>` belongs.
- **Clear focus:** Every focusable element shows a visible, unobscured focus ring. Prefer `:focus-visible` over `:focus` to avoid distracting mouse users.
- **Never `outline: none`** without an immediate focus replacement (`focus-visible:ring-2 focus-visible:ring-primary`).
- **Match visual & hit targets:** Minimum interactive target is 24×24px on desktop, 44×44px on mobile touch devices.
- **Mobile input zoom prevention:** `<input>` font size must be ≥ 16px (or `text-base`) on mobile to prevent iOS Safari auto-zoom on focus.
- **Never block paste:** Never prevent pasting into `<input>` or `<textarea>`.
- **Ellipsis for further input & loading:** Actions that open modals/dialogs end with an ellipsis (`"Düzenle…"`), and async states end with an ellipsis (`"Kaydediliyor…"`, `"Yükleniyor…"`).

---

## 2. Animation & Motion Performance
- **Compositor-friendly:** Prioritize GPU-accelerated CSS properties (`transform`, `opacity`). Never animate properties that cause reflow/relayout (`width`, `height`, `top`, `left`, `margin`).
- **Never `transition: all`:** Explicitly declare animated properties (e.g., `transition-colors duration-200` or `transition-transform duration-200`) to avoid unintentional layout jank.
- **Honor `prefers-reduced-motion`:** Provide a zero-motion or subtle fade alternative for users with vestibular sensitivities.
- **Correct transform origin:** Anchor scale and rotation animations to where the element physically originates.
- **Interruptible animations:** Interactive animations must be cancelable mid-flight if the user clicks or navigates away.

---

## 3. Layout, Typography & Optical Polish
- **Flex text containers:** Flex children containing text that might truncate need `min-w-0` so CSS truncation works properly without breaking layout.
- **Prevent layout shift (CLS):** Every `<img>` must have explicit `width` and `height` (or aspect-ratio container). Below-the-fold images use `loading="lazy"`. Above-the-fold hero images use `fetchpriority="high"`.
- **Typographic quotes & punctuation:** Prefer curly quotes (“ ” / ‘ ’) over straight quotes. Use non-breaking spaces before units (`10&nbsp;MB`, `⌘&nbsp;K`).
- **Tabular numbers:** Use `font-variant-numeric: tabular-nums` or monospace for statistics, pricing tables, counters, and timers.
- **Widow prevention:** Apply `text-wrap: balance` or `text-wrap: pretty` to headings.

---

## 4. Forms & Feedback
- **Form control labels:** Every input has a corresponding `<label>` (clickable via `htmlFor`).
- **Input types & autocomplete:** Use accurate semantic types (`email`, `tel`, `url`) and valid `autocomplete` attributes.
- **Disabled state logic:** Submit buttons should remain clickable until submission begins; show a subtle spinner inside the button during the request while preserving the label.
- **Empty & edge states:** Always design empty arrays, zero results, and long text inputs gracefully.
