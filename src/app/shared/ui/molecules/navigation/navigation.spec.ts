import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink, RouterLinkActive } from '@angular/router';
import { provideStore, Store } from '@ngrx/store';

import { Navigation } from './navigation';
import { Link } from '../../atoms/link/link';
import { TranslocoPipeMock } from '../../../../i18n/transloco-pipe.mock';
import { favoritesFeature } from '../../../../features/agents/state/favorites/favorites.reducer';
import { favoritesActions } from '../../../../features/agents/state/favorites/favorites.actions';

describe('Navigation', () => {
  let component: Navigation;
  let fixture: ComponentFixture<Navigation>;

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
      imports: [Navigation],
      providers: [provideRouter([]), provideStore({ [favoritesFeature.name]: favoritesFeature.reducer })]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render default navigation items', () => {
    const links = fixture.nativeElement.querySelectorAll('app-link');
    expect(links.length).toBe(2);
  });

  it('should render labels from translation keys', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('nav.agents');
    expect(element.textContent).toContain('nav.favorites');
  });

  it('should render icons for each item', () => {
    const icons = fixture.nativeElement.querySelectorAll('svg');
    expect(icons.length).toBe(2);
  });

  it('should render favorites badge when count is greater than zero', () => {
    const store = TestBed.inject(Store);
    store.dispatch(
      favoritesActions.add({
        agent: {
          id: '1',
          name: 'Sage',
          role: 'Sentinel',
          roleIconUrl: '/icons/role.png',
          imageUrl: '/icons/agent.png'
        }
      })
    );

    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('[badge]') as HTMLElement;
    expect(badge).toBeTruthy();
    expect(badge.textContent).toContain('1');
  });
});
