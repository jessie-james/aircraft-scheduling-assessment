import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FlightService } from '../flight.service';
import { Flight } from '../Utils/aircraft.model';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit {
  flights: Flight[] = [];
  aircraftFlights: Flight[] = [];

  constructor(
    private dataService: DataService,
    private flightService: FlightService,
  ) {}

  ngOnInit(): void {
    this.dataService.getAllFlights().subscribe((flights) => {
      this.flights = flights;
    });

    this.dataService.getSpecificFlights('AS1001').subscribe(flights => { 
      this.aircraftFlights = [flights];
    });
  }
 
  onaddToRotation(flight: Flight) {
      this.flightService.addFlightToRotation(flight);
  }
}