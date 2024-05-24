import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTagComponent } from './contact-tag.component';

describe('ContactTagComponent', () => {
  let component: ContactTagComponent;
  let fixture: ComponentFixture<ContactTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
