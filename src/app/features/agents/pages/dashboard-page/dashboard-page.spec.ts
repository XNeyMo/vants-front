import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

import { DashboardPage } from './dashboard-page';
import { Link } from '../../../../shared/ui/atoms/link/link';
import { Navigation } from '../../../../shared/ui/molecules/navigation/navigation';
import { TranslocoPipeMock } from '../../../../i18n/transloco-pipe.mock';
import { Header } from '../../../../shared/ui/organisms/header/header';
import { Hero } from '../../ui/molecules/hero/hero';
import { Title } from '../../ui/atoms/title/title';
import { Description } from '../../ui/atoms/description/description';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;

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


    await TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [
        provideRouter([]),
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

    fixture = TestBed.createComponent(DashboardPage);
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
    expect(element.textContent).toContain('agents.hero.dashboard.title');
    expect(element.textContent).toContain('agents.hero.dashboard.highlight');
  });
});
