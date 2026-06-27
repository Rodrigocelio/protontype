# AGENTS.md

## Quick start

Repo is a static site (Vue 3 + TailwindCSS + DaisyUI, all CDN). No build, no test, no lint, no typecheck.

```bash
python -m http.server 8000    # serve locally
```

Open `http://localhost:8000` in browser.

## Architecture

- **2 pages**: `index.html` (tutorial grid) and `tutorial.html` (step-by-step view). Each has a self-contained inline Vue 3 app.
- **Data layer**: ES6 modules in `js/services/` and `js/utils/`. `TutorialService` fetches JSON via `fetch()` at runtime.
- **`js/app.js`** exports a `TutorialApp` object but **no page imports it** -- both HTML pages define their own apps inline. Treat `app.js` as unused/shared struct only.
- Tutorial content is pure JSON -- no code changes needed for content updates.

## Adding a tutorial

1. Create `data/<id>/<platform>.json` (e.g. `data/foo/windows.json`)
2. Register in `data/index.json` under `tutoriais` array
3. That's it -- no JS changes needed

`tutorial.html` loads tutorial by `?id=` URL param.

## Conventions

- `CLAUDE.md` references external resources at `/home/zorin/Desktop/projetos/styleguide/claude-visual-style-guide/` (contains `CUSTOM_INSTRUCTIONS.txt` with colors, components, patterns). Consult these for UI work.
- Tutorials in pt-BR. JSON fields are Portuguese.
- Step types: `download`, `configuracao`, `output` (no type = terminal/code block).
- Colors: `blue`, `yellow`, `purple`, `indigo`, `green`, `gray` -- map to step card left border colors (via `getBorderColor()`).
- No TypeScript, no package.json, no bundler. Pure vanilla ES6 modules (`type="module"`).
- Git: 2 commits. No CI, no hooks, no lint config.

## Design System (applied to both pages)

- **CSS custom properties** in `<style>` define design tokens (`--background`, `--foreground`, `--primary`, `--muted`, `--muted-foreground`, `--border`, `--radius`). Light/dark variants via `html.dark` selector. DaisyUI theme variables (`--b1`, `--p`, etc.) are mapped to these tokens.
- **Dark mode** toggled by adding/removing `.dark` on `<html>`. Persisted in `localStorage` key `theme`. Initialized from localStorage or `prefers-color-scheme`. Both pages have an independent toggle.
- **Lucide icons** replace FontAwesome. CDN: `unpkg.com/lucide@latest/dist/umd/lucide.js`. Usage: `<i data-lucide="icon-name"></i>` then `lucide.createIcons()` called in `mounted()` and `updated()` hooks. Icon sizing via `class="h-4 w-4"` (copied to SVG by Lucide).
- **Code blocks** have a fixed dark background (`#0d1117`, GitHub-inspired) independent of page theme.
- **Inline styles** for theming (`style="color: var(--muted-foreground)"`) preferred over DaisyUI theme classes to stay decoupled from DaisyUI internals.
