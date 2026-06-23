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
import { CONTEXTS, countByStatus, type ContextItem } from '@/lib/mock'

type View = 'overview' | 'contexts' | 'states' | 'kitchen'

const NAV: ShellNavItem[] = [
  { id: 'overview', label: 'Overview', Icon: LayoutDashboard },
  { id: 'contexts', label: 'Contexts', Icon: Database },
  { id: 'states', label: 'States', Icon: AlertTriangle },
  { id: 'kitchen', label: 'Components', Icon: Boxes },
]

const TITLES: Record<View, string> = {
  overview: 'Overview',
  contexts: 'Contexts',
  states: 'Data states',
  kitchen: 'Components (kitchen sink)',
}

const ACTION_LABEL: Record<ContextAction, string> = {
  aprovar: 'approved',
  revisao: 'moved to review',
  descartar: 'discarded',
  stale: 'marked stale',
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
  const [dark, setDark] = useState(false) // light = default
  const [view, setView] = useState<View>('overview')
  const [cmdOpen, setCmdOpen] = useState(false)
  const [detail, setDetail] = useState<ContextItem | null>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const counts = countByStatus(CONTEXTS)
  const total = CONTEXTS.length
  const approvalRate = Math.round((counts.aprovado / total) * 100)

  const onAction = (ctx: ContextItem, action: ContextAction) => {
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
      footer="// Console · demo"
      dark={dark}
      setDark={setDark}
      onOpenCommand={() => setCmdOpen(true)}
    >
      {view === 'overview' && (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard label="Contexts" value={String(total)} Icon={Database} delta={12} hint="vs. last week" accent />
            <KpiCard label="Approval rate" value={`${approvalRate}%`} Icon={Percent} delta={4} />
            <KpiCard label="In review" value={String(counts.revisao)} Icon={Clock} hint="awaiting review" />
            <KpiCard label="Stale" value={String(counts.stale)} Icon={AlertTriangle} delta={-8} hint="need refresh" />
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <ChartCard title="Status distribution (🟢🟡🔴⚪)">
              <StatusDonut />
            </ChartCard>
            <ChartCard title="Contexts by project">
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
            onBulkApprove={(rows) => toast.success(`${rows.length} contexts approved`, { description: 'Human confirmation recorded.' })}
          />
        </Card>
      )}

      {view === 'states' && (
        <div className="space-y-5">
          <Card className="gap-3 p-5">
            <h3 className="label text-muted-foreground text-xs">// Skeleton (loading the grid)</h3>
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
              title="No contexts found"
              description="No results for the current filter. Try clearing the filters or importing a new context."
              actionLabel="Clear filters"
              onAction={() => toast('Filters cleared')}
            />
          </Card>
          <Card className="p-0 overflow-hidden">
            <ErrorState onRetry={() => toast.success('Reconnected to the gateway')} />
          </Card>
        </div>
      )}

      {view === 'kitchen' && <KitchenSink />}

      <ContextDetailDialog ctx={detail} onOpenChange={(o) => !o && setDetail(null)} onAction={onAction} />
      <CommandMenu open={cmdOpen} onOpenChange={setCmdOpen} onPick={(label) => toast(`Opening ${label}`)} />
      {/* description comes muted by default (illegible on light) → same color as the title */}
      <Toaster toastOptions={{ classNames: { toast: 'cn-toast', description: '!text-popover-foreground' } }} />
    </AppShell>
  )
}

export default App
