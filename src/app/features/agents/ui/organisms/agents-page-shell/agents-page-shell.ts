import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Header } from '../../../../../shared/ui/organisms/header/header';
import { Hero } from '../../molecules/hero/hero';
import { AgentsGrid, AgentCardItem } from '../agents-grid/agents-grid';

@Component({
  selector: 'app-agents-page-shell',
  imports: [Header, Hero, AgentsGrid],
  templateUrl: './agents-page-shell.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentsPageShell {
  readonly titleKey = input<string>('');
  readonly highlightKey = input<string>('');
  readonly descriptionKey = input<string>('');
  readonly items = input<AgentCardItem[]>([]);
  readonly currentPage = input<number>(1);
  readonly totalPages = input<number>(1);
  readonly isEmpty = input<boolean>(false);
  readonly previous = output<void>();
  readonly next = output<void>();
  readonly toggleFavorite = output<AgentCardItem>();
}
