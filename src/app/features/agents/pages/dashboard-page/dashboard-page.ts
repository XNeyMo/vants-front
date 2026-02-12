import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from '../../../../shared/ui/organisms/header/header';

@Component({
  selector: 'app-dashboard-page',
  imports: [Header],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {

}
