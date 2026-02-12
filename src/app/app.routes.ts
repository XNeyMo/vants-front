import { Routes } from '@angular/router';
import { DashboardPage } from './features/agents/pages/dashboard-page/dashboard-page';
import { AgentDetailsPage } from './features/details/pages/agent-details-page/agent-details-page';
import { FavoritesPage } from './features/agents/pages/favorites-page/favorites-page';

export const routes: Routes = [
	{ path: '', component: DashboardPage },
	{ path: 'agents/:uuid', component: AgentDetailsPage },
	{ path: 'favorites', component: FavoritesPage }
];
