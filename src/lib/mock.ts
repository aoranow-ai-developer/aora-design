// Mock do domínio do AGP (ContextOps): contextos aprovados/em revisão/descartados/stale
// por projeto. Dados fake só pra vitrine do design system.

export type ContextStatus = 'aprovado' | 'revisao' | 'descartado' | 'stale'
export type Confidence = 'alta' | 'media' | 'baixa'

export interface AgpContext {
  id: string
  project: string
  title: string
  source: string
  status: ContextStatus
  confidence: Confidence
  owner: string // iniciais
  updated: string // ISO date
  freshnessDays: number
}

export const PROJECTS = [
  'AGP',
  '24h PMO Agent',
  'SkillOps',
  'AWS Cost Opt',
  'Governança GitHub',
  'Demo Summit',
] as const

export const CONTEXTS: AgpContext[] = [
  { id: 'CTX-1042', project: 'AGP', title: 'Config do gateway MCP (ContextOps)', source: 'Box · arquitetura-agp.pdf', status: 'aprovado', confidence: 'alta', owner: 'LS', updated: '2026-06-22', freshnessDays: 1 },
  { id: 'CTX-1041', project: 'AGP', title: 'Política de aprovação: LLM propõe, humano confirma', source: 'Slack · #agp-dev', status: 'aprovado', confidence: 'alta', owner: 'LS', updated: '2026-06-21', freshnessDays: 2 },
  { id: 'CTX-1038', project: '24h PMO Agent', title: 'Cartão de contexto PMO_PRJ_DASHBOARD-13', source: 'Backlog · AIPD-13', status: 'revisao', confidence: 'media', owner: 'YJ', updated: '2026-06-20', freshnessDays: 3 },
  { id: 'CTX-1037', project: '24h PMO Agent', title: 'Regra de detecção de quebra de SLA', source: 'Slack · #pmo-agent', status: 'revisao', confidence: 'media', owner: 'YJ', updated: '2026-06-19', freshnessDays: 4 },
  { id: 'CTX-1031', project: 'SkillOps', title: 'Mockup "AI Agent Control Tower"', source: 'Slack · #skillops (Ito)', status: 'descartado', confidence: 'baixa', owner: 'IT', updated: '2026-06-15', freshnessDays: 8 },
  { id: 'CTX-1029', project: 'SkillOps', title: 'Modelo Context/Record/Skill', source: 'Box · folheto-summit.pdf', status: 'aprovado', confidence: 'alta', owner: 'ZH', updated: '2026-06-18', freshnessDays: 5 },
  { id: 'CTX-1024', project: 'AWS Cost Opt', title: 'Starter templates do FinOps Agent', source: 'Box · finops-kit.zip', status: 'stale', confidence: 'media', owner: 'LS', updated: '2026-05-30', freshnessDays: 24 },
  { id: 'CTX-1022', project: 'AWS Cost Opt', title: 'Mapeamento conta→time (28 contas)', source: 'CSV · account-mapping', status: 'aprovado', confidence: 'alta', owner: 'LS', updated: '2026-06-18', freshnessDays: 5 },
  { id: 'CTX-1019', project: 'Governança GitHub', title: "Do's & Don'ts da org no GitHub", source: 'Box · governanca-gh.md', status: 'revisao', confidence: 'media', owner: 'AZ', updated: '2026-06-16', freshnessDays: 7 },
  { id: 'CTX-1018', project: 'Governança GitHub', title: 'Ruleset do branch default (proteção)', source: 'Slack · #infra', status: 'stale', confidence: 'baixa', owner: 'AZ', updated: '2026-06-02', freshnessDays: 21 },
  { id: 'CTX-1014', project: 'Demo Summit', title: 'Storyboard 5 beats (extração de skill)', source: 'Box · demo-summit.md', status: 'aprovado', confidence: 'alta', owner: 'LS', updated: '2026-06-17', freshnessDays: 6 },
  { id: 'CTX-1013', project: 'Demo Summit', title: 'Pista de execução Workato→ServiceNow→Patlite', source: 'Slack · #summit-demo', status: 'revisao', confidence: 'media', owner: 'ZH', updated: '2026-06-17', freshnessDays: 6 },
  { id: 'CTX-1009', project: 'AGP', title: 'Índice de conhecimento por projeto', source: 'Box · knowledge-index.json', status: 'aprovado', confidence: 'alta', owner: 'LS', updated: '2026-06-20', freshnessDays: 3 },
  { id: 'CTX-1004', project: 'SkillOps', title: 'Catálogo de skills (vetting por PR)', source: 'GitHub · aora-skills-catalog', status: 'stale', confidence: 'media', owner: 'ZH', updated: '2026-05-28', freshnessDays: 26 },
  { id: 'CTX-0998', project: '24h PMO Agent', title: 'Chave comum SFDC↔Backpack (商談ID)', source: 'Box · sfdc-backlog.md', status: 'descartado', confidence: 'baixa', owner: 'YJ', updated: '2026-06-10', freshnessDays: 13 },
  { id: 'CTX-0991', project: 'AWS Cost Opt', title: 'Pipeline híbrido AWS-native (CE+COH)', source: 'GitHub · aora-aws-cost-optimizer', status: 'aprovado', confidence: 'alta', owner: 'LS', updated: '2026-06-19', freshnessDays: 4 },
]

export const STATUS_META: Record<ContextStatus, { label: string }> = {
  aprovado: { label: 'Aprovado' },
  revisao: { label: 'Em revisão' },
  descartado: { label: 'Descartado' },
  stale: { label: 'Stale' },
}

export function countByStatus(rows: AgpContext[]) {
  return rows.reduce(
    (acc, r) => ((acc[r.status] = (acc[r.status] ?? 0) + 1), acc),
    {} as Record<ContextStatus, number>,
  )
}
