import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast, ToastType } from '../model/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toast = new BehaviorSubject<Toast>({type: ToastType.None, message: "Error"} as Toast);

  toast$ = this.toast.asObservable();

  setAlert(message: string)
  {
    this.toast.next({type: ToastType.Alert, message: message});
    
  }

  setError(message: string)
  {
    this.toast.next({type: ToastType.Error, message: message});
  }

  setSuccess(message: string)
  {
    this.toast.next({type: ToastType.Success, message: message});
  }

  show(time: number)
  {
    this.toast$.subscribe({next: (toast) => {

      setTimeout(() => {
        toast.type = ToastType.None;
      } , time )
    }})
  }
  
}
