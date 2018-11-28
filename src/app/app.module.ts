import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PDFcreatorComponent } from './pdfcreator/pdfcreator.component';
// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';
import { FormsModule } from '@angular/forms';
import { TicketComponent } from './ticket/ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    PDFcreatorComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
      NgxBarcodeModule,
      FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
