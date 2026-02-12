import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AgentsPageShell } from '../../ui/organisms/agents-page-shell/agents-page-shell';
import { GetFavoriteAgentsUseCase } from '../../core/get-favorite-agents.use-case';

@Component({
  selector: 'app-favorites-page',
  imports: [AgentsPageShell],
  templateUrl: './favorites-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesPage {
  private readonly getFavoriteAgents = inject(GetFavoriteAgentsUseCase);

  readonly agents = toSignal(this.getFavoriteAgents.execute(), { initialValue: [] });
  readonly currentPage = signal(1);
  readonly totalPages = signal(1);
}
