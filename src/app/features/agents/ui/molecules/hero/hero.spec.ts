import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero } from './hero';
import { Title } from '../../../../../shared/ui/atoms/title/title';
import { Description } from '../../../../../shared/ui/atoms/description/description';
import { TranslocoPipeMock } from '../../../../../i18n/transloco-pipe.mock';

describe('Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  beforeEach(async () => {
    TestBed.overrideComponent(Hero, {
      set: {
        imports: [Title, Description, TranslocoPipeMock]
      }
    });

    await TestBed.configureTestingModule({
      imports: [Hero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and description', () => {
    fixture.componentRef.setInput('title', 'agents.hero.dashboard.title');
    fixture.componentRef.setInput('highlight', 'agents.hero.dashboard.highlight');
    fixture.componentRef.setInput('description', 'agents.hero.dashboard.description');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('agents.hero.dashboard.title');
    expect(element.textContent).toContain('agents.hero.dashboard.highlight');
    expect(element.textContent).toContain('agents.hero.dashboard.description');
  });

  it('should support translated inputs', () => {
    fixture.componentRef.setInput('title', 'agents.hero.favorites.title');
    fixture.componentRef.setInput('highlight', 'agents.hero.favorites.highlight');
    fixture.componentRef.setInput('description', 'agents.hero.favorites.description');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('agents.hero.favorites.title');
  });
});
