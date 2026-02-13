import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AgentsPageShell } from '../../ui/organisms/agents-page-shell/agents-page-shell';
import { GetFavoriteAgentsUseCase } from '../../core/get-favorite-agents.use-case';
import { favoritesActions } from '../../state/favorites/favorites.actions';
import { AgentCardItem } from '../../models/agent-card-item';
import { toFavoriteAgentFromCardItem } from '../../core/favorites-agent.mapper';

@Component({
  selector: 'app-favorites-page',
  imports: [AgentsPageShell],
  templateUrl: './favorites-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesPage {
  private readonly getFavoriteAgents = inject(GetFavoriteAgentsUseCase);
  private readonly store = inject(Store);

  readonly agents = toSignal(this.getFavoriteAgents.execute(), { initialValue: [] });
  readonly currentPage = signal(1);
  readonly totalPages = signal(1);

  toggleFavorite(item: AgentCardItem): void {
    this.store.dispatch(
      favoritesActions.toggle({
        agent: toFavoriteAgentFromCardItem(item)
      })
    );
  }
}
