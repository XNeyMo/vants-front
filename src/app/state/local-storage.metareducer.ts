import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AppState } from './app.state';

const LOCAL_STORAGE_KEYS: Array<keyof AppState> = ['favorites'];

export function localStorageSyncReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state, action) => {
    if (typeof window === 'undefined') {
      return reducer(state, action);
    }

    const sync = localStorageSync({
      keys: LOCAL_STORAGE_KEYS,
      rehydrate: true
    });

    return sync(reducer)(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];
