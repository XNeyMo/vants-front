import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from '../../../../shared/ui/organisms/header/header';
import { Hero } from '../../ui/molecules/hero/hero';

@Component({
  selector: 'app-favorites-page',
  imports: [Header, Hero],
  templateUrl: './favorites-page.html',
  styleUrls: ['./favorites-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesPage {

}
