import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-description',
  imports: [],
  templateUrl: './description.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Description {
  readonly text = input<string>('');
}
