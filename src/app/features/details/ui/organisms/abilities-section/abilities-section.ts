import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { AgentAbilityModel } from '../../../models/agent-ability.model';

@Component({
  selector: 'app-abilities-section',
  imports: [TranslocoModule],
  templateUrl: './abilities-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbilitiesSection {
  readonly abilities = input<AgentAbilityModel[]>([]);
}
