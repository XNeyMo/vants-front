import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TranslocoModule } from '@jsverse/transloco';
import { Store } from '@ngrx/store';
import { Header } from '../../../../shared/ui/organisms/header/header';
import { Button } from '../../../../shared/ui/atoms/button/button';
import { AgentDetailsModel } from '../../models/agent-details.model';
import { AbilitiesSection } from '../../ui/organisms/abilities-section/abilities-section';
import { selectFavoriteIds } from '../../../agents/state/favorites/favorites.selectors';
import { favoritesActions } from '../../../agents/state/favorites/favorites.actions';
import { FavoriteAgentData } from '../../../agents/core/favorites-agents.repository';

@Component({
  selector: 'app-agent-details-page',
  imports: [Header, Button, AbilitiesSection, TranslocoModule],
  templateUrl: './agent-details-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentDetailsPage {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  readonly agent = toSignal(
    this.route.data.pipe(map((data) => data['agentDetails'] as AgentDetailsModel)),
    {
      initialValue: {
        uuid: '',
        displayName: '',
        fullPortraitUrl: '',
        description: '',
        backgroundGradientColors: [],
        role: null,
        abilities: []
      }
    }
  );

  private readonly favoriteIds = toSignal(this.store.select(selectFavoriteIds), {
    initialValue: new Set<string>()
  });
  readonly isFavorite = computed(() => this.favoriteIds().has(this.agent().uuid));

  readonly roleIconAlt = computed(() => {
    const roleName = this.agent().role?.name ?? '';
    return roleName ? `${roleName} role icon` : 'Role icon';
  });

  toggleFavorite(): void {
    const agent = this.toFavoriteAgent();
    if (!agent) {
      return;
    }

    this.store.dispatch(favoritesActions.toggle({ agent }));
  }

  private toFavoriteAgent(): FavoriteAgentData | null {
    const agent = this.agent();
    if (!agent.uuid) {
      return null;
    }

    return {
      id: agent.uuid,
      name: agent.displayName,
      role: agent.role?.name ?? 'Unknown',
      roleIconUrl: agent.role?.iconUrl ?? '',
      imageUrl: agent.fullPortraitUrl
    };
  }
}
