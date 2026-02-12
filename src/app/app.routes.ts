import { Routes } from '@angular/router';
import { DashboardPage } from './features/agents/pages/dashboard-page/dashboard-page';
import { AgentDetailsPage } from './features/details/pages/agent-details-page/agent-details-page';
import { FavoritesPage } from './features/agents/pages/favorites-page/favorites-page';
import { agentsPageResolver } from './features/agents/data/agents.resolver';
import { agentDetailsResolver } from './features/details/data/agent-details.resolver';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: DashboardPage,
		resolve: { agentsPage: agentsPageResolver }
	},
	{
		path: 'agents/:uuid',
		component: AgentDetailsPage,
		resolve: { agentDetails: agentDetailsResolver }
	},
	{ path: 'favorites', component: FavoritesPage }
];
