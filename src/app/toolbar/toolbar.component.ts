import { EventEmitterService } from './../event-emitter.service';
import { LocalStorageService } from './../local-storage.service';
import { Shipment } from './../../models/shipment';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() query = new EventEmitter<string>()
  @Output() action = new EventEmitter<string>()

  shipment: Shipment

  constructor(
    private eventEmitterService: EventEmitterService 
  ) { }

  ngOnInit() {
    
  }


  public find(str: string): void {
    this.query.emit(str);
  }

  public load(): void {
    this.action.emit("load");
  }

  public save(): void {
    this.eventEmitterService.callSaveShipment();  
  }
}