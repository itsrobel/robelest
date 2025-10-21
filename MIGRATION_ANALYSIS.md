# Next.js to SvelteKit Migration Analysis

## Executive Summary

This document outlines the migration path from your Next.js 15 + React 19 portfolio website to SvelteKit 2 + Svelte 5 with Tailwind 4. The migration involves architectural, syntax, and tooling changes while preserving the Rose Pine aesthetic and single-page design.

---

## 1. Routing Architecture Differences

### Next.js App Router (Current)
```
app/
├── layout.tsx          # Root layout with metadata
├── page.tsx            # Home page component
└── globals.css         # Global styles
```

**Key Features:**
- File-based routing with special files (`layout.tsx`, `page.tsx`)
- React Server Components by default
- Metadata API for SEO (`export const metadata: Metadata`)
- Nested layouts with automatic composition

### SvelteKit Routing (Target)
```
src/
├── routes/
│   ├── +layout.svelte      # Root layout
│   ├── +page.svelte        # Home page
│   ├── +layout.ts          # Layout load function (optional)
│   └── +page.ts            # Page load function (optional)
├── app.html                # HTML shell template
└── app.css                 # Global styles
```

**Key Features:**
- File-based routing with `+` prefix convention
- `+layout.svelte` = React's `layout.tsx`
- `+page.svelte` = React's `page.tsx`
- `+page.ts`/`+page.server.ts` for data loading
- Static site generation (SSG) via `adapter-static`

### Migration Strategy

For your single-page portfolio:
1. Move `app/page.tsx` content to `src/routes/+page.svelte`
2. Move `app/layout.tsx` metadata to `src/routes/+page.ts` or `src/app.html`
3. Keep `app/globals.css` → migrate to `src/app.css` with Tailwind 4 syntax

---

## 2. Component Syntax Migration (React to Svelte 5)

### React Component (Current)
```tsx
// app/page.tsx
import { Crown, Github, Linkedin, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="h-screen bg-[#faf4ed] text-[#575279]">
      <nav className="px-4 sm:px-6 lg:px-12 py-4">
        <div className="flex items-center gap-2">
          <Crown className="w-4 h-4 text-[#ea9d34]" />
          <span className="text-xs font-medium">RE</span>
        </div>
      </nav>
      {/* ... more JSX ... */}
    </div>
  )
}
```

### Svelte 5 Component (Target)
```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { Crown, Github, Linkedin, MapPin } from 'lucide-svelte';

  // Svelte 5 runes for reactive state (if needed)
  let currentYear = $state(new Date().getFullYear());
</script>

<div class="h-screen bg-[#faf4ed] text-[#575279]">
  <nav class="px-4 sm:px-6 lg:px-12 py-4">
    <div class="flex items-center gap-2">
      <Crown class="w-4 h-4 text-[#ea9d34]" />
      <span class="text-xs font-medium">RE</span>
    </div>
  </nav>
  <!-- ... more markup ... -->
</div>
```

### Key Syntax Differences

| Feature | React (JSX) | Svelte 5 |
|---------|------------|----------|
| **Attributes** | `className="..."` | `class="..."` |
| **Conditionals** | `{condition && <div>...</div>}` | `{#if condition}<div>...</div>{/if}` |
| **Loops** | `{items.map(item => <div key={item.id}>)}` | `{#each items as item (item.id)}<div>{/each}` |
| **Events** | `onClick={handler}` | `onclick={handler}` |
| **Reactive State** | `const [count, setCount] = useState(0)` | `let count = $state(0)` |
| **Derived Values** | `useMemo(() => count * 2, [count])` | `let doubled = $derived(count * 2)` |
| **Side Effects** | `useEffect(() => {...}, [deps])` | `$effect(() => {...})` |
| **Props** | `function Comp({ name }: Props)` | `let { name } = $props<Props>()` |

### Your Specific Migrations

**1. Dynamic Year Display**
```tsx
// React (current)
© {new Date().getFullYear()} Robel Estifanos
```
```svelte
<!-- Svelte (target) -->
<script>
  let currentYear = $state(new Date().getFullYear());
</script>
© {currentYear} Robel Estifanos
```

**2. No State Management Needed**
Your current app has NO React hooks (no `useState`, `useEffect`, etc.). This makes migration simpler - just template syntax changes.

---

## 3. Image Handling Migration

### Next.js Image Component (Current)
```tsx
import Image from "next/image"

<Image
  src="/images/lion-of-judah.png"
  alt="Lion of Judah"
  width={280}
  height={280}
  className="object-contain"
/>
```

