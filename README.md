# Ontology Playground

> Note: This project was developed with AI-assisted coding.

A free, open-source, fully static web application for learning about, exploring, designing, and sharing ontologies. It renders any ontology as an interactive graph, ships a curated catalogue of domain ontologies, includes a visual designer, a guided learning hub, a gamified quest system, and a natural-language query playground — all running client-side with no required backend.

**[Live demo &#x2192;](https://microsoft.github.io/Ontology-Playground)**

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Features

### Interactive Graph Exploration

Cytoscape.js-powered force-directed graph that renders any ontology as a node-and-edge diagram. Entity types are nodes; properties and relationships are edges. Pan, zoom, click a node to inspect its properties and relationships in the side inspector, and use the live search bar to filter entities and relationships.

### Ontology Catalogue

A curated library of official and community-contributed ontologies spanning multiple domains (Retail, E-Commerce, Healthcare, Finance, Manufacturing, Education, Food & Beverage, and more). Browse by category, search by name or tags, load any ontology into the workspace with one click, and view its RDF source. Every ontology has a shareable deep link (e.g. `/#/catalogue/official/cosmic-coffee`).

### Visual Ontology Designer

A full-screen, split-pane editor for creating ontologies from scratch or editing existing ones. Add entity types with icons, colors, and typed properties; define relationships with cardinalities; see a live graph preview that updates as you type. Includes undo/redo (50 levels), real-time validation, and export to RDF/XML or JSON. Starter templates for several domains let new users skip the blank page.

### RDF Import & Export

Full round-trip support for RDF/XML (OWL classes, datatype properties, object properties with cardinalities). Import `.rdf` / `.owl` files, export in standard RDF/XML, and verify fidelity with automated round-trip tests.

### One-Click Catalogue Contribution

Sign in with GitHub (device flow, optional backend) and submit your ontology to the community catalogue directly from the designer — the app forks the repo, creates a branch, commits the RDF + metadata, and opens a pull request automatically.

### Embeddable Widget

A self-contained script that renders an interactive ontology viewer on any web page with a single `<script>` tag. Supports dark/light themes, multiple loading methods (catalogue ID, URL, inline base64), and click-to-inspect. See `docs/embed-guide.md`.

### Ontology School

A structured learning hub (`/#/learn`) with conceptual courses and hands-on domain learning paths. Articles support a presentation mode (slides split at `##` headings) and interactive quizzes with instant feedback. Ontology embeds load live graphs from the catalogue with optional diff highlighting.

### Quest System

Progressive quests that guide users through ontology concepts with multi-step instructions, hints, progress bars, and achievement badges. Quests are generated per-ontology, so the narrative always references the actual entities and relationships of the loaded ontology.

### Natural Language Query Playground

Type natural-language questions ("Which customers placed orders?") and see how they map to ontology entities and relationships via the built-in query engine.

### Command Palette & Keyboard Shortcuts

Press `⌘K` / `Ctrl+K` to open a searchable command palette. Jump to the Catalogue, Designer, Ontology School, Import/Export, Help, and more without leaving the keyboard. Press `?` for quick help.

### Interactive Onboarding Tour

First-time visitors get a guided tour with a spotlight overlay highlighting the Header, Graph, Quests, Inspector, and Designer. Dismissable with a "don't show again" option persisted to `localStorage`.

### Deep Linking & URL Routing

Client-side hash routing with shareable URLs for every page:

| Route | Page |
|-------|------|
| `/#/` | Home (default ontology) |
| `/#/catalogue` | Ontology gallery |
| `/#/catalogue/<source>/<slug>` | Specific ontology |
| `/#/designer` | Visual designer |
| `/#/designer/<source>/<slug>` | Designer preloaded with a catalogue ontology |
| `/#/learn` | Ontology School — course catalogue |
| `/#/learn/<course>` | Course detail |
| `/#/learn/<course>/<article>` | Article view (presentation mode) |

### Internationalization

The UI ships in English and Simplified Chinese (`zh-CN`). Locale is detected from the browser and persisted in `localStorage` under the `op-lang` key. Translation catalogs live in `src/i18n/locales` (`en.ts`, `zh-CN.ts`).

## Architecture

- **Framework:** React 19 + TypeScript 5, bundled with Vite 8.
- **State:** Zustand stores (`src/store`) for app state and designer state.
- **Graph:** Cytoscape.js with the `cytoscape-fcose` layout engine.
- **Animation:** Framer Motion.
- **i18n:** `react-i18next` + `i18next-browser-languagedetector`.
- **Content:** `sanitize-html` + `marked` for safe rendering of learning content.
- **Icons:** `lucide-react`.
- **Optional backend:** Azure Functions under `api/` (`generate-ontology`, `github-oauth-proxy`) power the AI builder and one-click GitHub catalogue PRs. The web app itself needs no backend to run.
- **Tests:** Vitest (unit + component tests under `src/**/*.test.ts(x)`).

### Project Structure

```
Ontology-Playground/
├── src/
│   ├── components/       # React components (graph, designer, modals, learn page, panels)
│   ├── data/             # Ontology model, query engine, quest + catalogue translations
│   ├── lib/              # Router, RDF parser/serializer, catalogue helpers
│   ├── store/            # Zustand stores (app state, designer state)
│   ├── i18n/             # i18n setup + locale catalogs (en, zh-CN)
│   ├── hooks/            # Custom React hooks
│   ├── styles/           # CSS (dark/light themes)
│   ├── types/            # TypeScript type definitions
│   └── test/             # Test utilities
├── catalogue/            # Official + community ontology RDF files (official/, community/, external/)
├── content/learn/        # Course directories with markdown articles, quizzes, metadata
├── scripts/              # Build-time compilers (catalogue, learning content)
├── api/                  # Azure Functions backend (optional)
├── docs/                 # Guides and documentation
├── public/               # Static assets (compiled catalogue.json, og-image)
└── .github/workflows/    # CI/CD (Azure SWA + GitHub Pages)
```

## Build & Run

### Prerequisites

- Node.js 22.x
- npm 9+

### Install

```bash
npm install
```

### Development

```bash
npm run dev        # Vite dev server → http://localhost:5173
```

### Build variants

```bash
npm run build           # Web build (catalogue + learn compile, type-check, bundle, embed widget) → build/
npm run build:harmony   # Single-file OFFLINE build for the HarmonyOS ArkWeb shell → build/index.html
npm run build:embed     # Standalone embeddable widget
npm test                # single run (vitest)
npm run lint            # eslint
```

### Harmony / offline mode

`npm run build:harmony` produces a **fully self-contained `index.html`**: all JS, CSS, and fonts are inlined, and the `catalogue.json` / `learn.json` data is injected inline with a `window.fetch` shim so the bundle can be loaded from an ArkWeb `rawfile` with **zero network or sub-resource requests**. External links in the learning content are stripped at build time so the offline build never renders a clickable link that leaves the device. This is the bundle the HarmonyOS native shell loads.

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_ENABLE_AI_BUILDER` | `false` | Enable the Azure OpenAI ontology builder |
| `VITE_ENABLE_LEGACY_FORMATS` | `false` | Enable JSON/YAML/CSV import/export |
| `VITE_BASE_PATH` | `/` | Base path (set automatically for GitHub Pages) |
| `VITE_GITHUB_CLIENT_ID` | *(empty)* | GitHub OAuth client ID for catalogue PRs |
| `VITE_GITHUB_OAUTH_BASE` | *(empty)* | External OAuth proxy URL for GitHub Pages deployments |

## Deployment

The repo ships with GitHub Actions workflows for Azure Static Web Apps (primary) and GitHub Pages (forks). See the workflows under `.github/workflows/`.

## Documentation

See `docs/` for the authoring guide, contribution workflow, embedding guide, GitHub OAuth setup, learning-content guide, and theme authoring guide.

## License

Licensed under the MIT License — see the [LICENSE](LICENSE) file for the full text.
