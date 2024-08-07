import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { UploadInvoiceComponent } from './upload-invoice/upload-invoice.component';
import { AccountFormComponent } from './accounting/account-form/account-form.component';
import {PdfViewerModule} from "ng2-pdf-viewer";
import { HttpClientModule} from "@angular/common/http";

import { AccountingComponent } from './accounting/accounting.component';
import {ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SaveAndStampComponent } from './shared/save-and-stamp/save-and-stamp.component';
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import { StampPositioningDirective } from './stamp-positioning.directive';
import {AppComponent} from "./app.component";
import {MatIcon} from "@angular/material/icon";
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    UploadInvoiceComponent,
    AccountFormComponent,
    AccountingComponent,
    SaveAndStampComponent,
    StampPositioningDirective,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatIcon,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