**Features:**
- Automatic image optimization
- Lazy loading by default
- Responsive image generation
- Blur placeholder support

### Svelte Alternatives (Target)

#### Option 1: Standard `<img>` Tag (Simplest)
```svelte
<img
  src="/images/lion-of-judah.png"
  alt="Lion of Judah"
  width="280"
  height="280"
  class="object-contain"
  loading="lazy"
/>
```

**Pros:** Zero dependencies, works immediately
**Cons:** No automatic optimization

#### Option 2: `@sveltejs/enhanced-img` (Recommended)
```bash
npm install -D @sveltejs/enhanced-img
```

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { enhancedImages } from '@sveltejs/enhanced-img';

const config = {
  preprocess: [vitePreprocess(), enhancedImages()],
  kit: { adapter: adapter() }
};
```

```svelte
<script>
  import lionImage from '$lib/images/lion-of-judah.png?enhanced';
</script>

<enhanced:img src={lionImage} alt="Lion of Judah" />
```

**Pros:** Automatic optimization, modern formats (WebP, AVIF)
**Cons:** Requires build-time processing

#### Option 3: `svelte-image` (Third-party)
```bash
npm install svelte-image
```

**Recommendation for Your Use Case:**
Use **Option 1** (standard `<img>`) since:
- Only 1 image in your app (lion-of-judah.png)
- Image is already optimized/small
- Simplicity > complexity for this use case
- Add `loading="lazy"` for performance

---

## 4. SEO & Metadata Migration

### Next.js Metadata API (Current)
```tsx
// app/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Robel Estifanos - Founding Engineer",
  description: "Building software that amplifies human compassion...",
  keywords: "Robel Estifanos, founding engineer, social impact...",
  openGraph: {
    title: "Robel Estifanos - Founding Engineer",
    description: "Building software that amplifies human compassion",
    url: "https://robelestifanos.com",
    siteName: "Robel Estifanos",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robel Estifanos - Founding Engineer",
    description: "Building software that amplifies human compassion",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
}
```

### SvelteKit Approach (Target)

#### Option 1: `<svelte:head>` in Page Component
```svelte
<!-- src/routes/+page.svelte -->
<svelte:head>
  <title>Robel Estifanos - Founding Engineer</title>
  <meta name="description" content="Building software that amplifies human compassion. Founding engineer focused on social impact technology." />
  <meta name="keywords" content="Robel Estifanos, founding engineer, social impact, technology, Ethiopian heritage, Trestle, human services" />

  <!-- Open Graph -->
  <meta property="og:title" content="Robel Estifanos - Founding Engineer" />
  <meta property="og:description" content="Building software that amplifies human compassion" />
  <meta property="og:url" content="https://robelestifanos.com" />
  <meta property="og:site_name" content="Robel Estifanos" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="website" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Robel Estifanos - Founding Engineer" />
  <meta name="twitter:description" content="Building software that amplifies human compassion" />

  <!-- Robots -->
  <meta name="robots" content="index, follow" />
</svelte:head>
```

#### Option 2: `src/app.html` (Global Metadata)
```html
<!-- src/app.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Robel Estifanos - Founding Engineer</title>
    <meta name="description" content="Building software that amplifies human compassion. Founding engineer focused on social impact technology." />

    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon.ico" sizes="any" />

    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

#### Option 3: `+page.ts` with `load` Function (Programmatic)
```ts
// src/routes/+page.ts
export const load = () => {
  return {
    meta: {
      title: 'Robel Estifanos - Founding Engineer',
      description: 'Building software that amplifies human compassion',
    }
  };
};
```

```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta name="description" content={data.meta.description} />
</svelte:head>
```

**Recommendation:**
Combine **Option 1 + Option 2**:
- Put static metadata in `app.html` (favicons, viewport)
- Put SEO tags in `+page.svelte` with `<svelte:head>` for page-specific control

---

## 5. Icon Library Migration

### Lucide React (Current)
```tsx
import { Crown, Github, Linkedin, MapPin } from "lucide-react"

<Crown className="w-4 h-4 text-[#ea9d34]" />
```

### Lucide Svelte (Target)
```bash
npm install lucide-svelte
```

```svelte
<script lang="ts">
  import { Crown, Github, Linkedin, MapPin } from 'lucide-svelte';
</script>

<Crown class="w-4 h-4 text-[#ea9d34]" />
```

