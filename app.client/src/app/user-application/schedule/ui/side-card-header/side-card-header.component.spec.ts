import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideCardHeaderComponent } from './side-card-header.component';

describe('SideCardHeaderComponent', () => {
  let component: SideCardHeaderComponent;
  let fixture: ComponentFixture<SideCardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideCardHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
