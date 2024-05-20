import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { Contact } from '../../model/contact';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../model/category';
import { CategorySelectComponent } from '../category-select/category-select.component';

type ContactForm = FormGroup<{
    firstname: FormControl<string>,
    lastname: FormControl<string>,
    email: FormControl<string>,
    birthday: FormControl<Date>,
    phoneNumber: FormControl<string>,
}>;

export type ContactFormValue = ReturnType<ContactForm['getRawValue']>;

@Component({
  selector: 'app-contact-details-side-card',
  standalone: true,
  imports: [RouterLink, DatePipe, ReactiveFormsModule, CategorySelectComponent],
  templateUrl: './contact-details-side-card.component.html',
  styleUrl: './contact-details-side-card.component.css'
})
export class ContactDetailsSideCardComponent implements OnInit, OnChanges {
  @Input() contact?: Contact;
  @Output() delate = new EventEmitter<string>();
  @Output() update = new EventEmitter<{ id: string; payload: ContactFormValue }>();

  private formBuilder = inject(NonNullableFormBuilder);

  form!: ContactForm;
  
  ngOnInit(): void {
    if(this.contact)
        {
            this.form = this.formBuilder.group({
                firstname: this.formBuilder.control<string>(this.contact.firstname),
                lastname: this.formBuilder.control<string>(this.contact.lastname),
                email: this.formBuilder.control<string>(this.contact.email, Validators.email),
                birthday: this.formBuilder.control<Date>(this.contact.birthday ? this.contact.birthday : new Date()),
                phoneNumber: this.formBuilder.control<string>(this.contact.phoneNumber ? this.contact.phoneNumber : ""),
            });
        }
        else {
          this.form = this.formBuilder.group({
            firstname: this.formBuilder.control<string>(""),
            lastname: this.formBuilder.control<string>(""),
            email: this.formBuilder.control<string>("", Validators.email),
            birthday: this.formBuilder.control<Date>(new Date()),
            phoneNumber: this.formBuilder.control<string>(""),
        });
        }
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.contact)
      {
          this.form = this.formBuilder.group({
              firstname: this.formBuilder.control<string>(this.contact.firstname),
              lastname: this.formBuilder.control<string>(this.contact.lastname),
              email: this.formBuilder.control<string>(this.contact.email, Validators.email),
              birthday: this.formBuilder.control<Date>(this.contact.birthday ? this.contact.birthday : new Date()),
              phoneNumber: this.formBuilder.control<string>(this.contact.phoneNumber ? this.contact.phoneNumber : ""),
          });
      }
  }

  updateTask() {
    // if (this.form.valid && this.task) {
    //   this.update.emit({
    //     id: this.task.id,
    //     payload: this.form.value as TaskFormValue,
    //   });
    // }
  }

  resetForm() {
    this.form.reset();
  }

  delateTask(id: string)
  {
    if(window.confirm("Are you sure?"))
      {
        this.delate.emit(id);
      }
  }
}
