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
import type { ContextItem } from '@/lib/mock'

export function ContextDetailDialog({
  ctx,
  onOpenChange,
  onAction,
}: {
  ctx: ContextItem | null
  onOpenChange: (o: boolean) => void
  onAction: (ctx: ContextItem, action: 'aprovar' | 'descartar') => void
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
              <dt className="caption">Source</dt>
              <dd className="data col-span-2">{ctx.source}</dd>
              <dt className="caption">Confidence</dt>
              <dd className="col-span-2 capitalize">{ctx.confidence}</dd>
              <dt className="caption">Updated</dt>
              <dd className="data col-span-2 tabular-nums">
                {ctx.updated} · {ctx.freshnessDays}d ago
              </dd>
            </dl>

            <Separator />
            <p className="caption">
              <span className="label text-accent">// Record</span> — the context cites the openable source above
              (enforced citation); approval requires human confirmation at the gate.
            </p>

            <DialogFooter>
              <Button variant="outline" className="rounded-pill" onClick={() => onAction(ctx, 'descartar')}>
                Discard
              </Button>
              <Button className="rounded-pill hover:bg-accent" onClick={() => onAction(ctx, 'aprovar')}>
                Approve context
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
