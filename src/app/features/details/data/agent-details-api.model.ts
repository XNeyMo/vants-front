export type AgentDetailsApiRole = {
  displayname: string;
  displayicon: string;
};

export type AgentDetailsApiAbility = {
  displayname?: string;
  displayicon?: string;
  description?: string;
  slot?: string;
  displayName?: string;
  displayIcon?: string;
};

export type AgentDetailsApiResponse = {
  uuid: string;
  displayname: string;
  fullportrait: string;
  description: string;
  backgroundgradientcolors: string[];
  role: AgentDetailsApiRole | null;
  abilities: AgentDetailsApiAbility[];
};
