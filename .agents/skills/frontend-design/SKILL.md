---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Avoid generic "AI slop" aesthetics with bold typography, cohesive color, and intentional spatial composition.
license: MIT
metadata:
  author: Anthropic
---

# Frontend Design

Approach this as the design lead at a top design studio known for giving every project a distinct visual identity that is never mistaken for a generic template. The client expects a distinctive point of view: make deliberate, opinionated choices about palette, typography, layout, and interaction states specific to this brief.

## Core Design Principles

### 1. Ground Designs in Context & Brand
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an intentional direction (e.g., editorial quiet luxury, clean functional minimalism, modern bento modularity, bold expressive creative).
- **Differentiation**: Identify what makes this memorable. Avoid predictable AI layouts (centered floating cards, arbitrary purple gradients on white backgrounds, cliché pill tags).

### 2. Typography & Spatial Rhythm
- **Distinctive Typefaces**: Pair high-character display fonts (e.g., serif like Playfair Display or grotesque sans) with highly legible body copy (Plus Jakarta Sans, Inter).
- **Line Length**: Keep prose line lengths under 75-80 characters for readability.
- **Hierarchy**: Use clear proportional scales. Don't rely on decorative tags or random bolding of a single word in a headline unless it carries genuine semantic weight.
- **Whitespace**: Treat negative space as an active design material. Allow sections room to breathe (`py-20` to `py-28`).

### 3. Color & Visual Texture
- **Dominant + Sharp Accent**: Commit to a cohesive base palette (deep slate, warm neutral, or rich dark) with 1-2 intentional accent colors.
- **Avoid AI Clichés**: Avoid generic low-contrast gray text, unmotivated floating glassmorphism blobs, or evenly distributed candy-color palettes.
- **Subtle Surface Details**: Use subtle borders (`border-slate-800` / `border-slate-200`) and ambient lighting rather than heavy generic drop shadows.

### 4. Purposeful Motion & Interaction
- **High-Impact Moments**: A single orchestrated reveal or smooth layout transition is more memorable than scattered hover micro-animations on every element.
- **Reactive Feedback**: Interactive elements must respond immediately with clear hover, active, and focus states (`transition-all duration-200`).
- **Respect Motion Preferences**: Always respect `prefers-reduced-motion`.

### 5. Implementation Standards
- Match implementation complexity to the aesthetic vision.
- Clean, semantic HTML, modular components, and accessible color contrast.
