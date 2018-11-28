import { Component, OnInit } from '@angular/core';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import { LazyLoadingLibraryServiceService } from '../services/lazy-loading-library-service.service';

@Component({
  selector: 'pdfcreator',
  templateUrl: './pdfcreator.component.html',
  styleUrls: ['./pdfcreator.component.css']
})
export class PDFcreatorComponent implements OnInit {
    public value: string = 'chinchulin come chimichangas a modo canibal';
    public value2: string = 'Who are you gonna call?! Ghostbuster!!';
    public width: number = 0.3;
    public height: number = 20;
    constructor(private lazyLoad: LazyLoadingLibraryServiceService) {
        //me falta la ruta local del proyecto para html2canvas y jspdf
        /*this.lazyLoad.loadJs('https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.min.js').subscribe(() => {
            console.log("¡Rayos y retruecanos! ¡Ha funcionado!");
        });*/
    }
    public captureScreen() {
        var data = document.getElementById('contentToConvert');
        html2canvas(data).then(canvas => {
            // Few necessary setting options
            let imgWidth = 100;
            let imgHeight = canvas.height * imgWidth / canvas.width;

            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jspdf(
                'p',  //p --> portrait, l --> landskape
                'mm', // mm, cm, in
                'a2' // A4, A3 size page of PDF
            );
            let positionY = 0;
            let positionX = 0;
            pdf.addImage(contentDataURL, 'PNG', positionX, positionY, imgWidth, imgHeight);
            //pdf.addImage(contentDataURL, 'PNG', positionX, positionY+imgHeight, imgWidth, imgHeight);
            pdf.save('nombreChinchulinPowerRangers.pdf'); // Generated PDF
        });
    }

  ngOnInit() {}

}
