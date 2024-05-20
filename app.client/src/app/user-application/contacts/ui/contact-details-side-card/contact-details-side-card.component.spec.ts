import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailsSideCardComponent } from './contact-details-side-card.component';

describe('ContactDetailsSideCardComponent', () => {
  let component: ContactDetailsSideCardComponent;
  let fixture: ComponentFixture<ContactDetailsSideCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactDetailsSideCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactDetailsSideCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
