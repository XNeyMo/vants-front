import { createFeature, createReducer, on } from '@ngrx/store';
import { FavoriteAgentData } from '../../core/favorites-agents.repository';
import { favoritesActions } from './favorites.actions';

export type FavoritesState = {
  items: FavoriteAgentData[];
};

const initialState: FavoritesState = {
  items: []
};

const addFavorite = (
  items: FavoriteAgentData[],
  agent: FavoriteAgentData
): FavoriteAgentData[] => {
  if (items.some((item) => item.id === agent.id)) {
    return items;
  }

  return [agent, ...items];
};

const removeFavorite = (items: FavoriteAgentData[], id: string): FavoriteAgentData[] =>
  items.filter((item) => item.id !== id);

const reducer = createReducer(
  initialState,
  on(favoritesActions.add, (state, { agent }) => ({
    ...state,
    items: addFavorite(state.items, agent)
  })),
  on(favoritesActions.remove, (state, { id }) => ({
    ...state,
    items: removeFavorite(state.items, id)
  })),
  on(favoritesActions.toggle, (state, { agent }) => ({
    ...state,
    items: state.items.some((item) => item.id === agent.id)
      ? removeFavorite(state.items, agent.id)
      : addFavorite(state.items, agent)
  }))
);

export const favoritesFeature = createFeature({
  name: 'favorites',
  reducer
});
