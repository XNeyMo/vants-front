import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsPageShell } from './agents-page-shell';
import { Header } from '../../../../../shared/ui/organisms/header/header';
import { Hero } from '../../molecules/hero/hero';
import { Title } from '../../../../../shared/ui/atoms/title/title';
import { Description } from '../../../../../shared/ui/atoms/description/description';
import { TranslocoPipeMock } from '../../../../../i18n/transloco-pipe.mock';
import { AgentsGrid } from '../agents-grid/agents-grid';

describe('AgentsPageShell', () => {
  let component: AgentsPageShell;
  let fixture: ComponentFixture<AgentsPageShell>;

  beforeEach(async () => {
    TestBed.overrideComponent(Header, {
      set: {
        template: '<div data-test="header"></div>'
      }
    });

    TestBed.overrideComponent(Hero, {
      set: {
        imports: [Title, Description, TranslocoPipeMock]
      }
    });

    TestBed.overrideComponent(AgentsGrid, {
      set: {
        template: '<div data-test="agents-grid"></div><button data-test="previous" (click)="previous.emit()"></button><button data-test="next" (click)="next.emit()"></button><button data-test="favorite" (click)="toggleFavorite.emit({ id: \'1\', name: \'Gekko\', role: \'Initiator\', roleIconUrl: \'/icons/role.png\', imageUrl: \'/icons/agent.png\', href: \'/agents/gekko\', delayMs: 0 })"></button>'
      }
    });

    await TestBed.configureTestingModule({
      imports: [AgentsPageShell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentsPageShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero and grid', () => {
    fixture.componentRef.setInput('titleKey', 'agents.hero.dashboard.title');
    fixture.componentRef.setInput('highlightKey', 'agents.hero.dashboard.highlight');
    fixture.componentRef.setInput('descriptionKey', 'agents.hero.dashboard.description');
    fixture.componentRef.setInput('items', []);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('app-hero')).toBeTruthy();
    expect(element.querySelector('app-agents-grid')).toBeTruthy();
  });

  it('should hide the grid when empty', () => {
    fixture.componentRef.setInput('isEmpty', true);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('app-agents-grid')).toBeNull();
  });

  it('should re-emit grid events', () => {
    const previousSpy = vi.fn();
    const nextSpy = vi.fn();
    const favoriteSpy = vi.fn();

    component.previous.subscribe(previousSpy);
    component.next.subscribe(nextSpy);
    component.toggleFavorite.subscribe(favoriteSpy);

    const element = fixture.nativeElement as HTMLElement;
    (element.querySelector('[data-test="previous"]') as HTMLButtonElement).click();
    (element.querySelector('[data-test="next"]') as HTMLButtonElement).click();
    (element.querySelector('[data-test="favorite"]') as HTMLButtonElement).click();

    expect(previousSpy).toHaveBeenCalledTimes(1);
    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(favoriteSpy).toHaveBeenCalledWith({
      id: '1',
      name: 'Gekko',
      role: 'Initiator',
      roleIconUrl: '/icons/role.png',
      imageUrl: '/icons/agent.png',
      href: '/agents/gekko',
      delayMs: 0
    });
  });
});
