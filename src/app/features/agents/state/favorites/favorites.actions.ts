import { createActionGroup, props } from '@ngrx/store';
import { FavoriteAgentData } from '../../core/favorites-agents.repository';

export const favoritesActions = createActionGroup({
  source: 'Favorites',
  events: {
    Add: props<{ agent: FavoriteAgentData }>(),
    Remove: props<{ id: string }>(),
    Toggle: props<{ agent: FavoriteAgentData }>()
  }
});
