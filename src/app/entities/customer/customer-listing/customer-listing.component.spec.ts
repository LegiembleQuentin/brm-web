import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListingComponent } from './customer-listing.component';

describe('CustomerListingComponent', () => {
  let component: CustomerListingComponent;
  let fixture: ComponentFixture<CustomerListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerListingComponent]
    });
    fixture = TestBed.createComponent(CustomerListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
