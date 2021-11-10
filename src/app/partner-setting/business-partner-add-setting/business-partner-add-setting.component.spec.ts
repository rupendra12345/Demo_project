import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPartnerAddSettingComponent } from './business-partner-add-setting.component';

describe('BusinessPartnerAddSettingComponent', () => {
  let component: BusinessPartnerAddSettingComponent;
  let fixture: ComponentFixture<BusinessPartnerAddSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessPartnerAddSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPartnerAddSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
