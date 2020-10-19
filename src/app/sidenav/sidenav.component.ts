import { async } from '@angular/core/testing';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Shipment } from './../../models/shipment';
import { LocalStorageService } from './../local-storage.service';
import { MessageService } from './../message.service';
import { ShipmentService } from './../shipment.service';
import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArrayDataSource } from '@angular/cdk/collections';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
	selector: 'sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
	@Input() filter: string
	@Input() action: EventEmitter<string>

	sidenavWidth = 15;

	selectedShipment: Shipment;

	dialogRef: MatDialogRef<LoadDialog>

	localData: Shipment[];
	constructor(private shipmentService: ShipmentService, 
		private messageService: MessageService,
		private localStorageService: LocalStorageService,
		public dialog: MatDialog,
		private router: Router,
		private snackBar: MatSnackBar,
	) { }

	ngOnInit() {
		this.localData = this.localStorageService.get("store")

		if (this.localData == null || this.localData.length == 0) { 
			this.router.navigate([''])
			this.openDialog()
		} 

		this.action.subscribe(action => {
				switch (action) {
				case "load":
					if (this.localData == null) { 
						this.messageService.add(`SidenavComponent: Open dialog ${action }`);
						this.openDialog()
					} else {
						this.openSnackBar("Success!", "Fetch shipments and save to you local storage.")
					}
				default:
					break;
			} 
			})
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
		  duration: 5000,
		});
	  }

	openDialog(): void {
		if (this.dialogRef == null || this.dialogRef.getState() == 2) {
			this.dialogRef = this.dialog.open(LoadDialog, {
				width: '250px',
			  });
		  
			  this.dialogRef.afterClosed().subscribe(result => {
				this.messageService.add(`SidenavComponent: Dialog result =${result}`);
				if (result) {
					this.getShipments()
				}
			  });
		}
	  }

	onSelect(shipment: Shipment): void {
		this.selectedShipment = shipment;
		this.messageService.add(`SidenavComponent: Selected shipment id=${shipment.id}`);
	}

	getShipments(): void {
		this.shipmentService.getShipments()
			.subscribe(shipments => { 
				this.localData = shipments
				
				if (this.localStorageService.set("store",shipments)) {
					this.openSnackBar("Success!", "Fetch shipments and save to you local storage.")
				} else {
					this.openSnackBar("Fail!", "Fetch shipments data dont happens :(")
				}

			});
	}

}

@Component({
  selector: 'load-dialog',
  template: `
 	<h1 mat-dialog-title>Confirm loading data</h1>
	<div mat-dialog-content>
	<p>Download shipment data over network?</p>
	</div>
	<div mat-dialog-actions>
	<button mat-button (click)="onNoClick()">No Thanks</button>
	<button mat-button (click)="onYesClick()">Download</button>
	</div> 
  `,
})
export class LoadDialog {
  
  constructor(
    public dialogRef: MatDialogRef<LoadDialog>) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}