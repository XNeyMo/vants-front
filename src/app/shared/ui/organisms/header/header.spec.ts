import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { provideStore } from '@ngrx/store';

import { Header } from './header';
import { Link } from '../../atoms/link/link';
import { Navigation } from '../../molecules/navigation/navigation';
import { TranslocoPipeMock } from '../../../../i18n/transloco-pipe.mock';
import { favoritesFeature } from '../../../../features/agents/state/favorites/favorites.reducer';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

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

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        provideStore({ [favoritesFeature.name]: favoritesFeature.reducer }),
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

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo, navigation, and language switcher', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('app-logo')).toBeTruthy();
    expect(element.querySelector('app-navigation')).toBeTruthy();
    expect(element.querySelector('app-language-switcher')).toBeTruthy();
  });
});
