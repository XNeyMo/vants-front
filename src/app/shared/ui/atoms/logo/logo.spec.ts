import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logo } from './logo';

describe('Logo', () => {
  let component: Logo;
  let fixture: ComponentFixture<Logo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Logo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the brand link', () => {
    const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute('href')).toBe('/');
    expect(anchor.textContent).toContain('Valorant');
    expect(anchor.textContent).toContain('Agents');
  });
});
