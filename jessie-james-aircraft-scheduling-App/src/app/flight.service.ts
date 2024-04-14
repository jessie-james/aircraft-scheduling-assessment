import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Flight } from './Utils/aircraft.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private flightsapiUrl = 'https://recruiting-assessment.alphasights.com/api/flights';
  private aircraftFlightsSubject = new BehaviorSubject<Flight[]>([]);
  private errorMessageSubject = new Subject<string>();

  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadInitialFlights(ident: string) {
    this.getSpecificFlights(ident).subscribe(
      flights => this.aircraftFlightsSubject.next(flights),
      error => console.error('Error loading specific flights', error)
    );
  }

  getSpecificFlights(ident: string): Observable<Flight[]> {
    const url = `${this.flightsapiUrl}/${ident}`;
    return this.http.get<Flight[]>(url);
  }

  getAircraftFlights(): Observable<Flight[]> {
    return this.aircraftFlightsSubject.asObservable();
  }

  addFlightToRotation(incomingflight: Flight) {
    const currentFlights = this.aircraftFlightsSubject.value;
    const isFlightInRotation = currentFlights.some(f => f.ident === incomingflight.ident);
    const updatedFlights = [...currentFlights, incomingflight];
    const lastFlight = currentFlights[currentFlights.length - 1];

    if (isFlightInRotation) {
      console.error(`Flight ${incomingflight.ident} is already in the rotation.`);
      this.errorMessageSubject.next(`Flight ${incomingflight.ident} is already in the rotation.`);
      return
    }
    if(!isFlightInRotation && (!lastFlight || lastFlight.destination === incomingflight.origin)) {
      const updatedFlights = [...currentFlights, incomingflight];
      this.aircraftFlightsSubject.next(updatedFlights);
    } else {
      console.error("The new flight's origin does not match the last flight's destination. Planes cannot teleport!")
      this.errorMessageSubject.next("The new flight's origin does not match the last flight's destination. Planes cannot teleport!");
    }
   }

   removeFlightFromRotation(flightToRemove: Flight): void {
    const currentFlights = this.aircraftFlightsSubject.value;
    const updatedFlights = currentFlights.filter(flight => flight !== flightToRemove);
    this.aircraftFlightsSubject.next(updatedFlights);
  }
   
  clearFlights() {
    this.aircraftFlightsSubject.next([]); // temporary  until we have a getFlights by data call for other dates
  }
}