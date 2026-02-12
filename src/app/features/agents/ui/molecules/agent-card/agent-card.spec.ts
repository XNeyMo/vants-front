import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCard } from './agent-card';

describe('AgentCard', () => {
  let component: AgentCard;
  let fixture: ComponentFixture<AgentCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the card content', () => {
    fixture.componentRef.setInput('name', 'Gekko');
    fixture.componentRef.setInput('role', 'Initiator');
    fixture.componentRef.setInput('roleIconUrl', '/icons/role.png');
    fixture.componentRef.setInput('imageUrl', '/icons/agent.png');
    fixture.componentRef.setInput('href', '/agents/gekko');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Gekko');
    expect(element.textContent).toContain('Initiator');
    expect(element.querySelector('a')?.getAttribute('href')).toBe('/agents/gekko');
  });
});
