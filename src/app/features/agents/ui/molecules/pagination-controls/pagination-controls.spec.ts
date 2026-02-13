import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationControls } from './pagination-controls';
import { TranslocoPipeMock } from '../../../../../i18n/transloco-pipe.mock';
import { Button } from '../../../../../shared/ui/atoms/button/button';

describe('PaginationControls', () => {
  let component: PaginationControls;
  let fixture: ComponentFixture<PaginationControls>;

  beforeEach(async () => {
    TestBed.overrideComponent(PaginationControls, {
      set: {
        imports: [Button, TranslocoPipeMock]
      }
    });

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

  it('should emit previous when not on first page', () => {
    fixture.componentRef.setInput('currentPage', 2);
    fixture.componentRef.setInput('totalPages', 3);
    fixture.detectChanges();

    const previousSpy = vi.fn();
    component.previous.subscribe(previousSpy);

    component.onPrevious();

    expect(previousSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit next when not on last page', () => {
    fixture.componentRef.setInput('currentPage', 2);
    fixture.componentRef.setInput('totalPages', 3);
    fixture.detectChanges();

    const nextSpy = vi.fn();
    component.next.subscribe(nextSpy);

    component.onNext();

    expect(nextSpy).toHaveBeenCalledTimes(1);
  });
});
