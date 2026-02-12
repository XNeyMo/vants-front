import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { GetAgentsPageUseCase } from '../core/get-agents-page.use-case';
import { AgentsPageModel } from '../models/agents-page.model';

export const agentsPageResolver: ResolveFn<AgentsPageModel> = (route) => {
  const pageParam = route.queryParamMap.get('page');
  const page = pageParam ? Number(pageParam) : 1;
  const normalizedPage = Number.isFinite(page) && page > 0 ? page : 1;

  return inject(GetAgentsPageUseCase).execute(normalizedPage, 8);
};
