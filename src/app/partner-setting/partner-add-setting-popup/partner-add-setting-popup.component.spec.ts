import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerAddSettingPopupComponent } from './partner-add-setting-popup.component';

describe('PartnerAddSettingPopupComponent', () => {
  let component: PartnerAddSettingPopupComponent;
  let fixture: ComponentFixture<PartnerAddSettingPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerAddSettingPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerAddSettingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
