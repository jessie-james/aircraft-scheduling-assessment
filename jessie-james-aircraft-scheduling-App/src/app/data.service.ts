import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Aircraft, Flight } from './Utils/aircraft.model';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private aircraftsapiUrl ='https://recruiting-assessment.alphasights.com/api/aircrafts';
  private flightsapiUrl = 'https://recruiting-assessment.alphasights.com/api/flights';
  
  constructor(private http: HttpClient) {}

  getAllAircrafts(): Observable<Aircraft[]> {
    return this.http.get<Aircraft[]>(this.aircraftsapiUrl);
  }
  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.flightsapiUrl);
  }

  getSpecificAircraft(ident: string): Observable<Aircraft> {
    const url = `${this.aircraftsapiUrl}/${ident}`;
    return this.http.get<Aircraft>(url);
  }

  getSpecificFlights(ident: string): Observable<Flight> {
    const url = `${this.flightsapiUrl}/${ident}`;
    return this.http.get<Flight>(url);
  }
}
