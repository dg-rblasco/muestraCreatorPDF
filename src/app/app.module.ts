import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PDFcreatorComponent } from './pdfcreator/pdfcreator.component';
// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PDFcreatorComponent
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
