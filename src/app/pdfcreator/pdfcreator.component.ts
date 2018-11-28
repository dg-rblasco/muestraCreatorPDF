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
    public numberOfTickets:number = 4;
    public tickets_almacenados = []; //este guardará las instanciaciones (objs) de la clase ticket
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
    }
    public captureScreen() {
        var data = document.getElementById('contentToConvert');
        html2canvas(data).then(canvas => {
            // Few necessary setting options
            let imgWidth:number;
            this.sizes.map((sizeNow)=>{
               if(sizeNow.size === this.sizePrint)
                   imgWidth = sizeNow.dimensions.width;
            });
            //let imgWidth = 210;
            let imgHeight = canvas.height * imgWidth / canvas.width;

            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jspdf(
                this.orientation_s,  //p --> portrait, l --> landskape
                'mm', // mm, cm, in
                this.sizePrint // A4, A3 size page of PDF
            );
            let positionY = 0;
            let positionX = 0;
            pdf.addImage(contentDataURL, 'PNG', positionX, positionY, imgWidth, imgHeight);
            //para añadir una nueva pagina
            /*pdf.addPage();
            pdf.addImage(contentDataURL, 'PNG', positionX, positionY, imgWidth, imgHeight,"", "FAST");*/
            pdf.save('nombreChinchulinPowerRangers.pdf'); // Generated PDF
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
        //conseguimos las dimensiones de cada una de las etiquetas
        // OJO --> cualquier etiqueta se ha de calcular con un height +0.6 y un with +0.6 por los margenes
        this.tickets_almacenados.map( (ticketNow) => {
            // hay que ir sumando los anchos en cada linea hasta comprobar que se ha pasado
            // en cada linea se comproborá la etiqueta más larga --> sobreescribiendo una variable que tendrá el height más larog
            // en cada salto de linea iremos sumando los altos --> si alguno se pasa abrimos nueva pagina
            // si un alto es más alto que la propia pagina --> se queda sola en la pagina y será cortada por donde sobresalga
            
        });
    }

    ngOnInit() {}

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