**Changes Required:**
1. Install: `npm install lucide-svelte`
2. Import path: `lucide-react` → `lucide-svelte`
3. Prop name: `className` → `class`

**Icons Used in Your App:**
- `Crown` (3 instances)
- `MapPin` (1 instance)
- `Github` (imported but unused)
- `Linkedin` (imported but unused)

All icons are available in `lucide-svelte` with identical names.

---

## 6. Tailwind CSS 3 to Tailwind 4 Migration

### Tailwind 3 Config (Current)
```ts
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "rose-pine": {
          base: "#faf4ed",
          text: "#575279",
          muted: "#9893a5",
          rose: "#d7827e",
          gold: "#ea9d34",
          surface: "#f2e9e1",
        },
      },
    },
  },
  plugins: [],
}
```

### Tailwind 4 Approach (Target)

Tailwind 4 uses **CSS-first configuration** instead of JavaScript config files.

#### Remove `tailwind.config.ts` (No Longer Needed)

#### Update `src/app.css`
```css
/* src/app.css */
@import 'tailwindcss';

/* Tailwind 4 uses @theme for configuration */
@theme {
  /* Rose Pine Custom Colors */
  --color-rose-pine-base: #faf4ed;
  --color-rose-pine-text: #575279;
  --color-rose-pine-muted: #9893a5;
  --color-rose-pine-rose: #d7827e;
  --color-rose-pine-gold: #ea9d34;
  --color-rose-pine-surface: #f2e9e1;

  /* Font Families */
  --font-family-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
  --font-family-serif: Georgia, "Times New Roman", serif;
  --font-family-mono: Monaco, Consolas, "Courier New", monospace;
}

/* Custom CSS Variables (Same as before) */
:root {
  --rose-pine-base: #faf4ed;
  --rose-pine-text: #575279;
  --rose-pine-muted: #9893a5;
  --rose-pine-rose: #d7827e;
  --rose-pine-gold: #ea9d34;
  --rose-pine-surface: #f2e9e1;
}

/* Global Styles (Same as before) */
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family-sans);
  font-weight: 400;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ... rest of your custom CSS ... */
```

#### Update `vite.config.ts` (Already Done)
```ts
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()]
});
```

### Class Name Changes

**No changes needed!** Your current classes are compatible:
- `bg-[#faf4ed]` → Works in Tailwind 4
- `text-[#575279]` → Works in Tailwind 4
- `w-4 h-4` → Works in Tailwind 4
- Responsive prefixes (`sm:`, `lg:`) → Works in Tailwind 4

---

## 7. File Structure Comparison

### Current Next.js Structure
```
robel/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Home page component
│   └── globals.css         # Global styles + Tailwind imports
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   └── images/
│       └── lion-of-judah.png
├── tailwind.config.ts      # Tailwind 3 config
├── next.config.mjs         # Next.js config
├── tsconfig.json           # TypeScript config
└── package.json
```

### Target SvelteKit Structure
```
robel/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte      # Root layout
│   │   ├── +page.svelte        # Home page
│   │   └── +page.ts            # Page metadata (optional)
│   ├── lib/
│   │   └── assets/             # Images imported in code
│   │       └── favicon.svg
│   ├── app.html                # HTML shell
│   └── app.css                 # Global styles + Tailwind 4
├── static/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/
│       └── lion-of-judah.png
├── svelte.config.js            # SvelteKit config
├── vite.config.ts              # Vite config (Tailwind 4 plugin)
├── tsconfig.json               # TypeScript config
└── package.json
```

**Key Directory Changes:**
- `app/` → `src/routes/`
- `public/` → `static/`
- No `tailwind.config.ts` (CSS-first in Tailwind 4)
- No `next.config.mjs` (replaced by `svelte.config.js`)

---

## 8. State Management Differences

### React Hooks (Current - NONE USED!)

Your current app has **ZERO state management**:
- No `useState`
- No `useEffect`
- No `useContext`
- No custom hooks

The only dynamic value is `new Date().getFullYear()`, which is computed at render time.

### Svelte 5 Runes (Target)

If you need state in the future, here's the Svelte 5 approach:

```svelte
<script lang="ts">
  // Reactive state
  let count = $state(0);

  // Derived values
  let doubled = $derived(count * 2);

  // Side effects
  $effect(() => {
    console.log('Count changed:', count);
  });

  // Props (for components)
  let { name, age = 0 } = $props<{ name: string; age?: number }>();
</script>

<button onclick={() => count++}>
  Count: {count}, Doubled: {doubled}
</button>
```

