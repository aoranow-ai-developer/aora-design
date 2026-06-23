// Dados de demo do showcase — TOTALMENTE genéricos/fictícios (sem nada interno).
// Domínio: um painel de "contextos" de uma base de conhecimento (KB) genérica.

export type ContextStatus = 'aprovado' | 'revisao' | 'descartado' | 'stale'
export type Confidence = 'alta' | 'media' | 'baixa'

export interface ContextItem {
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

export const PROJECTS = ['Atlas', 'Orbit', 'Beacon', 'Nimbus', 'Helix', 'Vega'] as const

export const CONTEXTS: ContextItem[] = [
  { id: 'CTX-1042', project: 'Atlas', title: 'Config do gateway de API', source: 'Confluence · arch.pdf', status: 'aprovado', confidence: 'alta', owner: 'AM', updated: '2026-06-22', freshnessDays: 1 },
  { id: 'CTX-1041', project: 'Atlas', title: 'Política de aprovação de acesso', source: 'Slack · #engineering', status: 'aprovado', confidence: 'alta', owner: 'AM', updated: '2026-06-21', freshnessDays: 2 },
  { id: 'CTX-1038', project: 'Orbit', title: 'Esquema de autenticação (OAuth)', source: 'Jira · ENG-142', status: 'revisao', confidence: 'media', owner: 'JK', updated: '2026-06-20', freshnessDays: 3 },
  { id: 'CTX-1037', project: 'Orbit', title: 'Regra de detecção de anomalia', source: 'Slack · #platform', status: 'revisao', confidence: 'media', owner: 'JK', updated: '2026-06-19', freshnessDays: 4 },
  { id: 'CTX-1031', project: 'Beacon', title: 'Mockup do painel de controle', source: 'Drive · ui-spec.fig', status: 'descartado', confidence: 'baixa', owner: 'RS', updated: '2026-06-15', freshnessDays: 8 },
  { id: 'CTX-1029', project: 'Beacon', title: 'Modelo de permissões (RBAC)', source: 'Confluence · rbac.pdf', status: 'aprovado', confidence: 'alta', owner: 'TP', updated: '2026-06-18', freshnessDays: 5 },
  { id: 'CTX-1024', project: 'Nimbus', title: 'Templates de relatório financeiro', source: 'Drive · report-kit.zip', status: 'stale', confidence: 'media', owner: 'AM', updated: '2026-05-30', freshnessDays: 24 },
  { id: 'CTX-1022', project: 'Nimbus', title: 'Mapa de serviços por time', source: 'CSV · service-map', status: 'aprovado', confidence: 'alta', owner: 'AM', updated: '2026-06-18', freshnessDays: 5 },
  { id: 'CTX-1019', project: 'Helix', title: 'Checklist de onboarding', source: 'Notion · runbook.md', status: 'revisao', confidence: 'media', owner: 'DC', updated: '2026-06-16', freshnessDays: 7 },
  { id: 'CTX-1018', project: 'Helix', title: 'Regra de proteção do branch default', source: 'Slack · #infra', status: 'stale', confidence: 'baixa', owner: 'DC', updated: '2026-06-02', freshnessDays: 21 },
  { id: 'CTX-1014', project: 'Vega', title: 'Storyboard da demo (5 etapas)', source: 'Drive · demo.md', status: 'aprovado', confidence: 'alta', owner: 'LN', updated: '2026-06-17', freshnessDays: 6 },
  { id: 'CTX-1013', project: 'Vega', title: 'Pipeline de ingestão de eventos', source: 'Slack · #data', status: 'revisao', confidence: 'media', owner: 'RS', updated: '2026-06-17', freshnessDays: 6 },
  { id: 'CTX-1009', project: 'Atlas', title: 'Índice de conhecimento por projeto', source: 'Drive · index.json', status: 'aprovado', confidence: 'alta', owner: 'AM', updated: '2026-06-20', freshnessDays: 3 },
  { id: 'CTX-1004', project: 'Beacon', title: 'Catálogo de componentes', source: 'GitHub · acme/ui-kit', status: 'stale', confidence: 'media', owner: 'TP', updated: '2026-05-28', freshnessDays: 26 },
  { id: 'CTX-0998', project: 'Orbit', title: 'Chave de integração CRM↔ERP', source: 'Drive · integ.md', status: 'descartado', confidence: 'baixa', owner: 'JK', updated: '2026-06-10', freshnessDays: 13 },
  { id: 'CTX-0991', project: 'Nimbus', title: 'Plano de migração de dados', source: 'GitHub · acme/migrate', status: 'aprovado', confidence: 'alta', owner: 'LN', updated: '2026-06-19', freshnessDays: 4 },
]

export const STATUS_META: Record<ContextStatus, { label: string }> = {
  aprovado: { label: 'Aprovado' },
  revisao: { label: 'Em revisão' },
  descartado: { label: 'Descartado' },
  stale: { label: 'Stale' },
}

export function countByStatus(rows: ContextItem[]) {
  return rows.reduce(
    (acc, r) => ((acc[r.status] = (acc[r.status] ?? 0) + 1), acc),
    {} as Record<ContextStatus, number>,
  )
}
