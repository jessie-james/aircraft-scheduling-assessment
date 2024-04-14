import { Component, Input } from '@angular/core';
import { Flight } from '../Utils/aircraft.model';
import { Subscription } from 'rxjs';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-aircraft-time-line-bar',
  templateUrl: './aircraft-time-line-bar.component.html',
  styleUrl: './aircraft-time-line-bar.component.css'
})
export class AircraftTimeLineBarComponent {
  private subscription: Subscription = new Subscription();
  timelineSegments: any[] = [];

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.subscription = this.flightService.getAircraftFlights().subscribe(flights => {
      this.buildTimeline(flights);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  buildTimeline(flights: Flight[]): void {
    this.timelineSegments = [];
    let lastEndTime = 0;
    const secondsInDay = 86400;

    flights.forEach(flight => {
      let departureTime = parseInt(flight.departuretime, 10);
      let arrivalTime = parseInt(flight.arrivaltime, 10);
      if ( departureTime > lastEndTime) {
        this.timelineSegments.push({ type: 'idle', duration: departureTime - lastEndTime });
      }

      this.timelineSegments.push({ type: 'flight', duration: arrivalTime - departureTime });
      const turnaroundTime = 1200; // 20 minutes
      this.timelineSegments.push({ type: 'turnaround', duration: turnaroundTime });
      lastEndTime = arrivalTime + turnaroundTime;
    });

    if (lastEndTime < secondsInDay) {
      this.timelineSegments.push({ type: 'idle', duration: secondsInDay - lastEndTime });
    }
  }

  getSegmentWidth(duration: number, totalDuration: number = 86400): string {
    return `${(duration / totalDuration) * 100}%`;
  }
}