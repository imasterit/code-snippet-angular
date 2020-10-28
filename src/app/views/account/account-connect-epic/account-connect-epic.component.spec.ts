import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountConnectEpicComponent } from './account-connect-epic.component';

describe('AccountConnectEpicComponent', () => {
  let component: AccountConnectEpicComponent;
  let fixture: ComponentFixture<AccountConnectEpicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountConnectEpicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountConnectEpicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
