import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ButtonVariant = 'icon-text' | 'icon-only' | 'primary' | 'pagination';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
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
    const common = 'cursor-pointer transition-colors disabled:cursor-not-allowed';

    switch (this.variant()) {
      case 'icon-text':
        return [
          common,
          'group flex items-center gap-1.5 px-3 py-2 font-display text-xs font-semibold tracking-wider text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:hover:text-muted-foreground'
        ].join(' ');
      case 'icon-only':
        return [
          common,
          'group p-2 text-foreground hover:text-primary'
        ].join(' ');
      case 'pagination':
      default:
        return [
          common,
          'flex items-center gap-1 clip-angular-sm border border-border bg-card px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-foreground transition-all hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground'
        ].join(' ');
    }
  });

  readonly labelClass = computed(() =>
    this.variant() === 'icon-text' ? 'hidden sm:inline' : ''
  );
}
