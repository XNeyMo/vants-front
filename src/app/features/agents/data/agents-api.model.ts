export type AgentsApiInfo = {
  count: number;
  pages: number;
  limit: number;
  next: string | null;
  prev: string | null;
};

export type AgentsApiRole = {
  displayname: string;
  displayicon: string;
};

export type AgentsApiItem = {
  uuid: string;
  displayname: string;
  displayicon: string;
  backgroundgradientcolors: string[];
  role: AgentsApiRole | null;
};

export type AgentsApiResponse = {
  info: AgentsApiInfo;
  data: AgentsApiItem[];
};
