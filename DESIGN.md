# TEMANPORSI visual direction

## Identity

TEMANPORSI is a concept catering service for students choosing lunch between classes. The approved visual world is **Buku Sajian**, an open, two-page editorial spread that makes the meal and ordering choices feel like parts of one readable menu.

## Design read

Reading this as: a campus catering service for students, in a warm cookbook-editorial language, with ENERGY 2 / RHYTHM 3 / MOTION 1.

## Visual system

- **Palette:** warm paper `#F8F5EE`, forest ink `#143322`, and terracotta `#A8432C`. Keep the established food-brand colors; reserve terracotta for the few actions and marks that need emphasis.
- **Typography:** Newsreader for display and editorial headings, Plus Jakarta Sans for body copy and controls. The serif gives the chosen book-spread a food-editorial voice; the sans keeps forms and navigation plain to scan.
- **Composition:** one visible center gutter joins two content pages in the opening spread. Sections below it change structure to suit their content, using menu rows, schedule choices, and quotations instead of repeating cards.
- **Surface:** flat paper tones and thin rules make the book reference legible without decorative shadows, grid textures, or gradients.
- **Corners:** square image frames and restrained control corners echo printed pages without turning every element into a pill.
- **Motion:** hover, pressed, and focus feedback only. No scroll reveals or continuous animation.
- **Photography:** use licensed food photographs as clearly disclosed stand-ins until TEMANPORSI supplies its own. Credit the source in one footer line. Current photo metadata records Unsplash as the origin and notes that the individual source pages were not preserved.

## Content and evidence

- Keep the prototype status visible. The final team has set menu prices, package discounts, delivery fees, schedules, portions, and campus zones, but the site does not accept orders.
- Nutrition is an estimate from TKPI; do not invent per-menu values. Do not claim competitor savings or live availability without evidence.
- The three anonymous quotes are feedback about the concept, not reviews of an operating service.
- Keep checkout as a clearly labeled local simulation. It does not submit an order or accept payment.
- Keep all six Next.js routes connected and usable with keyboard, touch, and pointer input.

## Verification

- The Next.js production build prerenders all six routes. Browser checks cover every route at 320 and 390 CSS pixels, with no horizontal overflow or browser errors.
- Above-the-fold food images have intrinsic dimensions and high fetch priority.
