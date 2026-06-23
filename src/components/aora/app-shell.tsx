import type { ReactNode } from 'react'
import {
  LayoutDashboard,
  Database,
  AlertTriangle,
  Boxes,
  Search,
  Sun,
  Moon,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export type View = 'overview' | 'contexts' | 'states' | 'kitchen'

const NAV: { id: View; label: string; Icon: LucideIcon }[] = [
  { id: 'overview', label: 'Visão geral', Icon: LayoutDashboard },
  { id: 'contexts', label: 'Contextos', Icon: Database },
  { id: 'states', label: 'Estados', Icon: AlertTriangle },
  { id: 'kitchen', label: 'Componentes', Icon: Boxes },
]

const TITLES: Record<View, string> = {
  overview: 'Visão geral',
  contexts: 'Contextos',
  states: 'Estados de dados',
  kitchen: 'Componentes (kitchen sink)',
}

export function AppShell({
  view,
  setView,
  dark,
  setDark,
  onOpenCommand,
  children,
}: {
  view: View
  setView: (v: View) => void
  dark: boolean
  setDark: (d: boolean) => void
  onOpenCommand: () => void
  children: ReactNode
}) {
  return (
    <div className="bg-background text-foreground flex min-h-screen">
      {/* Sidebar */}
      <aside className="bg-surface border-border hidden w-60 shrink-0 flex-col border-r md:flex">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <div className="size-8 rounded-md" style={{ background: 'var(--brand-gradient)' }} />
          <span className="font-display text-lg font-semibold">AoraNow</span>
        </div>
        <nav className="flex flex-col gap-1 px-3">
          {NAV.map((n) => {
            const active = view === n.id
            return (
              <button
                key={n.id}
                onClick={() => setView(n.id)}
                aria-current={active ? 'page' : undefined}
                className={
                  active
                    ? 'bg-surface-alt text-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium'
                    : 'text-muted-foreground hover:bg-surface-alt hover:text-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors'
                }
              >
                <n.Icon className={active ? 'size-4 text-accent' : 'size-4'} aria-hidden />
                {n.label}
              </button>
            )
          })}
        </nav>
        <div className="mt-auto p-4">
          <div className="label text-muted-foreground/60 text-[0.65rem]">// AGP Console · mock</div>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-border bg-background/80 sticky top-0 z-20 flex items-center gap-3 border-b px-6 py-3 backdrop-blur">
          <h2 className="font-display text-lg">{TITLES[view]}</h2>
          <button
            onClick={onOpenCommand}
            className="text-muted-foreground border-border bg-surface hover:bg-surface-alt ml-auto flex items-center gap-2 rounded-pill border px-3 py-1.5 text-sm transition-colors"
          >
            <Search className="size-3.5" aria-hidden /> Buscar
            <kbd className="data bg-surface-alt rounded px-1.5 text-[0.7rem]">⌘K</kbd>
          </button>
          <Button variant="outline" size="icon" className="rounded-pill" aria-label="Alternar tema" onClick={() => setDark(!dark)}>
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Avatar className="size-8">
            <AvatarFallback className="bg-surface-alt text-xs font-semibold">LS</AvatarFallback>
          </Avatar>
        </header>
        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  )
}
