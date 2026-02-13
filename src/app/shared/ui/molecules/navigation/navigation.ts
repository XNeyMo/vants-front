import { ChangeDetectionStrategy, Component, input, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoModule } from '@jsverse/transloco';
import { Store } from '@ngrx/store';
import { Link } from '../../atoms/link/link';
import { selectFavoriteCount } from '../../../../features/agents/state/favorites/favorites.selectors';

export type NavigationItem = {
  labelKey: string;
  path: string;
  icon: 'users' | 'heart';
};

@Component({
  selector: 'app-navigation',
  imports: [Link, TranslocoModule],
  templateUrl: './navigation.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navigation {
  readonly items = input<NavigationItem[]>([
    { labelKey: 'nav.agents', path: '/', icon: 'users' },
    { labelKey: 'nav.favorites', path: '/favorites', icon: 'heart' }
  ]);

  private readonly store = inject(Store);
  readonly favoritesCount = toSignal(this.store.select(selectFavoriteCount), {
    initialValue: 0
  });
}
