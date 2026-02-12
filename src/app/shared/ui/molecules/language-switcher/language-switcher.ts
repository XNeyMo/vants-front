import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { Button } from '../../atoms/button/button';

@Component({
  selector: 'app-language-switcher',
  imports: [Button],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSwitcher {
  private readonly transloco = inject(TranslocoService);
  private readonly availableLangs = ['en', 'es'];

  readonly currentLang = signal(this.transloco.getActiveLang() ?? 'en');
  readonly nextLang = computed(() =>
    this.currentLang() === 'en' ? 'es' : 'en'
  );

  readonly label = computed(() => this.currentLang().toUpperCase());
  readonly title = computed(() =>
    this.nextLang() === 'en' ? 'Switch to English' : 'Switch to Spanish'
  );

  toggleLanguage(): void {
    const next = this.nextLang();
    if (!this.availableLangs.includes(next)) {
      return;
    }
    this.currentLang.set(next);
    this.transloco.setActiveLang(next);
  }
}
