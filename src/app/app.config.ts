import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { TranslocoHttpLoader } from './i18n/transloco-loader';
import { translocoConfigFactory } from './i18n/transloco.config';
import { AGENTS_REPOSITORY } from './features/agents/core/agents-repository';
import { AgentsHttpRepository } from './features/agents/data/agents-http.repository';
import { AGENT_DETAILS_REPOSITORY } from './features/details/core/agent-details.repository';
import { AgentDetailsHttpRepository } from './features/details/data/agent-details-http.repository';
import { favoritesFeature } from './features/agents/state/favorites/favorites.reducer';
import { metaReducers } from './state/local-storage.metareducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay(), withHttpTransferCacheOptions({
      includeRequestsWithAuthHeaders: true
    })),
    provideHttpClient(withFetch()),
    provideTransloco({
      config: translocoConfigFactory(),
      loader: TranslocoHttpLoader
    }),
    provideStore({ [favoritesFeature.name]: favoritesFeature.reducer }, { metaReducers }),
    { provide: AGENTS_REPOSITORY, useClass: AgentsHttpRepository },
    { provide: AGENT_DETAILS_REPOSITORY, useClass: AgentDetailsHttpRepository }
  ]
};
