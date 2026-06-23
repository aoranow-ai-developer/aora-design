import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Database, Clock, AlertTriangle, Percent, FilterX, LayoutDashboard, Boxes } from 'lucide-react'
import { Toaster } from '@/components/ui/sonner'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AppShell, type ShellNavItem } from '@/components/aora/app-shell'
import { KpiCard } from '@/components/aora/kpi-card'
import { StatusDonut, ProjectBars } from '@/components/aora/status-chart'
import { ContextsTable, type ContextAction } from '@/components/aora/contexts-table'
import { ContextDetailDialog } from '@/components/aora/context-detail-dialog'
import { CommandMenu } from '@/components/aora/command-menu'
import { KitchenSink } from '@/components/aora/kitchen-sink'
import { EmptyState } from '@/components/aora/empty-state'
import { ErrorState } from '@/components/aora/error-state'
import { CONTEXTS, countByStatus, type AgpContext } from '@/lib/mock'

type View = 'overview' | 'contexts' | 'states' | 'kitchen'

const NAV: ShellNavItem[] = [
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

const ACTION_LABEL: Record<ContextAction, string> = {
  aprovar: 'aprovado',
  revisao: 'movido p/ revisão',
  descartar: 'descartado',
  stale: 'marcado stale',
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="gap-3 p-5">
      <h3 className="label text-muted-foreground text-xs">// {title}</h3>
      {children}
    </Card>
  )
}

function App() {
  const [dark, setDark] = useState(false) // claro = default
  const [view, setView] = useState<View>('overview')
  const [cmdOpen, setCmdOpen] = useState(false)
  const [detail, setDetail] = useState<AgpContext | null>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const counts = countByStatus(CONTEXTS)
  const total = CONTEXTS.length
  const approvalRate = Math.round((counts.aprovado / total) * 100)

  const onAction = (ctx: AgpContext, action: ContextAction) => {
    setDetail(null)
    const msg = `${ctx.id} ${ACTION_LABEL[action]}`
    if (action === 'descartar') toast.error(msg, { description: ctx.title })
    else toast.success(msg, { description: ctx.title })
  }

  return (
    <AppShell
      brand="AoraNow"
      nav={NAV}
      activeId={view}
      onNavigate={(id) => setView(id as View)}
      title={TITLES[view]}
      userInitials="LS"
      footer="// AGP Console · mock"
      dark={dark}
      setDark={setDark}
      onOpenCommand={() => setCmdOpen(true)}
    >
      {view === 'overview' && (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard label="Contextos" value={String(total)} Icon={Database} delta={12} hint="vs. semana passada" accent />
            <KpiCard label="Taxa de aprovação" value={`${approvalRate}%`} Icon={Percent} delta={4} />
            <KpiCard label="Em revisão" value={String(counts.revisao)} Icon={Clock} hint="aguardando humano" />
            <KpiCard label="Stale" value={String(counts.stale)} Icon={AlertTriangle} delta={-8} hint="precisam refresh" />
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <ChartCard title="Distribuição de status (🟢🟡🔴⚪)">
              <StatusDonut />
            </ChartCard>
            <ChartCard title="Contextos por projeto">
              <ProjectBars />
            </ChartCard>
          </div>
        </div>
      )}

      {view === 'contexts' && (
        <Card className="p-5">
          <ContextsTable
            data={CONTEXTS}
            onRowClick={setDetail}
            onAction={onAction}
            onBulkApprove={(rows) => toast.success(`${rows.length} contextos aprovados`, { description: 'Confirmação humana registrada.' })}
          />
        </Card>
      )}

      {view === 'states' && (
        <div className="space-y-5">
          <Card className="gap-3 p-5">
            <h3 className="label text-muted-foreground text-xs">// Skeleton (carregando a grade)</h3>
            <div className="space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="size-7 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-5 w-20 rounded-pill" />
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-0 overflow-hidden">
            <EmptyState
              Icon={FilterX}
              title="Nenhum contexto encontrado"
              description="Nenhum resultado para o filtro atual. Tente limpar os filtros ou importar um novo contexto."
              actionLabel="Limpar filtros"
              onAction={() => toast('Filtros limpos')}
            />
          </Card>
          <Card className="p-0 overflow-hidden">
            <ErrorState onRetry={() => toast.success('Reconectado ao AGP Gateway')} />
          </Card>
        </div>
      )}

      {view === 'kitchen' && <KitchenSink />}

      <ContextDetailDialog ctx={detail} onOpenChange={(o) => !o && setDetail(null)} onAction={onAction} />
      <CommandMenu open={cmdOpen} onOpenChange={setCmdOpen} onPick={(label) => toast(`Abrindo ${label}`)} />
      {/* description vem apagada por padrão (ilegível no claro) → mesma cor do título */}
      <Toaster toastOptions={{ classNames: { toast: 'cn-toast', description: '!text-popover-foreground' } }} />
    </AppShell>
  )
}

export default App
