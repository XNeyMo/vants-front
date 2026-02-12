import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

export type LinkVariant = 'primary';

@Component({
  selector: 'app-link',
  imports: [RouterLink, RouterLinkActive, TranslocoModule],
  templateUrl: './link.html',
  styleUrl: './link.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Link {
  readonly label = input<string>('');
  readonly labelKey = input<string | null>(null);
  readonly to = input<string | any[]>('/');

  readonly activeClass =
    'relative uppercase flex items-center gap-2 px-4 py-2 font-display text-sm font-semibold tracking-wider transition-colors text-primary';
  readonly inactiveClass =
    'relative uppercase flex items-center gap-2 px-4 py-2 font-display text-sm font-semibold tracking-wider transition-colors text-muted-foreground hover:text-foreground';
}
