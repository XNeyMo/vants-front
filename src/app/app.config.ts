import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';

import { routes } from './app.routes';
import { TranslocoHttpLoader } from './i18n/transloco-loader';
import { translocoConfigFactory } from './i18n/transloco.config';
import { AGENTS_REPOSITORY } from './features/agents/core/agents-repository';
import { AgentsHttpRepository } from './features/agents/data/agents-http.repository';
import { FAVORITES_AGENTS_REPOSITORY } from './features/agents/core/favorites-agents.repository';
import { FavoritesAgentsRepositoryInMemory } from './features/agents/data/favorites-agents.repository';
import { AGENT_DETAILS_REPOSITORY } from './features/details/core/agent-details.repository';
import { AgentDetailsHttpRepository } from './features/details/data/agent-details-http.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideTransloco({
      config: translocoConfigFactory(),
      loader: TranslocoHttpLoader
    }),
    { provide: AGENTS_REPOSITORY, useClass: AgentsHttpRepository },
    { provide: FAVORITES_AGENTS_REPOSITORY, useClass: FavoritesAgentsRepositoryInMemory },
    { provide: AGENT_DETAILS_REPOSITORY, useClass: AgentDetailsHttpRepository }
  ]
};
