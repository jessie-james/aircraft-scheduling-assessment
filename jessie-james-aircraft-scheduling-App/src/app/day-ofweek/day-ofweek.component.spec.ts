import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOfweekComponent } from './day-ofweek.component';

describe('DayOfweekComponent', () => {
  let component: DayOfweekComponent;
  let fixture: ComponentFixture<DayOfweekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayOfweekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayOfweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
