import { Component } from '@angular/core';
import { FlightService } from '../flight.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-day-of-week',
  templateUrl: './day-ofweek.component.html',
  styleUrl: './day-ofweek.component.css'
})
export class DayOfweekComponent {
  currentDate: Date = new Date(); 
  maxDate: Date; 
  minDate: Date;
  errorMessage: string = '';
  private errorSubscription: Subscription = new Subscription;
  
  constructor(private flightService: FlightService) {
    this.maxDate = new Date(); 
    this.maxDate.setDate(this.maxDate.getDate() + 1); 
    this.minDate = new Date(); 
  }
  
  ngOnInit() {
    this.errorSubscription = this.flightService.errorMessage$.subscribe(message => {
      this.errorMessage = message;
      setTimeout(() => this.errorMessage = '', 2000);
    });
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }


  goBack() {
    if (this.isSameDay(this.currentDate, this.minDate)) {
      return; 
    }
    const newDate = new Date(this.currentDate);
    newDate.setDate(newDate.getDate() - 1);
    this.currentDate = newDate;
    this.flightService.clearFlights(); // this is only temporary until  you are saveing  schedule and you can add a property to aircrafts flights to get by date.
   //this should make a call to go back and get the previous days flights and schedule
  }

  goForward() {
    if (this.isSameDay(this.currentDate, this.maxDate)) {
      return; 
    }
    const newDate = new Date(this.currentDate);
    newDate.setDate(newDate.getDate() + 1);
    this.currentDate = newDate;
    this.flightService.clearFlights(); // this is only temporary until  you are saveing  schedule and you can add a property to aircrafts flights to get by date.
    //this should make a call to get the next day of flights and sucedules
  }

  get fullDate() {
    return this.currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

 isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
}
