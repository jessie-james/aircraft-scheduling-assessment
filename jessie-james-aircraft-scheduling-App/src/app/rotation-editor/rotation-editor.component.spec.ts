import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationEditorComponent } from './rotation-editor.component';

describe('RotationEditorComponent', () => {
  let component: RotationEditorComponent;
  let fixture: ComponentFixture<RotationEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RotationEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RotationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
