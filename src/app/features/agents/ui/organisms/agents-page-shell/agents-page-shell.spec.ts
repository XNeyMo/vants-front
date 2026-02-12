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
        template: '<div data-test="agents-grid"></div>'
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
});
