import { MessageService } from './message.service';
import { Shipment } from './../models/shipment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShipmentService {
 
  private SERVER_URL = "http://localhost:3000/shipments";

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  // handleError(error: HttpErrorResponse) {
  //   let errorMessage = 'Unknown error!';
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side errors
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Server-side errors
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }

  public sendGetRequest(){
    return this.httpClient.get(this.SERVER_URL).pipe(catchError(this.handleError));
  }

  //   /** GET shipments from the server */
  getShipments(): Observable<Shipment[]> {
    this.messageService.add(`ShipmentService: fetched shipments`);
    return this.httpClient.get<Shipment[]>(this.SERVER_URL)
      .pipe(
        catchError(this.handleError<Shipment[]>('getShipments', []))
      );
  }
    

  getShipment(id: number): Observable<Shipment> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`ShipmentService: fetched shipment id=${id}`);
    return this.httpClient.get<Shipment>(this.SERVER_URL+"/"+id)
    .pipe(
      catchError(this.handleError<Shipment>('getShipment', null))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

      /** Log a ShipmentService message with the MessageService */
    private log(message: string) {
      this.messageService.add(`ShipmentService: ${message}`);
    }
}
