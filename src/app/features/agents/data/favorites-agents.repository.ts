import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  FavoriteAgentData,
  FavoritesAgentsRepository
} from '../core/favorites-agents.repository';

const FAVORITES: FavoriteAgentData[] = [
  {
    id: 'add6443a-41bd-e414-f6ad-e58d267f4e95',
    name: 'Jett',
    role: 'Duelist',
    roleIconUrl:
      'https://media.valorant-api.com/agents/roles/d8c6641f-52b1-4f55-8b3d-82e6d6f2b2ec/displayicon.png',
    imageUrl:
      'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png'
  },
  {
    id: 'a3bfb853-43b2-7238-a4f1-ad90e9e46bcc',
    name: 'Reyna',
    role: 'Duelist',
    roleIconUrl:
      'https://media.valorant-api.com/agents/roles/d8c6641f-52b1-4f55-8b3d-82e6d6f2b2ec/displayicon.png',
    imageUrl:
      'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png'
  }
];

@Injectable({ providedIn: 'root' })
export class FavoritesAgentsRepositoryInMemory implements FavoritesAgentsRepository {
  getFavorites(): Observable<FavoriteAgentData[]> {
    return of(FAVORITES);
  }
}
