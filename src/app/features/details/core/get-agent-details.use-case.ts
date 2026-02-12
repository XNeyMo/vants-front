import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AgentDetailsModel } from '../models/agent-details.model';
import { AgentDetailsApiResponse } from '../data/agent-details-api.model';
import { AGENT_DETAILS_REPOSITORY } from './agent-details.repository';

@Injectable({ providedIn: 'root' })
export class GetAgentDetailsUseCase {
  private readonly repository = inject(AGENT_DETAILS_REPOSITORY);

  execute(uuid: string): Observable<AgentDetailsModel> {
    return this.repository.getAgentDetails(uuid).pipe(
      map((response) => this.toModel(response))
    );
  }

  private toModel(response: AgentDetailsApiResponse): AgentDetailsModel {
    const abilities = Array.isArray(response.abilities)
      ? response.abilities
          .map((ability) => ({
            name: ability.displayname ?? ability.displayName ?? '',
            description: ability.description ?? '',
            slot: ability.slot ?? 'Ability',
            iconUrl: ability.displayicon ?? ability.displayIcon ?? ''
          }))
          .filter((ability) => ability.name)
      : [];

    const role = response.role
      ? {
          name: response.role.displayname ?? '',
          iconUrl: response.role.displayicon ?? ''
        }
      : null;

    return {
      uuid: response.uuid ?? '',
      displayName: response.displayname ?? '',
      fullPortraitUrl: response.fullportrait ?? '',
      description: response.description ?? '',
      backgroundGradientColors: response.backgroundgradientcolors ?? [],
      role,
      abilities
    };
  }
}
