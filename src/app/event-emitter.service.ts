import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';    
    
@Injectable({    
  providedIn: 'root'    
})    
export class EventEmitterService {    
    
  invokeAction = new EventEmitter<string>();    
  subsVar: Subscription;    
    
  constructor() { }    
    
  callSaveShipment() {    
    this.invokeAction.emit("save");    
  }    
}    