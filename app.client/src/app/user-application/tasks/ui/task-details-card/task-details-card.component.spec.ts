import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsCardComponent } from './task-details-card.component';

describe('TaskDetailsCardComponent', () => {
  let component: TaskDetailsCardComponent;
  let fixture: ComponentFixture<TaskDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetailsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
