import { AgentAbilityModel } from './agent-ability.model';

export type AgentDetailsRole = {
  name: string;
  iconUrl: string;
};

export type AgentDetailsModel = {
  uuid: string;
  displayName: string;
  fullPortraitUrl: string;
  description: string;
  backgroundGradientColors: string[];
  role: AgentDetailsRole | null;
  abilities: AgentAbilityModel[];
};
