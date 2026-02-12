import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { Link } from '../../atoms/link/link';

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
}
