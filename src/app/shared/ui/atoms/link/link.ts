import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

export type LinkVariant = 'primary';

@Component({
  selector: 'app-link',
  imports: [RouterLink, RouterLinkActive, TranslocoModule],
  templateUrl: './link.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Link {
  readonly label = input<string>('');
  readonly labelKey = input<string | null>(null);
  readonly to = input<string | any[]>('/');

  private readonly baseClass =
    'relative uppercase flex items-center gap-2 px-4 py-2 font-display text-sm font-semibold tracking-wider transition-colors';

  readonly activeClass = `${this.baseClass} text-primary`;
  readonly inactiveClass = `${this.baseClass} text-muted-foreground hover:text-foreground`;
}
