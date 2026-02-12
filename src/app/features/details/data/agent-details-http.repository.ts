import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentDetailsApiResponse } from './agent-details-api.model';
import { AgentDetailsRepository } from '../core/agent-details.repository';

@Injectable({ providedIn: 'root' })
export class AgentDetailsHttpRepository implements AgentDetailsRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://vants-back.onrender.com/agents';

  getAgentDetails(uuid: string): Observable<AgentDetailsApiResponse> {
    return this.http.get<AgentDetailsApiResponse>(`${this.baseUrl}/${uuid}`);
  }
}
