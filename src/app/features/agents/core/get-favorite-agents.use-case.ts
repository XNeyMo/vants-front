import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AgentCardItem } from '../models/agent-card-item';
import { selectFavoriteItems } from '../state/favorites/favorites.selectors';

@Injectable({ providedIn: 'root' })
export class GetFavoriteAgentsUseCase {
  private readonly store = inject(Store);

  execute(): Observable<AgentCardItem[]> {
    return this.store.select(selectFavoriteItems).pipe(
      map((items) =>
        items.map((item, index) => ({
          ...item,
          href: `/agents/${item.id}`,
          delayMs: index * 75,
          isFavorite: true
        }))
      )
    );
  }
}
