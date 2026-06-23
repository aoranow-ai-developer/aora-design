import { useState } from 'react'
import {
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  ArrowUpDown,
  MoreHorizontal,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import type { AgpContext } from '@/lib/mock'
import { StatusBadge } from './status-badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export type ContextAction = 'aprovar' | 'revisao' | 'descartar' | 'stale'

function SortHead({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button variant="ghost" className="-ml-2 h-8 rounded-md px-2 text-muted-foreground" onClick={onClick}>
      {label}
      <ArrowUpDown className="ml-1 size-3.5 opacity-50" aria-hidden />
    </Button>
  )
}

export function ContextsTable({
  data,
  onRowClick,
  onAction,
  onBulkApprove,
}: {
  data: AgpContext[]
  onRowClick: (ctx: AgpContext) => void
  onAction: (ctx: AgpContext, action: ContextAction) => void
  onBulkApprove: (rows: AgpContext[]) => void
}) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const columns: ColumnDef<AgpContext>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Selecionar tudo"
        />
      ),
      cell: ({ row }) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
            aria-label="Selecionar linha"
          />
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
      header: ({ column }) => <SortHead label="Projeto" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
      cell: ({ row }) => <span className="font-semibold whitespace-nowrap">{row.original.project}</span>,
    },
    {
      accessorKey: 'title',
      header: () => <span className="px-1">Contexto</span>,
      cell: ({ row }) => <span className="block max-w-[22rem] truncate">{row.original.title}</span>,
    },
    {
      accessorKey: 'source',
      header: () => <span className="px-1">Fonte</span>,
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
      header: ({ column }) => <SortHead label="Atualizado" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
      cell: ({ row }) => (
        <span className="data tabular-nums text-muted-foreground whitespace-nowrap">{row.original.updated}</span>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const ctx = row.original
        return (
          <div onClick={(e) => e.stopPropagation()} className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8 rounded-md" aria-label="Ações">
                  <MoreHorizontal className="size-4" aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>{ctx.id}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onAction(ctx, 'aprovar')}>
                  <CheckCircle2 className="size-4 text-success" /> Aprovar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction(ctx, 'revisao')}>
                  <Clock className="size-4 text-warning" /> Marcar em revisão
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction(ctx, 'stale')}>
                  <AlertTriangle className="size-4 text-muted-foreground" /> Marcar stale
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => onAction(ctx, 'descartar')}>
                  <XCircle className="size-4" /> Descartar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
      enableSorting: false,
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, rowSelection },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  })

  const selectedRows = table.getSelectedRowModel().rows.map((r) => r.original)

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 px-1 pb-4">
        <div className="relative max-w-xs flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" aria-hidden />
          <Input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Filtrar contextos…"
            className="pl-9"
          />
        </div>
        {selectedRows.length > 0 && (
          <div className="flex items-center gap-2 rounded-pill bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] py-1 pr-1 pl-3 text-sm">
            <span className="tabular-nums font-semibold text-accent">{selectedRows.length} selecionado(s)</span>
            <Button
              size="sm"
              className="rounded-pill hover:bg-accent"
              onClick={() => {
                onBulkApprove(selectedRows)
                setRowSelection({})
              }}
            >
              Aprovar
            </Button>
          </div>
        )}
        <span className="caption ml-auto">{table.getFilteredRowModel().rows.length} contextos</span>
      </div>

      {/* Tabela (rola no próprio container; sticky header) */}
      <div className="border-border max-h-[26rem] overflow-auto rounded-card border">
        <Table>
          <TableHeader className="bg-surface sticky top-0 z-10">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id} className="whitespace-nowrap">
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={() => onRowClick(row.original)}
                className="cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-between px-1 pt-4">
        <span className="caption">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-pill" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
            <ChevronLeft className="size-4" aria-hidden /> Anterior
          </Button>
          <Button variant="outline" size="sm" className="rounded-pill" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
            Próxima <ChevronRight className="size-4" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  )
}
