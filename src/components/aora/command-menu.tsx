import { useEffect } from 'react'
import { Folder, FileText } from 'lucide-react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { CONTEXTS, PROJECTS } from '@/lib/mock'

// ⌘K — global project/context search (hooks into project search/resolution).
export function CommandMenu({
  open,
  onOpenChange,
  onPick,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  onPick: (label: string) => void
}) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, onOpenChange])

  const pick = (label: string) => {
    onOpenChange(false)
    onPick(label)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Search" description="Projects and contexts">
      <Command>
        <CommandInput placeholder="Search project, context, issue…" />
        <CommandList>
        <CommandEmpty>Nothing found.</CommandEmpty>
        <CommandGroup heading="Projects">
          {PROJECTS.map((p) => (
            <CommandItem key={p} onSelect={() => pick(`Project: ${p}`)}>
              <Folder className="size-4" /> {p}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Contexts">
          {CONTEXTS.slice(0, 6).map((c) => (
            <CommandItem key={c.id} value={`${c.id} ${c.title}`} onSelect={() => pick(c.id)}>
              <FileText className="size-4" /> <span className="data text-muted-foreground">{c.id}</span> {c.title}
            </CommandItem>
          ))}
        </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
