# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Robel Estifanos built with Next.js 15, React 19, TypeScript, and Tailwind CSS. The site features a single-page landing design with a "Rose Pine" aesthetic theme (Ethiopian heritage-inspired color palette).

## Development Commands

### Core Commands
- `npm run dev` - Start Next.js development server (port 3000). **Do not run this - it's handled manually by another process.**
- `npm run build` - Build production bundle for deployment
- `npm run start` - Run production server after build
- `npm run lint` - Run ESLint to check code quality

## Architecture

### Project Structure
- `app/` - Next.js 15 App Router directory
  - `layout.tsx` - Root layout with SEO metadata and HTML structure
  - `page.tsx` - Main landing page component
  - `globals.css` - Global styles, Tailwind imports, and Rose Pine CSS variables
- `lib/` - Utility functions
  - `utils.ts` - Contains `cn()` utility for merging Tailwind classes (clsx + tailwind-merge)
- `hooks/` - React custom hooks
  - `use-mobile.tsx` - Hook for responsive mobile detection
  - `use-toast.ts` - Toast notification system hook
- `public/` - Static assets
  - `images/` - Image assets including Lion of Judah watermark
  - Favicon files (SVG and ICO)
- `styles/` - Contains `globals.css` (also accessible via `app/globals.css`)

### Design System

**Rose Pine Theme Colors** (defined in both `tailwind.config.ts` and `globals.css`):
- Base: `#faf4ed` - Background color
- Text: `#575279` - Primary text
- Muted: `#9893a5` - Secondary/muted text
- Rose: `#d7827e` - Accent color
- Gold: `#ea9d34` - Ethiopian crown/heritage accent
- Surface: `#f2e9e1` - Surface variations

These colors reflect Ethiopian heritage and professional minimalism.

### Key Technical Details

1. **Next.js Configuration** (`next.config.mjs`):
   - ESLint and TypeScript errors are ignored during builds
   - Images are unoptimized (set to `true`)

2. **TypeScript Configuration**:
   - Path alias: `@/*` maps to root directory
   - Strict mode enabled
   - Target: ES6

3. **Styling Approach**:
   - Utility-first with Tailwind CSS v3
   - Custom Rose Pine color palette
   - CSS variables for theming consistency
   - Global smooth transitions (0.2s ease)
   - Custom scrollbar styling

4. **Component Pattern**:
   - Single-page design with sections (navigation, main, footer)
   - Responsive grid layout using Tailwind breakpoints
   - Geometric decorative elements (lines, floating shapes)
   - Watermark background image (Lion of Judah)

5. **SEO & Metadata**:
   - Comprehensive Open Graph tags
   - Twitter card metadata
   - Structured metadata in `app/layout.tsx`
   - All metadata emphasizes "Building software that amplifies human compassion"

## Development Guidelines

- When adding new components, maintain the Rose Pine color scheme
- Use the `cn()` utility from `lib/utils.ts` for conditional class names
- Keep the single-page design philosophy - avoid adding routes unless necessary
- Images should be placed in `public/images/`
- Use the existing Lucide React icons for consistency
- Maintain the minimal, geometric aesthetic with Ethiopian heritage influences
