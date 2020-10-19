import { EventEmitterService } from './../event-emitter.service';
import { Shipment } from './../../models/shipment';
import { LocalStorageService } from './../local-storage.service';
import { MessageService } from './../message.service';
import { ShipmentService } from './../shipment.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'shipment-detail',
  templateUrl: './shipment-detail.component.html',
  styleUrls: ['./shipment-detail.component.css'],
})

export class ShipmentDetailComponent implements OnInit {

  public shipment: Shipment
  bays: number = 0

  constructor(
    private route: ActivatedRoute,
    private shipmentService: ShipmentService,
    private location: Location,
    private messageService: MessageService,
    private localStorageService: LocalStorageService,
    private eventEmitterService: EventEmitterService,
    private snackBar: MatSnackBar,
  ) {   }

  ngOnInit() {
    
    if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokeAction.subscribe((action:string) => {  
        var locStorage: [Shipment] = this.localStorageService.get("store")
        var id = this.shipment.id
        var index = locStorage.findIndex(function(shipment, index) {
          if(shipment.id == id)
            return true;
        });
        console.log(index)
        this.replaceItemInLocalStorage(index)
        // this.saveShipment(shipment);    
      });    
    }    

    this.route.paramMap.subscribe(params => {
            var id = +params.get('id')
            var locStorage: [Shipment] = this.localStorageService.get("store")
            if (locStorage == null) {
                this.location.go('/home')
                return null
            }
            this.shipment = locStorage.find(function(shipment, index) {
              if(shipment.id == id)
                return true;
            });
            
            if (this.shipment == null) {
              this.location.go('/not_found')
              return null
            }
      
            this.calculateBays(this.shipment.boxes)
          }
        );
  }

  private saveShipment() {

  }

  public openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
		  duration: 5000,
		});
  }
  

  calculateBays(val: string)
  {
      this.shipment.boxes = val
      var total = 0
      this.shipment.boxes.split(",").forEach(val => {
      var nm = parseFloat(val) 
      if (nm > 0) {
        total += nm
      }
    })
    this.bays = this.div(total, 10);
    this.messageService.add(`calculateBays: Bays =${ this.bays }`);
  }

  private div(val: any, by: any): number{
    return (val - val % by) / by;
  }

  private replaceItemInLocalStorage(index: number) {
    var locStorage: [Shipment] = this.localStorageService.get("store")
    if (index > -1) {
      locStorage.splice(index, 1);
    }
    locStorage[index] = this.shipment
    this.localStorageService.set("store",locStorage)
    this.openSnackBar(`${this.shipment.name} - has been saved in localstorage.`,"Success!")
    return locStorage;
  }

}