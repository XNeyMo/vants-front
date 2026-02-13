import { createSelector } from '@ngrx/store';
import { favoritesFeature } from './favorites.reducer';

export const selectFavoriteItems = favoritesFeature.selectItems;

export const selectFavoriteCount = createSelector(
  selectFavoriteItems,
  (items) => items.length
);

export const selectFavoriteIds = createSelector(selectFavoriteItems, (items) =>
  new Set(items.map((item) => item.id))
);

export const selectIsFavorite = (id: string) =>
  createSelector(selectFavoriteItems, (items) => items.some((item) => item.id === id));
