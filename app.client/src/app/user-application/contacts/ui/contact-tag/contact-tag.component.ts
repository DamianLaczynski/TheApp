import { Component, Input } from '@angular/core';
import { Category } from '../../model/category';

@Component({
  selector: 'app-contact-tag',
  standalone: true,
  imports: [],
  templateUrl: './contact-tag.component.html',
  styleUrl: './contact-tag.component.css'
})
export class ContactTagComponent {
@Input({required: true}) category!:Category;
}
