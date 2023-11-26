import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyTokenComponent } from './verify-token.component';

describe('VerifyTokenComponent', () => {
  let component: VerifyTokenComponent;
  let fixture: ComponentFixture<VerifyTokenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyTokenComponent]
    });
    fixture = TestBed.createComponent(VerifyTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
