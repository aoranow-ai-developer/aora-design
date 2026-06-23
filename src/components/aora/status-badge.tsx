import { CheckCircle2, Clock, XCircle, AlertTriangle, type LucideIcon } from 'lucide-react'

// Vocabulário de status do design system (genérico — sem acoplar a domínio).
export type StatusVariant = 'aprovado' | 'revisao' | 'descartado' | 'stale'

// badge-status (spec components.badge-status): SEMPRE cor + ícone + rótulo
// (EARS 1.8, status nunca só-cor). data-status/role p/ a heurística de lint.
const MAP: Record<StatusVariant, { label: string; Icon: LucideIcon; color: string; mix: string }> = {
  aprovado: { label: 'Aprovado', Icon: CheckCircle2, color: 'text-success', mix: 'bg-[color-mix(in_srgb,var(--success)_14%,transparent)]' },
  revisao: { label: 'Em revisão', Icon: Clock, color: 'text-warning', mix: 'bg-[color-mix(in_srgb,var(--warning)_16%,transparent)]' },
  descartado: { label: 'Descartado', Icon: XCircle, color: 'text-destructive', mix: 'bg-[color-mix(in_srgb,var(--destructive)_14%,transparent)]' },
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
