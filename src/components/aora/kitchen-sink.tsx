import { useState, type ReactNode } from 'react'
import { Loader2, Info, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { StatusBadge } from './status-badge'

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-surface border-border rounded-card border p-5">
      <h3 className="label text-muted-foreground mb-4 text-xs">// {title}</h3>
      {children}
    </div>
  )
}

export function KitchenSink() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Panel title="Button — variants">
        <div className="flex flex-wrap gap-2">
          <Button className="rounded-pill hover:bg-accent">Primary</Button>
          <Button variant="secondary" className="rounded-pill">Secondary</Button>
          <Button variant="outline" className="rounded-pill">Outline</Button>
          <Button variant="ghost" className="rounded-pill">Ghost</Button>
          <Button variant="destructive" className="rounded-pill">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </Panel>

      <Panel title="Button — sizes / icon / loading">
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" className="rounded-pill">sm</Button>
          <Button className="rounded-pill">default</Button>
          <Button size="lg" className="rounded-pill">lg</Button>
          <Button size="icon" className="rounded-pill" aria-label="Add"><Plus className="size-4" /></Button>
          <Button
            className="rounded-pill hover:bg-accent"
            disabled={loading}
            onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 1600)
            }}
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            {loading ? 'Saving…' : 'Loading state'}
          </Button>
        </div>
      </Panel>

      <Panel title="Input / Textarea / Select">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="ks-in">Context name</Label>
            <Input id="ks-in" placeholder="ex.: gateway-mcp" />
          </div>
          <Input placeholder="Invalid (aria-invalid)" aria-invalid />
          <Select>
            <SelectTrigger><SelectValue placeholder="Project…" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="atlas">Atlas</SelectItem>
              <SelectItem value="orbit">Orbit</SelectItem>
              <SelectItem value="beacon">Beacon</SelectItem>
            </SelectContent>
          </Select>
          <Textarea placeholder="Description / note…" rows={2} />
        </div>
      </Panel>

      <Panel title="Toggles — checkbox / switch / radio">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox id="ks-cb" defaultChecked />
            <Label htmlFor="ks-cb">Show only stale</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="ks-sw" defaultChecked />
            <Label htmlFor="ks-sw">Auto-refresh</Label>
          </div>
          <RadioGroup defaultValue="auto" className="flex gap-4">
            {['auto', 'manual', 'off'].map((v) => (
              <div key={v} className="flex items-center gap-2">
                <RadioGroupItem value={v} id={`ks-r-${v}`} />
                <Label htmlFor={`ks-r-${v}`} className="capitalize">{v}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </Panel>

      <Panel title="Badges">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>default</Badge>
          <Badge variant="secondary">secondary</Badge>
          <Badge variant="destructive">destructive</Badge>
          <Badge variant="outline">outline</Badge>
          <Separator orientation="vertical" className="h-5" />
          <StatusBadge status="approved" />
          <StatusBadge status="stale" />
        </div>
      </Panel>

      <Panel title="Overlays — tooltip / popover + avatar">
        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-pill" aria-label="Info">
                <Info className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Why is it stale? &gt; 14d without review.</TooltipContent>
          </Tooltip>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="rounded-pill">Popover</Button>
            </PopoverTrigger>
            <PopoverContent className="text-sm">A rich per-column filter would go here.</PopoverContent>
          </Popover>
          <div className="flex -space-x-2">
            {['LS', 'YJ', 'ZH'].map((i) => (
              <Avatar key={i} className="border-surface size-8 border-2">
                <AvatarFallback className="bg-surface-alt text-xs font-semibold">{i}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </Panel>

      <Panel title="Skeleton (loading)">
        <div className="space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </Panel>
    </div>
  )
}
