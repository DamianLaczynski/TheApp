import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDragableCardComponent } from './task-dragable-card.component';

describe('TaskDragableCardComponent', () => {
  let component: TaskDragableCardComponent;
  let fixture: ComponentFixture<TaskDragableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDragableCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDragableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
