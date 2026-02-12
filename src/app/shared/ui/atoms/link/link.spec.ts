import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink, RouterLinkActive } from '@angular/router';

import { Link } from './link';
import { TranslocoPipeMock } from '../../../../i18n/transloco-pipe.mock';

describe('Link', () => {
  let component: Link;
  let fixture: ComponentFixture<Link>;

  beforeEach(async () => {
    TestBed.overrideComponent(Link, {
      set: {
        imports: [RouterLink, RouterLinkActive, TranslocoPipeMock]
      }
    });

    await TestBed.configureTestingModule({
      imports: [Link],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Link);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the translated label when labelKey is set', () => {
    fixture.componentRef.setInput('labelKey', 'nav.agents');
    fixture.detectChanges();

    const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(anchor.textContent).toContain('nav.agents');
  });

  it('should render the raw label when labelKey is null', () => {
    fixture.componentRef.setInput('labelKey', null);
    fixture.componentRef.setInput('label', 'Agentes');
    fixture.detectChanges();

    const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(anchor.textContent).toContain('Agentes');
  });

  it('should use inactive styles when link is not active', () => {
    const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(anchor.className).toContain('text-muted-foreground');
  });
});
