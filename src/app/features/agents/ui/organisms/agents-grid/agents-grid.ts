import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { AgentCard } from '../../molecules/agent-card/agent-card';
import { PaginationControls } from '../../molecules/pagination-controls/pagination-controls';
import { AgentCardItem } from '../../../models/agent-card-item';
export type { AgentCardItem };

@Component({
  selector: 'app-agents-grid',
  imports: [AgentCard, PaginationControls],
  templateUrl: './agents-grid.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentsGrid {
  readonly items = input<AgentCardItem[]>([]);
  readonly currentPage = input<number>(1);
  readonly totalPages = input<number>(1);
  readonly previous = output<void>();
  readonly next = output<void>();
}
