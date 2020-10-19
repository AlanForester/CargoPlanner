import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShipmentDetailComponent} from './shipment-detail/shipment-detail.component';
import { SearchComponent } from './search/search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: 'shipment/:id', component: ShipmentDetailComponent },
	{ path: '', component: HomeComponent },
	{ path: 'search', component: SearchComponent }, 
    {path: '', redirectTo: '', pathMatch: 'full'},
	{ path: '**', component: PageNotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true } // <-- debugging purposes only
)],
  exports: [RouterModule]
})
export class AppRoutingModule { }