**For Your App:**
You only need `$state` for the year if you want client-side reactivity:

```svelte
<script lang="ts">
  let currentYear = $state(new Date().getFullYear());
</script>

<footer>
  © {currentYear} Robel Estifanos
</footer>
```

But since the year doesn't change during a session, you can use:
```svelte
<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>
```

---

## 9. Migration Checklist

### Phase 1: Setup
- [x] SvelteKit project initialized (`package.json` shows SvelteKit 2.43.2)
- [x] Tailwind 4 configured (`vite.config.ts` has `@tailwindcss/vite`)
- [ ] Install `lucide-svelte`: `npm install lucide-svelte`
- [ ] Move assets from `public/` to `static/`

### Phase 2: Layout Migration
- [ ] Migrate `app/layout.tsx` to `src/routes/+layout.svelte`
  - [ ] Move global styles import
  - [ ] Remove React-specific imports
  - [ ] Add favicon link
- [ ] Migrate SEO metadata to `src/app.html` and `<svelte:head>`

### Phase 3: Page Migration
- [ ] Migrate `app/page.tsx` to `src/routes/+page.svelte`
  - [ ] Convert JSX to Svelte template syntax
  - [ ] Change `className` to `class`
  - [ ] Update icon imports (`lucide-react` → `lucide-svelte`)
  - [ ] Convert `<Image>` to `<img>` with `loading="lazy"`
  - [ ] Update year display logic

### Phase 4: Styles Migration
- [ ] Migrate `app/globals.css` to `src/app.css`
  - [ ] Update to Tailwind 4 syntax (`@import 'tailwindcss'`)
  - [ ] Add `@theme` block for custom colors
  - [ ] Keep custom CSS (scrollbar, selection, focus styles)

### Phase 5: Testing
- [ ] Build: `npm run build`
- [ ] Preview: `npm run preview`
- [ ] Verify all colors match Rose Pine theme
- [ ] Test responsive design (sm, lg breakpoints)
- [ ] Verify SEO metadata with browser DevTools
- [ ] Check favicon loading

### Phase 6: Cleanup
- [ ] Delete `app/` directory
- [ ] Delete `public/` directory (after moving to `static/`)
- [ ] Delete `tailwind.config.ts`
- [ ] Delete `next.config.mjs`
- [ ] Remove Next.js dependencies from `package.json`

---

## 10. Code-by-Code Migration Examples

### Example 1: Navigation Component

**React (Current)**
```tsx
<nav className="px-4 sm:px-6 lg:px-12 py-4 sm:py-8 flex justify-between items-center">
  <div className="flex items-center gap-2">
    <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-[#ea9d34]" />
    <span className="text-xs sm:text-sm font-medium">RE</span>
  </div>
  <div className="text-xs sm:text-sm text-[#9893a5] font-mono">2025</div>
</nav>
```

**Svelte (Target)**
```svelte
<script lang="ts">
  import { Crown } from 'lucide-svelte';
  const currentYear = new Date().getFullYear();
</script>

<nav class="px-4 sm:px-6 lg:px-12 py-4 sm:py-8 flex justify-between items-center">
  <div class="flex items-center gap-2">
    <Crown class="w-4 h-4 sm:w-5 sm:h-5 text-[#ea9d34]" />
    <span class="text-xs sm:text-sm font-medium">RE</span>
  </div>
  <div class="text-xs sm:text-sm text-[#9893a5] font-mono">{currentYear}</div>
</nav>
```

### Example 2: Lion Watermark Image

**React (Current)**
```tsx
import Image from "next/image"

<div className="absolute bottom-8 right-8 opacity-[0.04] pointer-events-none">
  <Image
    src="/images/lion-of-judah.png"
    alt="Lion of Judah"
    width={280}
    height={280}
    className="object-contain"
  />
</div>
```

**Svelte (Target)**
```svelte
<div class="absolute bottom-8 right-8 opacity-[0.04] pointer-events-none">
  <img
    src="/images/lion-of-judah.png"
    alt="Lion of Judah"
    width="280"
    height="280"
    class="object-contain"
    loading="lazy"
  />
</div>
```

### Example 3: Footer with Dynamic Year

