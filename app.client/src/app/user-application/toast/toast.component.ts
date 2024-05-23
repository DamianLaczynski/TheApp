import { Component, Input, OnInit, inject } from '@angular/core';
import { ToastService } from './service/toast.service';
import { AsyncPipe } from '@angular/common';
import { ToastType } from './model/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit{
  private toastService = inject(ToastService);

  $toast = this.toastService.toast$;
  ToastType = ToastType;
  ngOnInit(): void {
    
  }
  
}
