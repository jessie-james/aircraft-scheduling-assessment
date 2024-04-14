import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftTimeLineBarComponent } from './aircraft-time-line-bar.component';

describe('AircraftTimeLineBarComponent', () => {
  let component: AircraftTimeLineBarComponent;
  let fixture: ComponentFixture<AircraftTimeLineBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AircraftTimeLineBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AircraftTimeLineBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
