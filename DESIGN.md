# DESIGN.md — AoraNow Design System

> **O guia de design lido pelo agente antes de construir UI.** "AGENTS.md = como construir; DESIGN.md = como deve parecer."
>
> | | |
> |---|---|
> | `spec_source` | `Obsidian Vault/Projetos/Design System AoraNow/Specs/DESIGN.md mestre (AoraNow).md` |
> | `vault_commit` | `2560dc0` |
> | `exported` | 2026-06-23 |
> | autoria | **o vault é a fonte de autoria**; este arquivo é o guia do design system (cópia viva). Mudança de identidade/token nasce no vault e re-exporta. |
>
> **Fonte única de verdade dos tokens** = `src/aora-theme.css` (não há HEX cru fora dele). Componentes consomem só CSS vars via utilitários do Tailwind v4.

## Como consumir (registry `@aoranow`)

1. `components.json` → `"registries": { "@aoranow": "<host>/{name}.json" }`
2. Tokens: `npx shadcn add @aoranow/theme` → copia `src/aora-theme.css`; no `index.css` do projeto: `@import "tailwindcss"; @import "tw-animate-css"; @import "./aora-theme.css";` (substitui os tokens neutros do shadcn).
3. Kit completo: `npx shadcn add @aoranow/base` (theme + componentes). Ou item a item (`@aoranow/data-table`, etc.).
4. Fontes (SIL OFL): `@fontsource/space-grotesk` (display), `@fontsource/inter` (corpo), `@fontsource/jetbrains-mono` (dados), `@fontsource/noto-sans-jp` (JP).

## Identidade

Marca AoraNow — **"GROW with TRUST"**: navy sóbrio + acento teal-verde de crescimento, gradiente assinatura (navy→teal→verde). Calmo, espaçoso, arredondado (pills, cards de raio generoso, bordas finas, botões ghost translúcidos). Direção estética **"AoraNow Blueprint"** (técnico/prancheta: mono como voz técnica, rótulos `// ASSIM`, dot-grid sutil, linework) — dose **alta** em vitrine/heros, **sóbria** em telas densas (dashboard/forms).

## Cores (papéis)

- **navy `#092F49`** (primary) — âncora, texto sobre branco (AAA), superfícies/botões sólidos. `navy-ink #23323C` = foreground.
- **teal `#1C645F`** (accent de marca) — realce, link, hover, foco, gráfico. Passa AA como texto (6.91:1).
- **teal-bright "Miku" `#39C5BB`** — **só no `.dark`** (primary/accent/ring) e gráficos. **Reprova como texto no claro.**
- **claro = papel frio** `#EEF2F6` (não creme); `surface #FBFCFD`, `surface-alt #E4EAEF`.
- **muted-foreground** = `#54697A` claro / `#9DB0BC` escuro (AA). **Texto = navy/foreground; teal/verde = só acento** (EARS 1.3).
- **status**: sucesso=teal · warning âmbar `#92610A` · danger `#B42318` (claro). Paleta de chart própria no `.dark`.

## Componentes (registry)

> **Doutrina de pastas:** `components/ui/` = shadcn **intocado** (regenerável, nunca editar) × `components/aora/` = **wrappers/composições nossas** (a dose Blueprint + defaults). Customizou shadcn → **embrulha em `aora/`**, não toca no `ui/`.

| item | o que é |
|---|---|
| `@aoranow/theme` | tokens (claro + `.dark`), Tailwind v4 |
| `@aoranow/status-badge` | status cor **+** ícone **+** rótulo (`aprovado`/`revisao`/`descartado`/`stale`) — nunca só-cor (EARS 1.8) |
| `@aoranow/data-table` | tabela densa genérica `DataTable<T>` (TanStack): sort, filtro, seleção, paginação, sticky header, rola no próprio container |
| `@aoranow/kpi-card` | tile de KPI (valor + delta) |
| `@aoranow/empty-state` · `@aoranow/error-state` | estados (vazio + CTA / erro + retry) |
| `@aoranow/app-shell` | shell de dashboard (sidebar + topbar), nav por props |
| `@aoranow/base` | bundle: theme + todos acima |

## Regras (Do / Don't)

**Do** — só tokens; navy carrega texto, teal/verde só acento; status com cor+ícone+rótulo; foco visível em tudo; mono tabular em números; gradiente só com texto branco.
**Don't** — teal-bright como texto no claro; verde/muted como corpo; HEX cru fora de `aora-theme.css`; remover outline de foco; botão sólido berrante onde cabe ghost.

## A11y (mínimo)

Contraste ≥4.5:1 (texto) / ≥3:1 (texto grande, foco, UI); tema claro **e** `.dark` ambos AA; sem scroll-x no body (tabelas rolam no próprio container); status nunca só-cor; foco navegável por teclado com anel ≥3:1.

## Raio (nota)

`--radius-lg` = raio de **componente** (`0.75rem`) — o shadcn usa `rounded-lg` em dropdown/popover/input/etc.; **não** shadowar com raio de hero. Heros usam `--radius-hero` (`3rem`). Botões = `rounded-pill`; cards = `rounded-card`.
