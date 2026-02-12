import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from '../../../../shared/ui/organisms/header/header';

@Component({
  selector: 'app-agent-details-page',
  imports: [Header],
  templateUrl: './agent-details-page.html',
  styleUrl: './agent-details-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentDetailsPage {

}
