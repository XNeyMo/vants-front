import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AgentsPageShell } from '../../ui/organisms/agents-page-shell/agents-page-shell';
import { AgentCardItem } from '../../ui/organisms/agents-grid/agents-grid';
import { AgentsPageModel } from '../../models/agents-page.model';
import { GetAgentsPageUseCase } from '../../core/get-agents-page.use-case';
import { selectFavoriteIds } from '../../state/favorites/favorites.selectors';
import { favoritesActions } from '../../state/favorites/favorites.actions';
import { toFavoriteAgentFromCardItem } from '../../core/favorites-agent.mapper';

@Component({
  selector: 'app-dashboard-page',
  imports: [AgentsPageShell],
  templateUrl: './dashboard-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {
  private readonly route = inject(ActivatedRoute);
  private readonly getAgentsPage = inject(GetAgentsPageUseCase);
  private readonly store = inject(Store);

  private readonly resolvedPage = toSignal(
    this.route.data.pipe(map((data) => data['agentsPage'] as AgentsPageModel)),
    {
      initialValue: {
        items: [],
        currentPage: 1,
        totalPages: 1
      }
    }
  );

  private readonly pageModel = signal<AgentsPageModel>(this.resolvedPage());

  private readonly favoriteIds = toSignal(this.store.select(selectFavoriteIds), {
    initialValue: new Set<string>()
  });

  readonly agents = computed<AgentCardItem[]>(() =>
    this.pageModel().items.map((item) => ({
      ...item,
      isFavorite: this.favoriteIds().has(item.id)
    }))
  );
  readonly currentPage = computed(() => this.pageModel().currentPage);
  readonly totalPages = computed(() => this.pageModel().totalPages);

  constructor() {
    effect(() => {
      this.pageModel.set(this.resolvedPage());
    });
  }

  goToPrevious(): void {
    const nextPage = Math.max(1, this.currentPage() - 1);
    if (nextPage === this.currentPage()) {
      return;
    }
    this.loadPage(nextPage);
  }

  goToNext(): void {
    const nextPage = Math.min(this.totalPages(), this.currentPage() + 1);
    if (nextPage === this.currentPage()) {
      return;
    }
    this.loadPage(nextPage);
  }

  toggleFavorite(item: AgentCardItem): void {
    this.store.dispatch(
      favoritesActions.toggle({
        agent: toFavoriteAgentFromCardItem(item)
      })
    );
  }

  private loadPage(page: number): void {
    this.getAgentsPage.execute(page, 8).pipe(take(1)).subscribe({
      next: (pageModel) => this.pageModel.set(pageModel)
    });
  }

}
