import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListingComponent } from './order-listing.component';

describe('OrderListingComponent', () => {
  let component: OrderListingComponent;
  let fixture: ComponentFixture<OrderListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderListingComponent]
    });
    fixture = TestBed.createComponent(OrderListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
