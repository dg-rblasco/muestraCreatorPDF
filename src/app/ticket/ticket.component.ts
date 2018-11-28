import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  public rows = [];
  public formConf = {};
  public colums = [];

  @Input() objTicket: any;
  @Output() loadForm: EventEmitter<object> = new EventEmitter<object>();

  constructor() {
  }

  ngOnInit() {
      this.colums = Array(this.objTicket.number_columns).fill().map((x,i)=>i); // [0,1,2,3,4]
      this.rows = Array(this.objTicket.number_rows).fill().map((x,i)=>i); // [0,1,2,3,4]
  }

  clickTrigger() {
    this.loadForm.emit(this.formConf)
  }

}