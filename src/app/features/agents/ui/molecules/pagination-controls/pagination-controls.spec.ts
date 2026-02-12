import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationControls } from './pagination-controls';

describe('PaginationControls', () => {
  let component: PaginationControls;
  let fixture: ComponentFixture<PaginationControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationControls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable previous on first page', () => {
    fixture.componentRef.setInput('currentPage', 1);
    fixture.componentRef.setInput('totalPages', 3);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons[0].disabled).toBe(true);
  });

  it('should disable next on last page', () => {
    fixture.componentRef.setInput('currentPage', 3);
    fixture.componentRef.setInput('totalPages', 3);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons[1].disabled).toBe(true);
  });
});
