import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Aircraft, Flight } from '../Utils/aircraft.model';
import { FlightService } from '../flight.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aircraft-list',
  templateUrl: './aircraft-list.component.html',
  styleUrls: ['./aircraft-list.component.css']
})
export class AircraftListComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  aircrafts: Aircraft[] = [];
  utilization: number = 0;

  constructor(private dataService: DataService, private flightService: FlightService) {}

  ngOnInit(): void {
    this.dataService.getSpecificAircraft('AS1001').subscribe((aircrafts) => {
      this.aircrafts = [aircrafts];
    });

    this.subscription = this.flightService.getAircraftFlights().subscribe(flights => {
      this.calculateUtilization(flights);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  calculateUtilization(flights: Flight[]): void {
    const secondsInDay = 86400;
    const turnaroundTime = 1200;
    let totalTimeUsed = 0;

    flights.forEach(flight => {
      let departureTime = parseInt(flight.departuretime, 10);
      let arrivalTime = parseInt(flight.arrivaltime, 10);
      totalTimeUsed += (arrivalTime - departureTime) + turnaroundTime;
    });

    this.utilization = (totalTimeUsed / secondsInDay) * 100;
  }

  // Use this function for later when you are ready to select a specific aircraft for the rotation selection
  // onSelectAircraft(ident: string) {
  //   this.flightService.loadInitialFlights(ident);
  // } 
}