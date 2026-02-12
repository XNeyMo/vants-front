import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { GetAgentDetailsUseCase } from '../core/get-agent-details.use-case';
import { AgentDetailsModel } from '../models/agent-details.model';

export const agentDetailsResolver: ResolveFn<AgentDetailsModel> = (route) => {
  const uuid = route.paramMap.get('uuid') ?? '';
  return inject(GetAgentDetailsUseCase).execute(uuid);
};
