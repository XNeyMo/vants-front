import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-subsubtitle',
  imports: [],
  templateUrl: './subsubtitle.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Subsubtitle {
  readonly text = input<string>('');
}
