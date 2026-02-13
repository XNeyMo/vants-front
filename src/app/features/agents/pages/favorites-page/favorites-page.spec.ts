import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideRouter, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { provideStore } from '@ngrx/store';

import { FavoritesPage } from './favorites-page';
import { Link } from '../../../../shared/ui/atoms/link/link';
import { Navigation } from '../../../../shared/ui/molecules/navigation/navigation';
import { TranslocoPipeMock } from '../../../../i18n/transloco-pipe.mock';
import { Header } from '../../../../shared/ui/organisms/header/header';
import { Hero } from '../../ui/molecules/hero/hero';
import { Title } from '../../../../shared/ui/atoms/title/title';
import { Description } from '../../../../shared/ui/atoms/description/description';
import { AgentsGrid } from '../../ui/organisms/agents-grid/agents-grid';
import { GetFavoriteAgentsUseCase } from '../../core/get-favorite-agents.use-case';
import { favoritesFeature } from '../../state/favorites/favorites.reducer';

describe('FavoritesPage', () => {
  let component: FavoritesPage;
  let fixture: ComponentFixture<FavoritesPage>;

  beforeEach(async () => {
    TestBed.overrideComponent(Link, {
      set: {
        imports: [RouterLink, RouterLinkActive, TranslocoPipeMock]
      }
    });

    TestBed.overrideComponent(Navigation, {
      set: {
        imports: [Link, TranslocoPipeMock]
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
      imports: [FavoritesPage],
      providers: [
        provideRouter([]),
        provideStore({ [favoritesFeature.name]: favoritesFeature.reducer }),
        {
          provide: GetFavoriteAgentsUseCase,
          useValue: { execute: () => of([]) }
        },
        {
          provide: TranslocoService,
          useValue: {
            getActiveLang: () => 'en',
            setActiveLang: (_lang: string) => undefined
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header and hero copy', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('app-header')).toBeTruthy();
    expect(element.querySelector('app-hero')).toBeTruthy();
    expect(element.querySelector('[empty-state]')).toBeTruthy();
    expect(element.textContent).toContain('agents.hero.favorites.title');
    expect(element.textContent).toContain('agents.hero.favorites.highlight');
  });
});
