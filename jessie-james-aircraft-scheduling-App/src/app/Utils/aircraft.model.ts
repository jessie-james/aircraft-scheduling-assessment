export interface Aircraft {
 ident:string;
 type:string;
 economySeats:string;
 base:string;
}
  

  export interface Flight {
    readable_departure:string;
    ident:string;
    origin:string;
    arrivaltime:string;
    destination:string;
    readable_arrival:string;
    departuretime:string;
  }
  

  export interface Rotation {
    aircraftId: string;
    flights: Flight[];
  }