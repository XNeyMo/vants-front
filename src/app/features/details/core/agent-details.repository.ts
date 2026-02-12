import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentDetailsApiResponse } from '../data/agent-details-api.model';

export interface AgentDetailsRepository {
  getAgentDetails(uuid: string): Observable<AgentDetailsApiResponse>;
}

export const AGENT_DETAILS_REPOSITORY = new InjectionToken<AgentDetailsRepository>(
  'AGENT_DETAILS_REPOSITORY'
);
