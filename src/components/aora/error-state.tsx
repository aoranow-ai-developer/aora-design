import { AlertTriangle, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

// ErrorState (aora): falha ao buscar dados. role=alert + retry.
export function ErrorState({
  message = 'Falha ao consultar o servidor.',
  onRetry,
}: {
  message?: string
  onRetry?: () => void
}) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 rounded-full bg-[color-mix(in_srgb,var(--destructive)_14%,transparent)] p-3">
        <AlertTriangle className="text-destructive size-6" aria-hidden />
      </div>
      <h3 className="font-display text-lg">Algo quebrou</h3>
      <p className="caption mt-1 max-w-sm">{message}</p>
      {onRetry && (
        <Button variant="outline" className="mt-4 rounded-pill" onClick={onRetry}>
          <RotateCw className="size-4" aria-hidden /> Tentar de novo
        </Button>
      )}
    </div>
  )
}
