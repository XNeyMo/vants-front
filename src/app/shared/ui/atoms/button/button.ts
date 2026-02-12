import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ButtonVariant = 'icon-text' | 'icon-only' | 'primary';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Button {
  readonly label = input<string | null>(null);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly variant = input<ButtonVariant>('primary');
  readonly disabled = input<boolean>(false);
  readonly title = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);

  readonly buttonClass = computed(() => {
    switch (this.variant()) {
      case 'icon-text':
        return 'group flex items-center gap-1.5 px-3 py-2 font-display text-xs font-semibold tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-muted-foreground';
      case 'icon-only':
        return 'group p-2 text-muted-foreground hover:text-foreground transition-colors';
      default:
        return 'flex items-center gap-1 clip-angular-sm border border-border bg-card px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-foreground transition-all hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground';
    }
  });

  readonly labelClass = computed(() =>
    this.variant() === 'icon-text' ? 'hidden sm:inline' : ''
  );
}