**React (Current)**
```tsx
<footer className="px-4 sm:px-6 lg:px-12 py-3 lg:py-6">
  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 lg:gap-4">
    <p className="text-[#9893a5] text-xs">
      © {new Date().getFullYear()} Robel Estifanos. Building bridges through technology.
    </p>
    <div className="flex items-center gap-2 text-[#9893a5] text-xs">
      <Crown className="w-3 h-3 text-[#ea9d34]" />
      <span>Heritage • Innovation • Impact</span>
    </div>
  </div>
</footer>
```

**Svelte (Target)**
```svelte
<script lang="ts">
  import { Crown } from 'lucide-svelte';
  const currentYear = new Date().getFullYear();
</script>

<footer class="px-4 sm:px-6 lg:px-12 py-3 lg:py-6">
  <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 lg:gap-4">
    <p class="text-[#9893a5] text-xs">
      © {currentYear} Robel Estifanos. Building bridges through technology.
    </p>
    <div class="flex items-center gap-2 text-[#9893a5] text-xs">
      <Crown class="w-3 h-3 text-[#ea9d34]" />
      <span>Heritage • Innovation • Impact</span>
    </div>
  </div>
</footer>
```

---

## 11. Performance Considerations

### Build Output Comparison

**Next.js (Current)**
- Client-side hydration with React
- Large React runtime (~140KB gzipped)
- Image optimization at build time

