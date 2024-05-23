import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject
} from '@angular/core';
import { Contact, CreateContactPayload } from '../../model/contact';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CategorySelectComponent,
} from '../category-select/category-select.component';
import { FindContactPipe } from '../../utils/filter-by-status.pipe';
import { CategoryForm, CategoryFormValue } from '../../model/category';

type ContactForm = FormGroup<{
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  email: FormControl<string>;
  birthday: FormControl<Date | null>;
  phoneNumber: FormControl<string>;
}>;

export type ContactFormValue = ReturnType<ContactForm['getRawValue']>;

@Component({
  selector: 'app-contact-details-side-card',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    ReactiveFormsModule,
    CategorySelectComponent,
    AsyncPipe,
    FindContactPipe,
  ],
  templateUrl: './contact-details-side-card.component.html',
  styleUrl: './contact-details-side-card.component.css',
})
export class ContactDetailsSideCardComponent implements OnInit, OnChanges {
  @Input() contact?: Contact;
  @Output() close = new EventEmitter();
  @Output() delate = new EventEmitter<string>();
  @Output() update = new EventEmitter<{
    id: string;
    contactFormValue: ContactFormValue;
    categoryFormValue: CategoryFormValue;
  }>();
  @Output() create = new EventEmitter<{contactFormValue: ContactFormValue;
    categoryFormValue: CategoryFormValue;}>();

  private formBuilder = inject(NonNullableFormBuilder);
  private datePipe = inject(DatePipe);

  contactForm: ContactForm = this.formBuilder.group({
    firstname: this.formBuilder.control<string>('', Validators.required),
    lastname: this.formBuilder.control<string>('', Validators.required),
    email: this.formBuilder.control<string>('', [Validators.email, Validators.required]),
    birthday: this.formBuilder.control<Date | null>(new Date(Date.toString())),
    phoneNumber: this.formBuilder.control<string>('', Validators.pattern("[0-9]{9}")),
  });

  categoryForm: CategoryForm = this.formBuilder.group({
    supercategory: this.formBuilder.control<string>(''),
    category: this.formBuilder.control<string>(''),
  });

  ngOnInit(): void {
    this.initFormsValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initFormsValue();
  }

  /**
   * Init forms values if contact is passed
   */
  private initFormsValue() {
    if (this.contact) {
      const contactFormValue: ContactFormValue = {
        firstname: this.contact.firstname,
        lastname: this.contact.lastname,
        email: this.contact.email,
        birthday: this.contact.birthday || new Date(Date.toString()),
        phoneNumber: this.contact.phoneNumber || '',
      };

      this.contactForm.setValue(contactFormValue);

      //TODO create comment describing how it works
      if (this.contact.category) {
        const categoryFormValue: CategoryFormValue = {
          category: this.contact.category.superCategory
            ? this.contact.category.id
            : '',
          supercategory: this.contact.category.superCategory
            ? this.contact.category.superCategory.id
            : this.contact.category.id,
        };

        this.categoryForm.setValue(categoryFormValue);
      }
    }
  }

  submit() 
  {
    if(this.contact)
      {
        if(this.contactForm.valid && this.categoryForm.valid)
          {
            console.log(this.contactForm.value)
            console.log(this.categoryForm.value)
            this.update.emit({id: this.contact.id, contactFormValue: this.contactForm.getRawValue(), categoryFormValue: this.categoryForm.getRawValue()})
          }
      }
      else {
        if(this.contactForm.valid && this.categoryForm.valid)
          {
             this.create.emit({contactFormValue: this.contactForm.getRawValue(), categoryFormValue: this.categoryForm.getRawValue()})
          }
      }
  }

  discard() {
    this.contactForm.reset();
    this.categoryForm.reset();
  }
}
