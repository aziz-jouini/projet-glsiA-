import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueComponent } from './continue.component';

describe('ContinueComponent', () => {
  let component: ContinueComponent;
  let fixture: ComponentFixture<ContinueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContinueComponent]
    });
    fixture = TestBed.createComponent(ContinueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
