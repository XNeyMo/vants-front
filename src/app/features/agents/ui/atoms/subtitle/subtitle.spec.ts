import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subtitle } from './subtitle';

describe('Subtitle', () => {
  let component: Subtitle;
  let fixture: ComponentFixture<Subtitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Subtitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Subtitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the subtitle text', () => {
    fixture.componentRef.setInput('text', 'Gekko');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Gekko');
  });
});
