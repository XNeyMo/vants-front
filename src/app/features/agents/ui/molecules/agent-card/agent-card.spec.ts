import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

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
    expect(element.querySelector('app-button')).toBeTruthy();
    const roleIcon = element.querySelector('img[alt="Initiator"]') as HTMLImageElement;
    expect(roleIcon?.getAttribute('src')).toBe('/icons/role.png');
  });

  it('should emit toggleFavorite when the favorite button is clicked', () => {
    const toggleSpy = vi.fn();
    component.toggleFavorite.subscribe(toggleSpy);

    const button = fixture.debugElement.query(By.css('app-button'));
    button.triggerEventHandler('click', new MouseEvent('click'));

    expect(toggleSpy).toHaveBeenCalledTimes(1);
  });
});
