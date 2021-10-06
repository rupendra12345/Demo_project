import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomFieldEditorComponent } from './new-custom-field-editor.component';

describe('NewCustomFieldEditorComponent', () => {
  let component: NewCustomFieldEditorComponent;
  let fixture: ComponentFixture<NewCustomFieldEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCustomFieldEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustomFieldEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
