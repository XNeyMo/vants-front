import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideRouter, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

import { AgentDetailsPage } from './agent-details-page';
import { Link } from '../../../../shared/ui/atoms/link/link';
import { Navigation } from '../../../../shared/ui/molecules/navigation/navigation';
import { TranslocoPipeMock } from '../../../../i18n/transloco-pipe.mock';
import { AgentDetailsModel } from '../../models/agent-details.model';
import { Header } from '../../../../shared/ui/organisms/header/header';
import { AbilitiesSection } from '../../ui/organisms/abilities-section/abilities-section';
import { Button } from '../../../../shared/ui/atoms/button/button';

describe('AgentDetailsPage', () => {
  let component: AgentDetailsPage;
  let fixture: ComponentFixture<AgentDetailsPage>;

  beforeEach(async () => {
    TestBed.overrideComponent(AgentDetailsPage, {
      set: {
        imports: [Header, Button, AbilitiesSection, TranslocoPipeMock]
      }
    });

    TestBed.overrideComponent(Header, {
      set: {
        template: '<div data-test="header"></div>'
      }
    });

    TestBed.overrideComponent(AbilitiesSection, {
      set: {
        template: '<div data-test="abilities"></div>'
      }
    });

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
          provide: ActivatedRoute,
          useValue: {
            data: of({
              agentDetails: {
                uuid: 'agent-1',
                displayName: 'Sage',
                fullPortraitUrl: 'https://cdn.example.com/sage.png',
                description: 'Healer agent',
                backgroundGradientColors: ['0f172a', '1e293b'],
                role: { name: 'Sentinel', iconUrl: '/icons/role.png' },
                abilities: []
              } satisfies AgentDetailsModel
            })
          }
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
    expect(element.querySelector('h1')?.textContent).toContain('Sage');
  });

  it('should toggle favorite state when button clicked', () => {
    const button = fixture.nativeElement.querySelector(
      'button[aria-label="Agregar a favoritos"]'
    ) as HTMLButtonElement;
    expect(button).toBeTruthy();
    expect(button.getAttribute('aria-pressed')).toBeNull();

    button.click();
    fixture.detectChanges();

    const pressedButton = fixture.nativeElement.querySelector(
      'button[aria-label="Agregar a favoritos"]'
    ) as HTMLButtonElement;
    expect(pressedButton.getAttribute('aria-pressed')).toBe('true');
  });
});
