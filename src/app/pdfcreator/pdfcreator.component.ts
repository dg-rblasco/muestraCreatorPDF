import { Component, OnInit } from '@angular/core';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'pdfcreator',
  templateUrl: './pdfcreator.component.html',
  styleUrls: ['./pdfcreator.component.css']
})
export class PDFcreatorComponent implements OnInit {
    public value: string = 'chinchulin come chimichangas a modo canibal';
    public width: number = 0.3;
    public height: number = 20;
  constructor() {
  }
    public captureScreen()
    {
        var data = document.getElementById('contentToConvert');
        html2canvas(data).then(canvas => {
            // Few necessary setting options
            let imgWidth = 50;
            let imgHeight = canvas.height * imgWidth / canvas.width;

            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jspdf(
                'p',  //p --> portrait, l --> landskape
                'mm', // mm, cm, in
                'a6' // A4, A3 size page of PDF
            );
            let positionY = 0;
            let positionX = 0;
            pdf.addImage(contentDataURL, 'PNG', positionX, positionY, imgWidth, imgHeight);
            pdf.addImage(contentDataURL, 'PNG', positionX, positionY+imgHeight, imgWidth, imgHeight);
            pdf.save('nombreChinchulinPowerRangers.pdf'); // Generated PDF
        });
    }

  ngOnInit() {}

}
