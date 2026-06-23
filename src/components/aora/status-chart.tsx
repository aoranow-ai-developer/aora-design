import { Pie, PieChart, Cell, Tooltip, Bar, BarChart, XAxis, YAxis, CartesianGrid } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { CONTEXTS, PROJECTS, countByStatus, type ContextStatus } from '@/lib/mock'

// Donut da distribuição de status (🟢🟡🔴⚪ do AGP). Cores = tokens de estado,
// então troca de tema junto. PieChart de tamanho FIXO (sem ResponsiveContainer:
// ele media largura errada em troca de view e clipava o pie).
const STATUS_TOKEN: Record<ContextStatus, { label: string; color: string }> = {
  aprovado: { label: 'Aprovado', color: 'var(--success)' },
  revisao: { label: 'Em revisão', color: 'var(--warning)' },
  descartado: { label: 'Descartado', color: 'var(--destructive)' },
  stale: { label: 'Stale', color: 'var(--muted-foreground)' },
}

export function StatusDonut() {
  const counts = countByStatus(CONTEXTS)
  const order: ContextStatus[] = ['aprovado', 'revisao', 'descartado', 'stale']
  const data = order.map((s) => ({ status: s, label: STATUS_TOKEN[s].label, value: counts[s] ?? 0, fill: STATUS_TOKEN[s].color }))

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
      <PieChart width={220} height={220}>
        <Tooltip
          contentStyle={{
            background: 'var(--popover)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            color: 'var(--popover-foreground)',
            fontSize: 12,
          }}
        />
        <Pie data={data} dataKey="value" nameKey="label" cx={110} cy={110} innerRadius={56} outerRadius={96} strokeWidth={2} stroke="var(--surface)" isAnimationActive={false}>
          {data.map((d) => (
            <Cell key={d.status} fill={d.fill} />
          ))}
        </Pie>
      </PieChart>
      <ul className="w-full max-w-[180px] space-y-2 text-sm">
        {data.map((d) => (
          <li key={d.status} className="flex items-center gap-2">
            <span className="size-2.5 shrink-0 rounded-full" style={{ background: d.fill }} />
            <span className="text-muted-foreground">{d.label}</span>
            <span className="data ml-auto font-semibold tabular-nums">{d.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Barras de contextos por projeto (paleta de chart por tema). Aqui o
// ResponsiveContainer serve (BarChart preenche a largura medida sem clipar).
const projConfig = { value: { label: 'Contextos', color: 'var(--chart-1)' } } satisfies ChartConfig

export function ProjectBars() {
  const data = PROJECTS.map((p) => ({
    project: p,
    value: CONTEXTS.filter((c) => c.project === p).length,
  }))
  return (
    <ChartContainer
      config={projConfig}
      className="h-[220px] w-full [&_.recharts-cartesian-axis-tick_text]:!fill-foreground"
    >
      <BarChart accessibilityLayer data={data} layout="vertical" margin={{ left: 8, right: 12 }}>
        <CartesianGrid horizontal={false} />
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="project" width={118} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={5} isAnimationActive={false} />
      </BarChart>
    </ChartContainer>
  )
}
