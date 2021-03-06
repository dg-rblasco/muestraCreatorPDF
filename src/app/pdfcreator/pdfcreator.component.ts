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
    //tickets dinamicos vacios
    public numberOfTickets:number = 6;
    public tickets_almacenados = []; //este guardará las instanciaciones (objs) de la clase ticket
    //paginas del documento
    public pages: any[];
    public pdf: any;
    //son del ejemplo basico
    public value: string = 'Codebar 1';
    public value2: string = 'Codebar 2';
    public width: number = 0.3;
    public height: number = 20;
    public sizePrint: string = 'a4'
    public sizes:any[] = [
        {size:'a2',name:'A2',dimensions:{width:420,height:594}},
        {size:'a3',name:'A3',dimensions:{width:297,height:420}},
        {size:'a4',name:'A4',dimensions:{width:210,height:297}},
        {size:'a5',name:'A5',dimensions:{width:148,height:210}},
        {size:'a6',name:'A6',dimensions:{width:105,height:148}}
    ];
    public orientation_s = 'p';
    public orientations:any[] = [{orientation:'p',name:'Portrait'},{orientation:'l',name:'Landskape'}];
    constructor(private lazyLoad: LazyLoadingLibraryServiceService) {
        //me falta la ruta local del proyecto para html2canvas y jspdf
        /*this.lazyLoad.loadJs('https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.min.js').subscribe(() => {
            console.log("¡Rayos y retruecanos! ¡Ha funcionado!");
        });*/
    }
    public captureScreen() {
        //recogemos las paginas del preview
        var dataPages = document.getElementsByClassName('page_preview');
        let contador = 0;
        let _this = this;
        //construimos el pdf object
        let pdf = new jspdf(
            this.orientation_s,  //p --> portrait, l --> landskape
            'mm', // mm, cm, in
            this.sizePrint // A4, A3 size page of PDF
        );
        //escribimos el pdf
        Array.prototype.forEach.call(dataPages, function (dataPage, index) {
            html2canvas(dataPage).then(page => {
                //asignamos el ancho de la imagen
                let imgWidth: number;
                _this.sizes.map((sizeNow) => {
                    if (sizeNow.size === _this.sizePrint)
                        imgWidth = sizeNow.dimensions.width;
                });
                let imgHeight = page.height * imgWidth / page.width; //ahora viene el ancho
                //construimos la imagen
                const URLpagePNG = page.toDataURL('image/png');
                console.log('Esta es la url de la imagen ', URLpagePNG);
                //gestionamos si hace falta otra pagina
                if (contador !== 0) {
                    pdf.addPage();
                }
                contador++;
                //le damos los datos
                let positionY = 0;
                let positionX = 0;
                pdf.addImage(URLpagePNG, 'PNG', positionX, positionY, imgWidth, imgHeight, "", "FAST");
                if(typeof dataPages[index+1] === 'undefined'){
                    pdf.save('nombreChinchulinPowerRangers.pdf'); // Generated PDF
                }
            });
        });
    }

    /**
     * Se calcula la disposición de etiquetas para que no se salgan fuera de una pagina.
     */
    public buildArrayPages(){
        //conseguimos las dimensiones del documento
        let dimensions = this.getSizePage(true);
        //paginas almacenadas en este array
        let pagesPDF = [];
        //control de pagina y linea
        let pageNow =[];
        let lineNow = [];
        var lineWidth = 0;
        let lineHeight = 0;
        let pageOcupedHeight = 0;
        //conseguimos las dimensiones de cada una de las etiquetas
        // OJO --> cualquier etiqueta se ha de calcular con un height +0.6 y un with +0.6 por los margenes
        this.tickets_almacenados.map( (ticketNow, i) => {
            //conseguir el ancho y el alto del ticket
            let widthTicket = ticketNow.width;
            let heightTicket = ticketNow.height;
            //si la imagen es más ancha que la propia hoja se quedará sola ocupando esa linea
            if(lineWidth + widthTicket < dimensions.width){
                // hay que ir sumando los anchos en cada linea hasta comprobar que se ha pasado
                lineNow.push(ticketNow);
                lineWidth += widthTicket + 0.6;
                // en cada linea se comproborá la etiqueta más larga --> sobreescribiendo una variable que tendrá el height más largo
                if(heightTicket > lineHeight){
                    lineHeight = heightTicket + 0.6;
                }
            }else {
                //hay que hacer un salto de linea
                pageOcupedHeight += lineHeight; // en cada salto de linea iremos sumando los altos
                this.setTicketsToLineAtThePage(pageNow,lineNow);
                //reseteamos las variables de la linea
                lineNow = [ticketNow];
                lineHeight = heightTicket + 0.6;
                lineWidth = widthTicket + 0.6;
            }
            // si un alto es más alto que la propia pagina --> se queda sola en la pagina y será cortada por donde sobresalga
            if(pageOcupedHeight + heightTicket > dimensions.height){ // --> si alguno se pasa abrimos nueva pagina
                //hay que hacer un salto de pagina
                pagesPDF.push(pageNow);
                pageNow = [];
                pageOcupedHeight = 0;
            }
            //hay que comprobar que no se quede fuera la última pagina
            if(typeof this.tickets_almacenados[i + 1] === 'undefined'){
                //si es la ultima pasada de los tickets pusheamos en pagesPDF
                this.setTicketsToLineAtThePage(pageNow,lineNow);
                pagesPDF.push(pageNow);
            }
        });
        this.pages = pagesPDF;
    }

    private setTicketsToLineAtThePage(pageNow,lineNow){
        lineNow.map( (ticketNow) => {
            pageNow.push(ticketNow);
        });
    }

    ngOnInit() {
        //aquí declaro los objs en tickets_almacenados
        for (let NewTicketIDLocal = 0; NewTicketIDLocal < this.numberOfTickets; NewTicketIDLocal ++){
            let idLocal = NewTicketIDLocal+1;
            let randomType = Math.floor(Math.random() * (4 - 1)) + 1;
            this.tickets_almacenados.push(
                new Ticket(
                    3,
                    3,
                    'Ticket_'+idLocal,
                    'tipo'+randomType,
                    {width:90,height:40}
                )
            );
        }
        //ahora declaro las paginas en base a los tickets generados
        this.buildArrayPages();
    }

    getSizePage(get_only_number:boolean = false){
        let setW = 0;
        let setH = 0;
            //leemos su height y su width
            this.sizes.map((sizeNow)=>{
                if(sizeNow.size === this.sizePrint){
                    if(this.orientation_s === 'p'){
                        setW = sizeNow.dimensions.width;
                        setH = sizeNow.dimensions.height;
                    }else{
                        setH = sizeNow.dimensions.width;
                        setW = sizeNow.dimensions.height;
                    }
                }
            });
            //retonarmos el valor
            if(get_only_number === true)
                return {width:setW,height:setH};
            else
                return {width:setW+'mm',height:setH+'mm'};
    }

    loadForm(data){
        alert(data);
    }
}

class Ticket{
    public number_columns:number;
    public number_rows:number;
    public value_codebar:string;
    public type_ticket:string;
    public width: number;
    public height: number;
    constructor(number_columns:number,number_rows:number,value_codebar:string,type_ticket:string,sizeTicket:object = {width:90,height:40}){
        this.number_columns = number_columns;
        this.number_rows = number_rows;
        this.value_codebar = value_codebar;
        this.type_ticket = type_ticket;
        this.width = sizeTicket['width'];
        this.height = sizeTicket['height'];
    }
}