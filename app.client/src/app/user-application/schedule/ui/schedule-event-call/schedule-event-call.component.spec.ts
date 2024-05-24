import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleEventCallComponent } from './schedule-event-call.component';

describe('ScheduleEventCallComponent', () => {
  let component: ScheduleEventCallComponent;
  let fixture: ComponentFixture<ScheduleEventCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleEventCallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduleEventCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
