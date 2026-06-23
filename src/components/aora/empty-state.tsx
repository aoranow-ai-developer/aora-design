import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

// EmptyState (aora): icon + title + description + CTA. Distinguishes a true-empty
// from an empty-by-filter (the latter offers "clear filters").
export function EmptyState({
  Icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  Icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="bg-surface-alt mb-4 rounded-full p-3">
        <Icon className="text-muted-foreground size-6" aria-hidden />
      </div>
      <h3 className="font-display text-lg">{title}</h3>
      <p className="caption mt-1 max-w-sm">{description}</p>
      {actionLabel && (
        <Button className="mt-4 rounded-pill hover:bg-accent" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
