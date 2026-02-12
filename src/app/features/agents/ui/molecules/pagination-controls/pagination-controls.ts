import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Button } from '../../../../../shared/ui/atoms/button/button';

@Component({
  selector: 'app-pagination-controls',
  imports: [Button],
  templateUrl: './pagination-controls.html',
  styleUrl: './pagination-controls.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationControls {
  readonly currentPage = input<number>(1);
  readonly totalPages = input<number>(1);

  readonly previous = output<void>();
  readonly next = output<void>();

  readonly isFirst = computed(() => this.currentPage() <= 1);
  readonly isLast = computed(() => this.currentPage() >= this.totalPages());

  onPrevious(): void {
    if (this.isFirst()) {
      return;
    }
    this.previous.emit();
  }

  onNext(): void {
    if (this.isLast()) {
      return;
    }
    this.next.emit();
  }
}
