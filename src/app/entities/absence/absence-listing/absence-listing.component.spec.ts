import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceListingComponent } from './absence-listing.component';

describe('AbsenceListingComponent', () => {
  let component: AbsenceListingComponent;
  let fixture: ComponentFixture<AbsenceListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbsenceListingComponent]
    });
    fixture = TestBed.createComponent(AbsenceListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
