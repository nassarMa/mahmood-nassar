import type { AgentKind } from './types'

export const agents: AgentKind[] = [
  { name: 'Engineering', does: 'Reads a codebase and answers questions about it with references.' },
  { name: 'Research', does: 'Gathers sources on a topic and writes up what it found and what it could not confirm.' },
  { name: 'Cloud', does: 'Inspects cloud environments and takes small, reviewable actions.' },
  { name: 'Issue tracker', does: 'Reads, summarises and updates tickets so context is never lost.' },
  { name: 'Browser', does: 'Drives a real browser to reproduce behaviour and check user flows.' },
  { name: 'Automation', does: 'Turns a repeated manual routine into a scheduled, monitored workflow.' },
  { name: 'Knowledge', does: 'Lets a team ask questions of its own documents, decisions and history.' },
]
