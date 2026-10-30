---
name: wcag-accessibility
description: Audit and improve web accessibility following WCAG 2.2 guidelines. Use when asked to audit UI code, verify accessibility, test keyboard navigation, check contrast ratios, or implement accessible forms and ARIA patterns.
license: MIT
metadata:
  author: Addy Osmani (web-quality-skills)
  version: "2.2"
---

# Web Accessibility (WCAG 2.2 Standards)

Comprehensive guidelines and verification checklist for building web interfaces that are fully accessible, operable, and understandable by all users, including those using assistive technologies.

---

## 1. Perceivable (POUR Principle 1)

### Text Alternatives & Alt Text (1.1)
- Informative images must have concise, descriptive `alt` text.
- Decorative images must use `alt=""` and `role="presentation"`.
- Icon-only buttons must provide an accessible name via `aria-label` or `.sr-only` span:
  ```html
  <button aria-label="Menüyü Kapat">
    <svg aria-hidden="true">...</svg>
  </button>
  ```

### Color Contrast (1.4.3 & 1.4.11)
- **Normal Text (< 18px or < 14px bold):** Minimum contrast ratio of **4.5:1** against its background.
- **Large Text (≥ 18px or ≥ 14px bold):** Minimum contrast ratio of **3.0:1**.
- **UI Components & Graphical Objects:** Minimum contrast ratio of **3.0:1** for borders, icons, and active controls.
- **Never rely on color alone:** Pair error/success colors with icons or explanatory text.

---

## 2. Operable (POUR Principle 2)

### Keyboard Navigation & Focus Management (2.1 & 2.4.7)
- **All functionality operable via keyboard:** Interactive elements must be reachable via `Tab` and activatable via `Enter` / `Space`.
- **Visible Focus Indicator:** Never use `outline: none` without providing an immediate high-contrast `:focus-visible` ring:
  ```css
  :focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  ```
- **No Keyboard Traps:** Modals and drawers must trap focus while open and restore focus to the trigger element upon closing (`Escape` key support).

### Touch Target Size (2.5.8 - WCAG 2.2)
- Interactive targets must be at least **24×24px** (minimum AA), with **44×44px** recommended for mobile comfort.

---

## 3. Understandable (POUR Principle 3)

### Semantics & Document Structure
- Declare page language on `<html>`: `<html lang="tr">`.
- Maintain a logical heading hierarchy (`h1` -> `h2` -> `h3`) without skipping levels for visual styling.
- Form inputs must have programmatically associated `<label for="...">` tags.
- Display form validation errors with `aria-invalid="true"` and `aria-describedby="error-id"`.

---

## 4. Robust (POUR Principle 4)

### ARIA Best Practices
- Prefer native HTML elements (`<button>`, `<a href>`, `<dialog>`, `<nav>`, `<main>`) over generic `<div>` with ARIA roles.
- Use `aria-expanded="true/false"` for accordions and dropdown menus.
- Use `aria-live="polite"` for dynamic content or toast notifications.

---

## Accessibility Audit Checklist
1. [ ] Can the entire page be navigated using only the keyboard (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Esc`)?
2. [ ] Is the focus indicator clearly visible on every focused element?
3. [ ] Do all text elements meet the 4.5:1 contrast requirement in both Dark and Light modes?
4. [ ] Are all icon buttons properly labeled with `aria-label`?
5. [ ] Does the page respect `prefers-reduced-motion: reduce`?
