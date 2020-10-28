import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPaymentMethodsComponent } from './account-payment-methods.component';

describe('AccountPaymentMethodsComponent', () => {
  let component: AccountPaymentMethodsComponent;
  let fixture: ComponentFixture<AccountPaymentMethodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPaymentMethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPaymentMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
