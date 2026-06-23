# DESIGN.md — AoraNow Design System

> **The design guide the agent reads before building UI.** "AGENTS.md = how to build; DESIGN.md = how it should look."
>
> | | |
> |---|---|
> | `spec_source` | AoraNow internal vault (master DESIGN.md of the design system) |
> | `exported` | 2026-06-23 |
> | authorship | **the vault is the authoring source**; this file is the design system guide (living copy). Identity/token changes are born in the vault and re-exported. |
>
> **Single source of truth for tokens** = `src/aora-theme.css` (no raw HEX lives outside it). Components consume only CSS vars via Tailwind v4 utilities.

## How to consume (registry `@aoranow`)

1. `components.json` → `"registries": { "@aoranow": "<host>/{name}.json" }`
2. Tokens: `npx shadcn add @aoranow/theme` → copies `src/aora-theme.css`; in the project's `index.css`: `@import "tailwindcss"; @import "tw-animate-css"; @import "./aora-theme.css";` (replaces shadcn's neutral tokens).
3. Full kit: `npx shadcn add @aoranow/base` (theme + components). Or item by item (`@aoranow/data-table`, etc.).
4. Fonts (SIL OFL): `@fontsource/space-grotesk` (display), `@fontsource/inter` (body), `@fontsource/jetbrains-mono` (data), `@fontsource/noto-sans-jp` (JP).

## Identity

AoraNow brand — **"GROW with TRUST"**: sober navy + a teal-green growth accent, signature gradient (navy→teal→green). Calm, spacious, rounded (pills, generous-radius cards, thin borders, translucent ghost buttons). Aesthetic direction **"AoraNow Blueprint"** (technical/drafting-table: mono as the technical voice, `// LIKE THIS` labels, subtle dot-grid, linework) — **high** dose in showcase/heros, **sober** in dense screens (dashboard/forms).

## Colors (roles)

- **navy `#092F49`** (primary) — anchor, text on white (AAA), solid surfaces/buttons. `navy-ink #23323C` = foreground.
- **teal `#1C645F`** (brand accent) — highlight, link, hover, focus, chart. Passes AA as text (6.91:1).
- **teal-bright "Miku" `#39C5BB`** — **only in `.dark`** (primary/accent/ring) and charts. **Fails as text on light.**
- **light = cool paper** `#EEF2F6` (not cream); `surface #FBFCFD`, `surface-alt #E4EAEF`.
- **muted-foreground** = `#54697A` light / `#9DB0BC` dark (AA). **Text = navy/foreground; teal/green = accent only** (EARS 1.3).
- **status**: success=teal · warning amber `#92610A` · danger `#B42318` (light). Dedicated chart palette in `.dark`.

## Components (registry)

> **Folder doctrine:** `components/ui/` = **untouched** shadcn (regenerable, never edit) × `components/aora/` = **our wrappers/compositions** (the Blueprint dose + defaults). Customized shadcn → **wrap it in `aora/`**, don't touch `ui/`.

| item | what it is |
|---|---|
| `@aoranow/theme` | tokens (light + `.dark`), Tailwind v4 |
| `@aoranow/status-badge` | status color **+** icon **+** label (`approved`/`review`/`discarded`/`stale`) — never color-only (EARS 1.8) |
| `@aoranow/data-table` | generic dense table `DataTable<T>` (TanStack): sort, filter, selection, pagination, sticky header, scrolls within its own container |
| `@aoranow/kpi-card` | KPI tile (value + delta) |
| `@aoranow/empty-state` · `@aoranow/error-state` | states (empty + CTA / error + retry) |
| `@aoranow/app-shell` | dashboard shell (sidebar + topbar), nav via props |
| `@aoranow/base` | bundle: theme + all of the above |

## Rules (Do / Don't)

**Do** — tokens only; navy carries text, teal/green accent only; status with color+icon+label; visible focus on everything; tabular mono on numbers; gradient only with white text.
**Don't** — teal-bright as text on light; green/muted as body; raw HEX outside `aora-theme.css`; remove focus outline; loud solid button where a ghost fits.

## A11y (minimum)

Contrast ≥4.5:1 (text) / ≥3:1 (large text, focus, UI); both light theme **and** `.dark` AA; no scroll-x on the body (tables scroll within their own container); status never color-only; keyboard-navigable focus with a ≥3:1 ring.

## Radius (note)

`--radius-lg` = **component** radius (`0.75rem`) — shadcn uses `rounded-lg` on dropdown/popover/input/etc.; **don't** shadow it with the hero radius. Heros use `--radius-hero` (`3rem`). Buttons = `rounded-pill`; cards = `rounded-card`.
