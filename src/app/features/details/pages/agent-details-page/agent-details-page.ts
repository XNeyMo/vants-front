import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TranslocoModule } from '@jsverse/transloco';
import { Header } from '../../../../shared/ui/organisms/header/header';
import { Button } from '../../../../shared/ui/atoms/button/button';
import { AgentDetailsModel } from '../../models/agent-details.model';
import { AbilitiesSection } from '../../ui/organisms/abilities-section/abilities-section';

@Component({
  selector: 'app-agent-details-page',
  imports: [Header, Button, AbilitiesSection, TranslocoModule],
  templateUrl: './agent-details-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentDetailsPage {
  private readonly route = inject(ActivatedRoute);
  readonly isFavorite = signal(false);

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

  readonly roleIconAlt = computed(() => {
    const roleName = this.agent().role?.name ?? '';
    return roleName ? `${roleName} role icon` : 'Role icon';
  });

  toggleFavorite(): void {
    this.isFavorite.update((value) => !value);
  }
}
