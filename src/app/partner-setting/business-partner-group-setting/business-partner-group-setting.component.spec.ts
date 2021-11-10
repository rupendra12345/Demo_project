import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPartnerGroupSettingComponent } from './business-partner-group-setting.component';

describe('BusinessPartnerGroupSettingComponent', () => {
  let component: BusinessPartnerGroupSettingComponent;
  let fixture: ComponentFixture<BusinessPartnerGroupSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessPartnerGroupSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPartnerGroupSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
