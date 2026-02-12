import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink, RouterLinkActive } from '@angular/router';

import { Navigation } from './navigation';
import { Link } from '../../atoms/link/link';
import { TranslocoPipeMock } from '../../../../i18n/transloco-pipe.mock';

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
      providers: [provideRouter([])]
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
});
