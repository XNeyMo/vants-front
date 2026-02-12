import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentsApiResponse } from '../data/agents-api.model';

export type AgentsQueryParams = {
  page: number;
  limit: number;
};

export interface AgentsRepository {
  getAgents(params: AgentsQueryParams): Observable<AgentsApiResponse>;
}

export const AGENTS_REPOSITORY = new InjectionToken<AgentsRepository>('AGENTS_REPOSITORY');
