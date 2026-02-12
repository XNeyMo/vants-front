import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDetailsPage } from './agent-details-page';

describe('AgentDetailsPage', () => {
  let component: AgentDetailsPage;
  let fixture: ComponentFixture<AgentDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentDetailsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
