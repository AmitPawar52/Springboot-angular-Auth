import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { ModalData } from './modal-data';
import { VerifyLinkModalComponent } from './verify-link-modal/verify-link-modal.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MenuComponent,
    PopupModalComponent,
    VerifyLinkModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    MenuComponent,
    PopupModalComponent,
    VerifyLinkModalComponent
  ]
})
export class SharedModule { }
