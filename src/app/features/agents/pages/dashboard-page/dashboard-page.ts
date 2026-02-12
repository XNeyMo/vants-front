import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from '../../../../shared/ui/organisms/header/header';
import { Hero } from '../../ui/molecules/hero/hero';

@Component({
  selector: 'app-dashboard-page',
  imports: [Header, Hero],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {
  
}
