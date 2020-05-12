import { Injectable } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toaster: Toaster) { }

  showToast(message, type) {
    this.toaster.open({ text: message, type: type });
  } 

}
