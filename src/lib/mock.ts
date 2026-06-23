// Showcase demo data — FULLY generic/fictional (nothing internal).
// Domain: a panel of "contexts" from a generic knowledge base (KB).

export type ContextStatus = 'aprovado' | 'revisao' | 'descartado' | 'stale'
export type Confidence = 'alta' | 'media' | 'baixa'

export interface ContextItem {
  id: string
  project: string
  title: string
  source: string
  status: ContextStatus
  confidence: Confidence
  owner: string // initials
  updated: string // ISO date
  freshnessDays: number
}

export const PROJECTS = ['Atlas', 'Orbit', 'Beacon', 'Nimbus', 'Helix', 'Vega'] as const

export const CONTEXTS: ContextItem[] = [
  { id: 'CTX-1042', project: 'Atlas', title: 'API gateway config', source: 'Confluence · arch.pdf', status: 'aprovado', confidence: 'alta', owner: 'AM', updated: '2026-06-22', freshnessDays: 1 },
  { id: 'CTX-1041', project: 'Atlas', title: 'Access approval policy', source: 'Slack · #engineering', status: 'aprovado', confidence: 'alta', owner: 'AM', updated: '2026-06-21', freshnessDays: 2 },
  { id: 'CTX-1038', project: 'Orbit', title: 'Authentication scheme (OAuth)', source: 'Jira · ENG-142', status: 'revisao', confidence: 'media', owner: 'JK', updated: '2026-06-20', freshnessDays: 3 },
  { id: 'CTX-1037', project: 'Orbit', title: 'Anomaly detection rule', source: 'Slack · #platform', status: 'revisao', confidence: 'media', owner: 'JK', updated: '2026-06-19', freshnessDays: 4 },
  { id: 'CTX-1031', project: 'Beacon', title: 'Control panel mockup', source: 'Drive · ui-spec.fig', status: 'descartado', confidence: 'baixa', owner: 'RS', updated: '2026-06-15', freshnessDays: 8 },
  { id: 'CTX-1029', project: 'Beacon', title: 'Permissions model (RBAC)', source: 'Confluence · rbac.pdf', status: 'aprovado', confidence: 'alta', owner: 'TP', updated: '2026-06-18', freshnessDays: 5 },
  { id: 'CTX-1024', project: 'Nimbus', title: 'Financial report templates', source: 'Drive · report-kit.zip', status: 'stale', confidence: 'media', owner: 'AM', updated: '2026-05-30', freshnessDays: 24 },
  { id: 'CTX-1022', project: 'Nimbus', title: 'Per-team service map', source: 'CSV · service-map', status: 'aprovado', confidence: 'alta', owner: 'AM', updated: '2026-06-18', freshnessDays: 5 },
  { id: 'CTX-1019', project: 'Helix', title: 'Onboarding checklist', source: 'Notion · runbook.md', status: 'revisao', confidence: 'media', owner: 'DC', updated: '2026-06-16', freshnessDays: 7 },
  { id: 'CTX-1018', project: 'Helix', title: 'Default branch protection rule', source: 'Slack · #infra', status: 'stale', confidence: 'baixa', owner: 'DC', updated: '2026-06-02', freshnessDays: 21 },
  { id: 'CTX-1014', project: 'Vega', title: 'Demo storyboard (5 steps)', source: 'Drive · demo.md', status: 'aprovado', confidence: 'alta', owner: 'LN', updated: '2026-06-17', freshnessDays: 6 },
  { id: 'CTX-1013', project: 'Vega', title: 'Event ingestion pipeline', source: 'Slack · #data', status: 'revisao', confidence: 'media', owner: 'RS', updated: '2026-06-17', freshnessDays: 6 },
  { id: 'CTX-1009', project: 'Atlas', title: 'Per-project knowledge index', source: 'Drive · index.json', status: 'aprovado', confidence: 'alta', owner: 'AM', updated: '2026-06-20', freshnessDays: 3 },
  { id: 'CTX-1004', project: 'Beacon', title: 'Component catalog', source: 'GitHub · acme/ui-kit', status: 'stale', confidence: 'media', owner: 'TP', updated: '2026-05-28', freshnessDays: 26 },
  { id: 'CTX-0998', project: 'Orbit', title: 'CRM↔ERP integration key', source: 'Drive · integ.md', status: 'descartado', confidence: 'baixa', owner: 'JK', updated: '2026-06-10', freshnessDays: 13 },
  { id: 'CTX-0991', project: 'Nimbus', title: 'Data migration plan', source: 'GitHub · acme/migrate', status: 'aprovado', confidence: 'alta', owner: 'LN', updated: '2026-06-19', freshnessDays: 4 },
]

export const STATUS_META: Record<ContextStatus, { label: string }> = {
  aprovado: { label: 'Approved' },
  revisao: { label: 'In review' },
  descartado: { label: 'Discarded' },
  stale: { label: 'Stale' },
}

export function countByStatus(rows: ContextItem[]) {
  return rows.reduce(
    (acc, r) => ((acc[r.status] = (acc[r.status] ?? 0) + 1), acc),
    {} as Record<ContextStatus, number>,
  )
}
