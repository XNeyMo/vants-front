import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Title } from './title';

describe('Title', () => {
  let component: Title;
  let fixture: ComponentFixture<Title>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Title]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Title);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and highlight', () => {
    fixture.componentRef.setInput('text', 'SELECCIONA TU');
    fixture.componentRef.setInput('highlight', 'AGENTE');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('SELECCIONA TU');
    expect(element.textContent).toContain('AGENTE');
  });
});
