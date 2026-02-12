import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the label when provided', () => {
    fixture.componentRef.setInput('label', 'Guardar');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('span')?.textContent).toContain('Guardar');
  });

  it('should hide the label for icon-only variant', () => {
    fixture.componentRef.setInput('label', 'Solo icono');
    fixture.componentRef.setInput('variant', 'icon-only');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('span')).toBeNull();
  });

  it('should reflect type and disabled inputs', () => {
    fixture.componentRef.setInput('type', 'submit');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.type).toBe('submit');
    expect(button.disabled).toBe(true);
  });

  it('should render pagination variant with label', () => {
    fixture.componentRef.setInput('variant', 'pagination');
    fixture.componentRef.setInput('label', 'Siguiente');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Siguiente');
  });

  it('should render back-link as anchor', () => {
    fixture.componentRef.setInput('variant', 'back-link');
    fixture.componentRef.setInput('label', 'Volver');
    fixture.componentRef.setInput('href', '/');
    fixture.detectChanges();

    const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute('href')).toBe('/');
    expect(anchor.textContent).toContain('Volver');
  });

  it('should reflect pressed state for favorite variant', () => {
    fixture.componentRef.setInput('variant', 'favorite');
    fixture.componentRef.setInput('label', 'Favorite');
    fixture.componentRef.setInput('pressed', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.className).toContain('glow-red');
  });
});
