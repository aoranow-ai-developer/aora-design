import type { ReactNode } from 'react'
import { Search, Sun, Moon, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export interface ShellNavItem {
  id: string
  label: string
  Icon: LucideIcon
}

// Shell de dashboard (aora): sidebar de navegação + topbar (busca/⌘K, tema, avatar).
// Genérico — a navegação vem por props.
export function AppShell({
  brand = 'AoraNow',
  nav,
  activeId,
  onNavigate,
  title,
  userInitials = 'AN',
  footer,
  dark,
  setDark,
  onOpenCommand,
  children,
}: {
  brand?: string
  nav: ShellNavItem[]
  activeId: string
  onNavigate: (id: string) => void
  title: string
  userInitials?: string
  footer?: string
  dark: boolean
  setDark: (d: boolean) => void
  onOpenCommand?: () => void
  children: ReactNode
}) {
  return (
    <div className="bg-background text-foreground flex min-h-screen">
      {/* Sidebar */}
      <aside className="bg-surface border-border hidden w-60 shrink-0 flex-col border-r md:flex">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <div className="size-8 rounded-md" style={{ background: 'var(--brand-gradient)' }} />
          <span className="font-display text-lg font-semibold">{brand}</span>
        </div>
        <nav className="flex flex-col gap-1 px-3">
          {nav.map((n) => {
            const active = activeId === n.id
            return (
              <button
                key={n.id}
                onClick={() => onNavigate(n.id)}
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
        {footer && (
          <div className="mt-auto p-4">
            <div className="label text-muted-foreground/60 text-[0.65rem]">{footer}</div>
          </div>
        )}
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-border bg-background/80 sticky top-0 z-20 flex items-center gap-3 border-b px-6 py-3 backdrop-blur">
          <h2 className="font-display text-lg">{title}</h2>
          {onOpenCommand && (
            <button
              onClick={onOpenCommand}
              className="text-muted-foreground border-border bg-surface hover:bg-surface-alt ml-auto flex items-center gap-2 rounded-pill border px-3 py-1.5 text-sm transition-colors"
            >
              <Search className="size-3.5" aria-hidden /> Buscar
              <kbd className="data bg-surface-alt rounded px-1.5 text-[0.7rem]">⌘K</kbd>
            </button>
          )}
          <Button
            variant="outline"
            size="icon"
            className={onOpenCommand ? 'rounded-pill' : 'ml-auto rounded-pill'}
            aria-label="Alternar tema"
            onClick={() => setDark(!dark)}
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Avatar className="size-8">
            <AvatarFallback className="bg-surface-alt text-xs font-semibold">{userInitials}</AvatarFallback>
          </Avatar>
        </header>
        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  )
}
