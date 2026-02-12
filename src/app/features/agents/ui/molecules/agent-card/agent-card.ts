import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Subtitle } from '../../../../../shared/ui/atoms/subtitle/subtitle';
import { Subsubtitle } from '../../../../../shared/ui/atoms/subsubtitle/subsubtitle';
import { Button } from '../../../../../shared/ui/atoms/button/button';

@Component({
  selector: 'app-agent-card',
  imports: [Subtitle, Subsubtitle, Button],
  templateUrl: './agent-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentCard {
  readonly name = input<string>('');
  readonly role = input<string>('');
  readonly roleIconUrl = input<string>('');
  readonly imageUrl = input<string>('');
  readonly href = input<string>('/');
  readonly delayMs = input<number>(0);
}
