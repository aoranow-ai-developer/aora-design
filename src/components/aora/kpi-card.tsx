import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '@/components/ui/card'

// Compact card (dashboard density) — KPI tile.
export function KpiCard({
  label,
  value,
  delta,
  hint,
  Icon,
  accent,
}: {
  label: string
  value: string
  delta?: number // % vs previous period
  hint?: string
  Icon: LucideIcon
  accent?: boolean
}) {
  const up = (delta ?? 0) >= 0
  return (
    <Card className="gap-0 p-5">
      <div className="flex items-center justify-between">
        <span className="label text-muted-foreground text-[0.7rem]">{label}</span>
        <Icon className={accent ? 'size-4 text-accent' : 'size-4 text-muted-foreground'} aria-hidden />
      </div>
      <div className="font-display mt-2 text-3xl tabular-nums">{value}</div>
      <div className="mt-1 flex items-center gap-2">
        {delta !== undefined && (
          <span className={`inline-flex items-center gap-0.5 text-xs font-semibold tabular-nums ${up ? 'text-success' : 'text-destructive'}`}>
            {up ? <TrendingUp className="size-3" aria-hidden /> : <TrendingDown className="size-3" aria-hidden />}
            {up ? '+' : ''}{delta}%
          </span>
        )}
        {hint && <span className="caption">{hint}</span>}
      </div>
    </Card>
  )
}
