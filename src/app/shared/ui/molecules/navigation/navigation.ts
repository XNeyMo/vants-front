import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Link } from '../../atoms/link/link';

export type NavigationItem = {
  label: string;
  path: string;
};

@Component({
  selector: 'app-navigation',
  imports: [Link],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navigation {
  readonly items = input<NavigationItem[]>([
    { label: 'Home', path: '/' },
    { label: 'Favorites', path: '/favorites' }
  ]);
}
