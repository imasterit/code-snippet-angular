import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountWithdrawComponent } from './account-withdraw.component';

describe('AccountWithdrawComponent', () => {
  let component: AccountWithdrawComponent;
  let fixture: ComponentFixture<AccountWithdrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountWithdrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
