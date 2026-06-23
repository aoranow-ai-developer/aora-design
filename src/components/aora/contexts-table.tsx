import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, CheckCircle2, Clock, XCircle, AlertTriangle } from 'lucide-react'
import type { ContextItem } from '@/lib/mock'
import { DataTable, SortHead } from './data-table'
import { StatusBadge } from './status-badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export type ContextAction = 'approve' | 'review' | 'discard' | 'stale'

// Showcase usage: the showcase columns on top of the design system's generic DataTable.
export function ContextsTable({
  data,
  onRowClick,
  onAction,
  onBulkApprove,
}: {
  data: ContextItem[]
  onRowClick: (ctx: ContextItem) => void
  onAction: (ctx: ContextItem, action: ContextAction) => void
  onBulkApprove: (rows: ContextItem[]) => void
}) {
  const columns: ColumnDef<ContextItem>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} aria-label="Select row" />
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'id',
      header: ({ column }) => <SortHead label="ID" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
      cell: ({ row }) => <span className="data text-muted-foreground">{row.original.id}</span>,
    },
    {
      accessorKey: 'project',
      header: ({ column }) => <SortHead label="Project" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
      cell: ({ row }) => <span className="font-semibold whitespace-nowrap">{row.original.project}</span>,
    },
    {
      accessorKey: 'title',
      header: () => <span className="px-1">Context</span>,
      cell: ({ row }) => <span className="block max-w-[22rem] truncate">{row.original.title}</span>,
    },
    {
      accessorKey: 'source',
      header: () => <span className="px-1">Source</span>,
      cell: ({ row }) => <span className="data text-muted-foreground text-xs whitespace-nowrap">{row.original.source}</span>,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <SortHead label="Status" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: 'owner',
      header: () => <span className="px-1">Owner</span>,
      cell: ({ row }) => (
        <Avatar className="size-7">
          <AvatarFallback className="bg-surface-alt text-[0.7rem] font-semibold">{row.original.owner}</AvatarFallback>
        </Avatar>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'updated',
      header: ({ column }) => <SortHead label="Updated" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
      cell: ({ row }) => <span className="data tabular-nums text-muted-foreground whitespace-nowrap">{row.original.updated}</span>,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const ctx = row.original
        return (
          <div onClick={(e) => e.stopPropagation()} className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8 rounded-md" aria-label="Actions">
                  <MoreHorizontal className="size-4" aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>{ctx.id}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onAction(ctx, 'approve')}>
                  <CheckCircle2 className="size-4 text-success" /> Approve
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction(ctx, 'review')}>
                  <Clock className="size-4 text-warning" /> Mark in review
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction(ctx, 'stale')}>
                  <AlertTriangle className="size-4 text-muted-foreground" /> Mark stale
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => onAction(ctx, 'discard')}>
                  <XCircle className="size-4" /> Discard
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
      enableSorting: false,
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      searchPlaceholder="Filter contexts…"
      itemLabel="contexts"
      onRowClick={onRowClick}
      renderSelectionActions={(rows, clear) => (
        <Button
          size="sm"
          className="rounded-pill hover:bg-accent"
          onClick={() => {
            onBulkApprove(rows as ContextItem[])
            clear()
          }}
        >
          Approve
        </Button>
      )}
    />
  )
}
