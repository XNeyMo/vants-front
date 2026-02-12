import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentsApiResponse } from './agents-api.model';
import { AgentsQueryParams, AgentsRepository } from '../core/agents-repository';

@Injectable({ providedIn: 'root' })
export class AgentsHttpRepository implements AgentsRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://vants-back.onrender.com/agents';

  getAgents(params: AgentsQueryParams): Observable<AgentsApiResponse> {
    const httpParams = new HttpParams()
      .set('limit', params.limit)
      .set('page', params.page);

    return this.http.get<AgentsApiResponse>(this.baseUrl, { params: httpParams });
  }
}
