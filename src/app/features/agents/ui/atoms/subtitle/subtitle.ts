import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-subtitle',
  imports: [],
  templateUrl: './subtitle.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Subtitle {
  readonly text = input<string>('');
}
