import { Component } from '@angular/core';
import { Flight } from '../Utils/aircraft.model';
import { FlightService } from '../flight.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-rotation-editor',
  templateUrl: './rotation-editor.component.html',
  styleUrl: './rotation-editor.component.css'
})
export class RotationEditorComponent {
  aircraftFlights: Flight[] = [];
  aircraft: string = "AS1001"; //will make this dynamic

  constructor(
    private flightService: FlightService,
  ) { }

  ngOnInit(): void {
    this.flightService.getAircraftFlights().subscribe(flights => {
      this.aircraftFlights = flights;
    });
  }

  onRemoveClick(flight: Flight): void {
    this.flightService.removeFlightFromRotation(flight);
  }
}
