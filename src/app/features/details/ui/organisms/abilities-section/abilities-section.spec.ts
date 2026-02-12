import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilitiesSection } from './abilities-section';
import { AgentAbilityModel } from '../../../models/agent-ability.model';
import { TranslocoPipeMock } from '../../../../../i18n/transloco-pipe.mock';

describe('AbilitiesSection', () => {
  let component: AbilitiesSection;
  let fixture: ComponentFixture<AbilitiesSection>;

  beforeEach(async () => {
    TestBed.overrideComponent(AbilitiesSection, {
      set: {
        imports: [TranslocoPipeMock]
      }
    });

    await TestBed.configureTestingModule({
      imports: [AbilitiesSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbilitiesSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render abilities when provided', () => {
    const abilities: AgentAbilityModel[] = [
      {
        name: 'Seize',
        description: 'Ability description',
        slot: 'Ability1',
        iconUrl: '/icons/ability.png'
      }
    ];

    fixture.componentRef.setInput('abilities', abilities);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('details.abilities');
    expect(element.textContent).toContain('Seize');
    expect(element.querySelectorAll('img').length).toBe(1);
  });

  it('should render nothing when abilities is empty', () => {
    fixture.componentRef.setInput('abilities', []);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent?.trim()).toBe('');
  });
});
