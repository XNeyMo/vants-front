import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AgentsPageModel } from '../models/agents-page.model';
import { AgentCardItem } from '../models/agent-card-item';
import { AGENTS_REPOSITORY } from './agents-repository';
import { AgentsApiResponse } from '../data/agents-api.model';

@Injectable({ providedIn: 'root' })
export class GetAgentsPageUseCase {
  private readonly repository = inject(AGENTS_REPOSITORY);

  execute(page: number, limit: number): Observable<AgentsPageModel> {
    return this.repository.getAgents({ page, limit }).pipe(
      map((response) => this.toPageModel(response, page))
    );
  }

  private toPageModel(response: AgentsApiResponse, page: number): AgentsPageModel {
    const data = Array.isArray(response.data) ? response.data : [];
    const items: AgentCardItem[] = data.map((agent, index) => ({
      id: agent.uuid,
      name: agent.displayname ?? (agent as { displayName?: string }).displayName ?? '',
      role: agent.role?.displayname ?? (agent.role as { displayName?: string } | null)?.displayName ?? 'Unknown',
      roleIconUrl: agent.role?.displayicon ?? (agent.role as { displayIcon?: string } | null)?.displayIcon ?? '',
      imageUrl: agent.displayicon ?? (agent as { displayIcon?: string }).displayIcon ?? '',
      href: `/agents/${agent.uuid}`,
      delayMs: index * 75
    }));

    return {
      items,
      currentPage: page,
      totalPages: response.info?.pages ?? 1
    };
  }
}
