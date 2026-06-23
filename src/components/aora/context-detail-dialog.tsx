import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { StatusBadge } from './status-badge'
import type { AgpContext } from '@/lib/mock'

export function ContextDetailDialog({
  ctx,
  onOpenChange,
  onAction,
}: {
  ctx: AgpContext | null
  onOpenChange: (o: boolean) => void
  onAction: (ctx: AgpContext, action: 'aprovar' | 'descartar') => void
}) {
  return (
    <Dialog open={!!ctx} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {ctx && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display flex flex-wrap items-center gap-3">
                {ctx.title}
                <StatusBadge status={ctx.status} />
              </DialogTitle>
              <DialogDescription className="data">
                {ctx.id} · {ctx.project}
              </DialogDescription>
            </DialogHeader>

            <dl className="grid grid-cols-3 gap-y-3 text-sm">
              <dt className="caption">Fonte</dt>
              <dd className="data col-span-2">{ctx.source}</dd>
              <dt className="caption">Confiança</dt>
              <dd className="col-span-2 capitalize">{ctx.confidence}</dd>
              <dt className="caption">Atualizado</dt>
              <dd className="data col-span-2 tabular-nums">
                {ctx.updated} · {ctx.freshnessDays}d atrás
              </dd>
            </dl>

            <Separator />
            <p className="caption">
              <span className="label text-accent">// Record</span> — o contexto cita a fonte abrível acima
              (citação imposta); a aprovação exige confirmação humana no gate.
            </p>

            <DialogFooter>
              <Button variant="outline" className="rounded-pill" onClick={() => onAction(ctx, 'descartar')}>
                Descartar
              </Button>
              <Button className="rounded-pill hover:bg-accent" onClick={() => onAction(ctx, 'aprovar')}>
                Aprovar contexto
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
