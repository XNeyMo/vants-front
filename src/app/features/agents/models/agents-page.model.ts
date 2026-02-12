import { AgentCardItem } from './agent-card-item';

export type AgentsPageModel = {
  items: AgentCardItem[];
  currentPage: number;
  totalPages: number;
};
