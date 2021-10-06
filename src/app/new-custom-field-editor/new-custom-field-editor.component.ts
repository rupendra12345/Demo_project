import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-new-custom-field-editor',
  templateUrl: './new-custom-field-editor.component.html',
  styleUrls: ['./new-custom-field-editor.component.css']
})
export class NewCustomFieldEditorComponent implements OnInit {
  fieldTypes = [
    {
      key: "Address",
      fieldType: "address",
      valueType: "string",
      input: "string",
    },
    { key: "Checkbox", fieldType: "checkbox", valueType: "string", input: "" },
    {
      key: "Counter",
      fieldType: "counter",
      valueType: "string",
      input: "number",
    },
    {
      key: "Weight",
      fieldType: "weight",
      valueType: "string",
      input: "number",
    },
    { key: "Text", fieldType: "text", valueType: "string", input: "string" },
    { key: "Number", fieldType: "number", valueType: "string", input: "number" },
    {
      key: "Contact No",
      fieldType: "contactNo",
      valueType: "string",
      input: "number",
    },
    { key: "Email", fieldType: "email", valueType: "string", input: "string" },
    { key: "Date", fieldType: "date", valueType: "string", input: "date" },
    {
      key: "Date & Time",
      fieldType: "dateTime",
      valueType: "string",
      input: "date",
    },
    {
      key: "Single Choice",
      fieldType: "radio-button",
      valueType: "string",
      input: "",
    },
    { key: "Yes/No", fieldType: "yes-no", valueType: "string", input: "" },
    {
      key: "Drop down",
      fieldType: "select",
      valueType: "string",
      input: "",
    },

    { key: "Camera", fieldType: "camera", valueType: "arrayOfJson", input: "" },
    { key: "file", fieldType: "file", valueType: "arrayOfJson", input: "" },
    { key: "url", fieldType: "url", valueType: "string", input: "" },
  ];

  selectedField = this.fieldTypes[4];
  
  customField = {
    fieldType: "text",
    accessType: null,
    fieldKey: "",
    value: null,
    multiple: false,
    unit: "",
    isRemark: false,
    remark: "",
    required: false,
    description: "",
    options: [],
    indexedValue: [],
    valueType: 'string',
    input: null,
  };

  @Output() generatedCf = new EventEmitter<any>();
  @Input() cf: any;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.generatedCf.emit(this.customField));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cf.currentValue) {
      if (this.cf) {
        this.customField = this.cf;
        this.selectedField = this.fieldTypes.filter(ft => ft.fieldType == this.cf.fieldType)[0]
      }
    }
  }
  selectionChange(event: MatSelectChange) {
    const value = event.value;
    this.customField = {
      ...this.customField,
      fieldType: value.fieldType,
      valueType: value.valueType,
      input: value.input,
      options: value.fieldType === "yes-no" ? ["Yes", "No"] : [],
      value: null,
    };
    this.generatedCf.emit(this.customField);
  }
  onKeyup = () => {
    if (this.customField.fieldKey) {
      this.generatedCf.emit(this.customField);
    }
  };
  deleteOption(option:any){
    this.cf.options = this.cf.options.filter(value => value != option)    
  }
  clearDefaultValue(){
    this.customField.value = null;
    this.generatedCf.emit(this.customField)
  }
  trackBy = (index: number, _: unknown) => index && index;
  makeDefault(option: any) {
    if (
      this.customField.fieldType === "checkbox" ||
      this.customField.multiple
    ) {
      this.customField.value = JSON.stringify([option]);
    } else {
      this.customField.value = option;
    }
    this.generatedCf.emit(this.customField)
  }
  changeMultiple() {
    this.generatedCf.emit(null);
    this.customField.multiple = !this.customField.multiple;
    
    if (this.customField.multiple) {
      this.customField.value = null;
      this.customField.valueType = "arrayOfString";
    } else {
      this.customField.value = null;
      this.customField.valueType = "string"
    }

    setTimeout(() => this.generatedCf.emit(this.customField));
  }

  addOption() {
    this.customField.options.push(null);
  }
}
