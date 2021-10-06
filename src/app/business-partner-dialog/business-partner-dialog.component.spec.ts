import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPartnerDialogComponent } from './business-partner-dialog.component';

describe('BusinessPartnerDialogComponent', () => {
  let component: BusinessPartnerDialogComponent;
  let fixture: ComponentFixture<BusinessPartnerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessPartnerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPartnerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
