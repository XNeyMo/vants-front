import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from '../../../../shared/ui/organisms/header/header';

@Component({
  selector: 'app-favorites-page',
  imports: [Header],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesPage {

}
