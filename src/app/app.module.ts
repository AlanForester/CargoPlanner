import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ShipmentService } from './shipment.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HomeComponent } from './home/home.component';
import { ShipmentDetailComponent } from './shipment-detail/shipment-detail.component';
import { SearchComponent } from './search/search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
	declarations: [
		AppComponent,
		SidenavComponent,
		ToolbarComponent,
		HomeComponent,
		ShipmentDetailComponent,
		SearchComponent,
		MessagesComponent,
		PageNotFoundComponent,
		FilterPipe,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatListModule,
		MatSidenavModule,
		MatButtonModule,
		MatIconModule,
		MatFormFieldModule,
		MatToolbarModule,
		FlexLayoutModule,
		HttpClientModule,
		MatDialogModule,
		MatSnackBarModule,
	],
	providers: [
		MessageService, 
		ShipmentService,
		{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