**SvelteKit (Target)**
- Minimal client-side JavaScript (Svelte compiles to vanilla JS)
- No runtime framework (~3KB for Svelte runtime vs 140KB React)
- Faster page loads (no hydration overhead)
- Smaller bundle size (Svelte's compiler removes unused code)

### Expected Performance Gains
- **Bundle Size:** ~95% reduction (from ~140KB to ~5-10KB)
- **First Contentful Paint (FCP):** Improved by ~200-500ms
- **Time to Interactive (TTI):** Improved by ~500-1000ms
- **Lighthouse Score:** Likely 100/100 (currently optimized for Next.js)

---

## 12. Deployment Considerations

### Next.js (Current)
Your `next.config.mjs` shows:
```js
images: { unoptimized: true }
```
This suggests static export. Likely using:
```bash
npm run build && npm run start
```

### SvelteKit (Target)

For static site generation (matching your current setup):

**Install Static Adapter**
```bash
npm install -D @sveltejs/adapter-static
```

**Update `svelte.config.js`**
```js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    })
  }
};

export default config;
```

**Build Commands**
```bash
npm run build      # Builds to ./build directory
npm run preview    # Preview production build locally
```

**Deployment Targets** (same as Next.js static export)
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- GitHub Pages

---

## 13. Key Gotchas & Common Mistakes

### 1. Class vs ClassName
```svelte
<!-- WRONG -->
<div className="...">

<!-- CORRECT -->
<div class="...">
```

### 2. Event Handlers
```svelte
<!-- React style (WRONG) -->
<button onClick={handler}>

<!-- Svelte style (CORRECT) -->
<button onclick={handler}>
```

### 3. Conditional Rendering
```svelte
<!-- React style (WRONG) -->
{condition && <div>Content</div>}

<!-- Svelte style (CORRECT) -->
{#if condition}
  <div>Content</div>
{/if}
```

### 4. Static Asset Paths
```
Next.js: /images/lion.png (in public/)
SvelteKit: /images/lion.png (in static/)
```
Path in code stays the same, just move the file location.

### 5. Import Paths
```ts
// Next.js (WRONG in Svelte)
import { Crown } from "lucide-react"

// SvelteKit (CORRECT)
import { Crown } from 'lucide-svelte'
```

---

## 14. Migration Timeline Estimate

**Total Time: 2-3 hours**

| Phase | Time | Tasks |
|-------|------|-------|
| **Setup** | 15 min | Install lucide-svelte, move static files |
| **Layout Migration** | 20 min | Convert layout.tsx to +layout.svelte |
| **Page Migration** | 60 min | Convert page.tsx to +page.svelte (largest task) |
| **Styles Migration** | 30 min | Update globals.css to Tailwind 4 app.css |
| **Metadata/SEO** | 20 min | Migrate metadata to svelte:head |
| **Testing** | 30 min | Build, preview, test responsive design |
| **Cleanup** | 15 min | Remove Next.js files, update gitignore |

---

## 15. Recommended Migration Order

1. **Install Dependencies**
   ```bash
   npm install lucide-svelte
   ```

2. **Move Static Assets**
   ```bash
   cp -r public/* static/
   ```

3. **Create Layout** (`src/routes/+layout.svelte`)
   - Import `app.css`
   - Add favicon with `<svelte:head>`
   - Add `{@render children?.()}` slot

4. **Migrate SEO** (`src/app.html` + `src/routes/+page.svelte`)
   - Base HTML in `app.html`
   - Page-specific metadata in `<svelte:head>`

5. **Convert Page Component** (`src/routes/+page.svelte`)
   - Copy HTML structure from `page.tsx`
   - Change `className` → `class`
   - Update icon imports
   - Change `<Image>` → `<img>`
   - Add `<script>` block for year variable

6. **Migrate Styles** (`src/app.css`)
   - Copy custom CSS from `globals.css`
   - Add `@import 'tailwindcss'`
   - Add `@theme` block for colors
   - Remove Tailwind 3 directives

7. **Test & Verify**
   ```bash
   npm run build
   npm run preview
   ```

8. **Clean Up**
   - Delete `app/`, `public/`, `tailwind.config.ts`, `next.config.mjs`
   - Update `.gitignore` if needed

---

## 16. Side-by-Side File Comparison

### Layout Files

**Next.js: `app/layout.tsx`**
```tsx
import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Robel Estifanos - Founding Engineer",
  // ... metadata ...
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

**SvelteKit: `src/routes/+layout.svelte`**
```svelte
<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="icon" href="/favicon.ico" sizes="any" />
</svelte:head>

{@render children?.()}
```

**SvelteKit: `src/app.html`**
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

---

## 17. Testing Checklist

After migration, verify:

- [ ] **Visual Appearance**
  - [ ] Rose Pine colors match exactly
  - [ ] Typography (Georgia serif for headings, system sans for body)
  - [ ] Geometric background elements visible
  - [ ] Lion watermark in bottom-right at correct opacity

- [ ] **Responsive Design**
  - [ ] Mobile (< 640px): Single column, smaller text
  - [ ] Tablet (640px - 1024px): Adjusted spacing
  - [ ] Desktop (> 1024px): Two-column grid layout

- [ ] **Icons**
  - [ ] Crown icon in header (gold color)
  - [ ] Crown icons in content sections
  - [ ] MapPin icon for location

- [ ] **SEO Metadata**
  - [ ] Page title in browser tab
  - [ ] Meta description (view-source or DevTools)
  - [ ] Open Graph tags for social sharing
  - [ ] Favicon loading correctly

- [ ] **Performance**
  - [ ] Lighthouse score > 90 for all metrics
  - [ ] Bundle size < 50KB (check Network tab)
  - [ ] Images load with lazy loading

- [ ] **Functionality**
  - [ ] Dynamic year displays correctly in footer
  - [ ] No console errors in browser DevTools
  - [ ] Smooth scrolling works
  - [ ] Custom scrollbar styling applied

---

## Summary

This migration is **straightforward** because:
1. No complex state management (zero React hooks)
2. Single page (no routing logic)
3. Minimal JavaScript (mostly static content)
4. No external API calls or data fetching
5. Simple component structure (no component tree)

**Biggest Changes:**
- `className` → `class` (bulk find-replace)
- JSX syntax → Svelte template syntax
- `lucide-react` → `lucide-svelte`
- `<Image>` → `<img>`
- Tailwind config removal (CSS-first in v4)

**Expected Benefits:**
- 95% smaller bundle size
- Faster page loads
- Cleaner, more readable code
- Better developer experience (less boilerplate)

---

## File Paths Reference

All paths are absolute from project root: `/Users/estifanos/Documents/dev/robel/`

**Current Next.js Files:**
- `/Users/estifanos/Documents/dev/robel/app/layout.tsx`
- `/Users/estifanos/Documents/dev/robel/app/page.tsx`
- `/Users/estifanos/Documents/dev/robel/app/globals.css`
- `/Users/estifanos/Documents/dev/robel/tailwind.config.ts`
- `/Users/estifanos/Documents/dev/robel/next.config.mjs`
- `/Users/estifanos/Documents/dev/robel/public/images/lion-of-judah.png`

**Target SvelteKit Files:**
- `/Users/estifanos/Documents/dev/robel/src/routes/+layout.svelte`
- `/Users/estifanos/Documents/dev/robel/src/routes/+page.svelte`
- `/Users/estifanos/Documents/dev/robel/src/app.html`
- `/Users/estifanos/Documents/dev/robel/src/app.css`
- `/Users/estifanos/Documents/dev/robel/svelte.config.js`
- `/Users/estifanos/Documents/dev/robel/vite.config.ts`
- `/Users/estifanos/Documents/dev/robel/static/images/lion-of-judah.png`
