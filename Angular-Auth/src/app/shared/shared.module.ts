import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { VerifyLinkModalComponent } from './verify-link-modal/verify-link-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { NgSpinnerModule } from 'ng-bootstrap-spinner';


@NgModule({
  declarations: [
    MenuComponent,
    PopupModalComponent,
    VerifyLinkModalComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgSpinnerModule
  ],
  exports: [
    MenuComponent,
    PopupModalComponent,
    VerifyLinkModalComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
