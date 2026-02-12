import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AgentCardItem } from '../models/agent-card-item';
import { FAVORITES_AGENTS_REPOSITORY } from './favorites-agents.repository';

@Injectable({ providedIn: 'root' })
export class GetFavoriteAgentsUseCase {
  private readonly repository = inject(FAVORITES_AGENTS_REPOSITORY);

  execute(): Observable<AgentCardItem[]> {
    return this.repository.getFavorites().pipe(
      map((items) =>
        items.map((item, index) => ({
          ...item,
          href: `/agents/${item.id}`,
          delayMs: index * 75
        }))
      )
    );
  }
}
