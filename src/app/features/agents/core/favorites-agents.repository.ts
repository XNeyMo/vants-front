import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export type FavoriteAgentData = {
  id: string;
  name: string;
  role: string;
  roleIconUrl: string;
  imageUrl: string;
};

export interface FavoritesAgentsRepository {
  getFavorites(): Observable<FavoriteAgentData[]>;
}

export const FAVORITES_AGENTS_REPOSITORY = new InjectionToken<FavoritesAgentsRepository>(
  'FAVORITES_AGENTS_REPOSITORY'
);
