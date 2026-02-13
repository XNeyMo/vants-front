import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsGrid } from './agents-grid';
import { AgentCard } from '../../molecules/agent-card/agent-card';
import { PaginationControls } from '../../molecules/pagination-controls/pagination-controls';

describe('AgentsGrid', () => {
  let component: AgentsGrid;
  let fixture: ComponentFixture<AgentsGrid>;

  beforeEach(async () => {
    TestBed.overrideComponent(AgentCard, {
      set: {
        template: '<button data-test="favorite" (click)="toggleFavorite.emit()"></button>'
      }
    });

    TestBed.overrideComponent(PaginationControls, {
      set: {
        template: '<button data-test="previous" (click)="previous.emit()"></button><button data-test="next" (click)="next.emit()"></button>'
      }
    });

    await TestBed.configureTestingModule({
      imports: [AgentsGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentsGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render cards for items', () => {
    fixture.componentRef.setInput('items', [
      {
        id: '1',
        name: 'Gekko',
        role: 'Initiator',
        roleIconUrl: '/icons/role.png',
        imageUrl: '/icons/agent.png',
        href: '/agents/gekko',
        delayMs: 0
      }
    ]);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('app-agent-card').length).toBe(1);
    expect(element.querySelector('app-pagination-controls')).toBeTruthy();
  });

  it('should emit toggleFavorite when a card emits', () => {
    const item = {
      id: '1',
      name: 'Gekko',
      role: 'Initiator',
      roleIconUrl: '/icons/role.png',
      imageUrl: '/icons/agent.png',
      href: '/agents/gekko',
      delayMs: 0
    };

    fixture.componentRef.setInput('items', [item]);
    fixture.detectChanges();

    const toggleSpy = vi.fn();
    component.toggleFavorite.subscribe(toggleSpy);

    const button = fixture.nativeElement.querySelector('[data-test="favorite"]') as HTMLButtonElement;
    button.click();

    expect(toggleSpy).toHaveBeenCalledWith(item);
  });

  it('should emit pagination events from controls', () => {
    const previousSpy = vi.fn();
    const nextSpy = vi.fn();

    component.previous.subscribe(previousSpy);
    component.next.subscribe(nextSpy);

    const element = fixture.nativeElement as HTMLElement;
    (element.querySelector('[data-test="previous"]') as HTMLButtonElement).click();
    (element.querySelector('[data-test="next"]') as HTMLButtonElement).click();

    expect(previousSpy).toHaveBeenCalledTimes(1);
    expect(nextSpy).toHaveBeenCalledTimes(1);
  });
});
