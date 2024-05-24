import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerBodyComponent } from './planner-body.component';

describe('PlannerBodyComponent', () => {
  let component: PlannerBodyComponent;
  let fixture: ComponentFixture<PlannerBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannerBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlannerBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
