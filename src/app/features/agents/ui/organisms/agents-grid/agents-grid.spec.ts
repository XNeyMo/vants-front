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
        template: '<div data-test="agent-card"></div>'
      }
    });

    TestBed.overrideComponent(PaginationControls, {
      set: {
        template: '<div data-test="pagination"></div>'
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
});
