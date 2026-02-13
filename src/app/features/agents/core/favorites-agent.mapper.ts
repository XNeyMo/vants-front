import { FavoriteAgentData } from './favorites-agents.repository';
import { AgentCardItem } from '../models/agent-card-item';

export const toFavoriteAgentFromCardItem = (item: AgentCardItem): FavoriteAgentData => ({
  id: item.id,
  name: item.name,
  role: item.role,
  roleIconUrl: item.roleIconUrl,
  imageUrl: item.imageUrl
});
