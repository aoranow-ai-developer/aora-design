import { useState, type ReactNode } from 'react'
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
import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Clickable sort header — use it in your ColumnDef.
export function SortHead({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button variant="ghost" className="-ml-2 h-8 rounded-md px-2 text-muted-foreground" onClick={onClick}>
      {label}
      <ArrowUpDown className="ml-1 size-3.5 opacity-50" aria-hidden />
    </Button>
  )
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  searchPlaceholder?: string
  itemLabel?: string // for the count ("12 contexts")
  pageSize?: number
  onRowClick?: (row: T) => void
  // bulk actions: receives the selected rows + a clear()
  renderSelectionActions?: (rows: T[], clearSelection: () => void) => ReactNode
}

// Generic DataTable (aora): TanStack headless + ui/table. Sort, global filter,
// selection, pagination, sticky header, scrolls in its own container (no scroll-x on the body).
export function DataTable<T>({
  columns,
  data,
  searchPlaceholder = 'Filter…',
  itemLabel = 'items',
  pageSize = 8,
  onRowClick,
  renderSelectionActions,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

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
    initialState: { pagination: { pageSize } },
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
            placeholder={searchPlaceholder}
            className="pl-9"
          />
        </div>
        {renderSelectionActions && selectedRows.length > 0 && (
          <div className="flex items-center gap-2 rounded-pill bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] py-1 pr-1 pl-3 text-sm">
            <span className="tabular-nums font-semibold text-accent">{selectedRows.length} selected</span>
            {renderSelectionActions(selectedRows, () => setRowSelection({}))}
          </div>
        )}
        <span className="caption ml-auto">
          {table.getFilteredRowModel().rows.length} {itemLabel}
        </span>
      </div>

      {/* Table: scrolls in its own container, sticky header */}
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
                onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                className={onRowClick ? 'cursor-pointer' : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-1 pt-4">
        <span className="caption">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-pill" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
            <ChevronLeft className="size-4" aria-hidden /> Previous
          </Button>
          <Button variant="outline" size="sm" className="rounded-pill" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
            Next <ChevronRight className="size-4" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  )
}
