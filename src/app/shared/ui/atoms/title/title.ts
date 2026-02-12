import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Title {
  readonly text = input<string>('');
  readonly highlight = input<string>('');
}
