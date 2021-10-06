import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomFieldViewerComponent } from './new-custom-field-viewer.component';

describe('NewCustomFieldViewerComponent', () => {
  let component: NewCustomFieldViewerComponent;
  let fixture: ComponentFixture<NewCustomFieldViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCustomFieldViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustomFieldViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
