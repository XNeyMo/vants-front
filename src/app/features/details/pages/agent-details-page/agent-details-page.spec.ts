import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

import { AgentDetailsPage } from './agent-details-page';
import { Link } from '../../../../shared/ui/atoms/link/link';
import { Navigation } from '../../../../shared/ui/molecules/navigation/navigation';
import { TranslocoPipeMock } from '../../../../i18n/transloco-pipe.mock';

describe('AgentDetailsPage', () => {
  let component: AgentDetailsPage;
  let fixture: ComponentFixture<AgentDetailsPage>;

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
      imports: [AgentDetailsPage],
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

    fixture = TestBed.createComponent(AgentDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header and page title', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('app-header')).toBeTruthy();
    expect(element.querySelector('h1')?.textContent).toContain('Agent details');
  });
});
