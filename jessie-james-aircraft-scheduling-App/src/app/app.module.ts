import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AircraftListComponent } from './aircraft-list/aircraft-list.component';
import { FlightsListComponent } from './flights-list/flights-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RotationEditorComponent } from './rotation-editor/rotation-editor.component';
import { DayOfweekComponent } from './day-ofweek/day-ofweek.component';
import { AircraftTimeLineBarComponent } from './aircraft-time-line-bar/aircraft-time-line-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    AircraftListComponent,
    FlightsListComponent,
    RotationEditorComponent,
    DayOfweekComponent,
    AircraftTimeLineBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
