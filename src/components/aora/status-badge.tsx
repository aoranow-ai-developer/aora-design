import { CheckCircle2, Clock, XCircle, AlertTriangle, type LucideIcon } from 'lucide-react'

// Design system status vocabulary (generic — not coupled to a domain).
export type StatusVariant = 'approved' | 'review' | 'discarded' | 'stale'

// badge-status (spec components.badge-status): ALWAYS color + icon + label
// (EARS 1.8, status never color-only). data-status/role for the lint heuristic.
const MAP: Record<StatusVariant, { label: string; Icon: LucideIcon; color: string; mix: string }> = {
  approved: { label: 'Approved', Icon: CheckCircle2, color: 'text-success', mix: 'bg-[color-mix(in_srgb,var(--success)_14%,transparent)]' },
  review: { label: 'In review', Icon: Clock, color: 'text-warning', mix: 'bg-[color-mix(in_srgb,var(--warning)_16%,transparent)]' },
  discarded: { label: 'Discarded', Icon: XCircle, color: 'text-destructive', mix: 'bg-[color-mix(in_srgb,var(--destructive)_14%,transparent)]' },
  stale: { label: 'Stale', Icon: AlertTriangle, color: 'text-muted-foreground', mix: 'bg-surface-alt' },
}

export function StatusBadge({ status }: { status: StatusVariant }) {
  const v = MAP[status]
  return (
    <span
      role="status"
      data-status={status}
      className={`${v.mix} ${v.color} inline-flex w-fit items-center gap-1.5 rounded-pill px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap`}
    >
      <v.Icon className="size-3.5 shrink-0" aria-hidden />
      {v.label}
    </span>
  )
}
