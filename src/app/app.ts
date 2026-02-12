import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslocoModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly transloco = inject(TranslocoService);

  protected readonly title = signal('vants-front');
  protected readonly languages = ['en', 'es'];

  protected setLanguage(lang: string): void {
    this.transloco.setActiveLang(lang);
  }
}
