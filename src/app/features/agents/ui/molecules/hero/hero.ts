import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { Title } from '../../../../../shared/ui/atoms/title/title';
import { Description } from '../../../../../shared/ui/atoms/description/description';

@Component({
  selector: 'app-hero',
  imports: [Title, Description, TranslocoModule],
  templateUrl: './hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Hero {
  readonly title = input<string>('');
  readonly highlight = input<string>('');
  readonly description = input<string>('');
}
