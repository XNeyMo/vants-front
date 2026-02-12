import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subsubtitle } from './subsubtitle';

describe('Subsubtitle', () => {
  let component: Subsubtitle;
  let fixture: ComponentFixture<Subsubtitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Subsubtitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Subsubtitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the subsubtitle text', () => {
    fixture.componentRef.setInput('text', 'Initiator');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Initiator');
  });
});
