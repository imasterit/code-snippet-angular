import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDepositPaypalComponent } from './account-deposit-paypal.component';

describe('AccountDepositPaypalComponent', () => {
  let component: AccountDepositPaypalComponent;
  let fixture: ComponentFixture<AccountDepositPaypalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDepositPaypalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDepositPaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
