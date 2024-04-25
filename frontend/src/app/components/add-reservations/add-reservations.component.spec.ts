import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReservationsComponent } from './add-reservations.component';

describe('AddReservationsComponent', () => {
  let component: AddReservationsComponent;
  let fixture: ComponentFixture<AddReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddReservationsComponent]
    });
    fixture = TestBed.createComponent(AddReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
