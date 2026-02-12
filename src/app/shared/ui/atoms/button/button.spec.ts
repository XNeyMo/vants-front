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
});
