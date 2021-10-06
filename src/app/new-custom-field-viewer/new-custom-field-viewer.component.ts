import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-new-custom-field-viewer',
  templateUrl: './new-custom-field-viewer.component.html',
  styleUrls: ['./new-custom-field-viewer.component.css']
})
export class NewCustomFieldViewerComponent implements OnInit {
  @Input() set cf(data: any) {
    // this.fileData = [];
    
    if(data){
      this.previuosValue = data.value;
    }
    

    if(data && (data.fieldType === 'select' || data.fieldType === 'yes-no')) {
      let optionValue = data.value
      
      if (optionValue && data.multiple) {
        try {
          optionValue = JSON.parse(optionValue);
          if(!data.options){
            data.options=optionValue
          }
          this.selectOption = optionValue
        } catch (error) {
          optionValue = [optionValue];
        } 
      }
      else if(!data.options){
        data.options=[optionValue]
        this.selectOption = optionValue
      }
      else{
      this.selectOption = optionValue
      }
    }
    

    if(data && (data.fieldType == 'date' || data.fieldType == 'dateTime') && data.value){
      this.cfDate = new Date(Number(data.value))
    }
    this.cfData = data;
  }
  @Input() set defaultValue(data:any){
    if(data && !this.cfData.value && this.cfData.value != ""){
      
      if(!this.cfData.multiple){
        if(this.cfData && (this.cfData.fieldType === 'select' || this.cfData.fieldType === 'yes-no')){
          this.cfData.value = data
          this.selectOption = data
        }else{
          this.cfData.value = data
        }
      }else{
        if(this.cfData && this.cfData.fieldType == 'select'){
          let optionValue = data
          this.cfData.value = data
          if (optionValue) {
            try {
              optionValue = JSON.parse(optionValue);
            } catch (error) {
              optionValue = [optionValue];
            } 
            this.selectOption = optionValue
          }
        }
      }
    }
  }
  @Output() onValueSelected: EventEmitter<any> = new EventEmitter();
  @Output() onValueChange: EventEmitter<any> = new EventEmitter();
  @Input() isMandatory: boolean;
  @Input() isAllowed: any;
  @Input() suggestions: any[];
  previuosValue: any;
  selectOption:any;
  cfDate: any;
  cfData: any;
  showUrlInput:boolean = false;
  editTextBoxView:boolean = false;
  editText:string='';
  isDirty: boolean = false;
  downloadPath: string = "";
  fileData: any[];
  error: boolean = false;
  isEmailValid: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.cf && changes.cf.isFirstChange) {
      if (this.cf.fieldType === "date") {
        const value = this.cf.value;
        if (value instanceof Array) {
          this.cfDate = [new Date(value[0]), new Date(value[1])];
        } else {
          this.cfDate = value ? new Date(JSON.parse(value)) : null;
        }
      }
    }
  }
  editUrl(){
    this.showUrlInput = true
  }

  postEditText(){
    if (this.editText != this.previuosValue) {
      this.previuosValue = this.editText;
      this.cfData.value = this.editText;
      this.onValueSelected.emit(this.cfData);
    }
    this.editTextBoxView = false
  }

  inputFocused() {
    this.isDirty = true;
    this.error = false;
  }
  selectionOutofFocuse() {
    this.error = this.validate();
    this.isDirty = false;
  }

  inputFocusOut() {
    this.error = this.validate();
    if (!this.error) {
      this.isDirty = false;

      if(this.cfData.fieldType === 'url'){
        this.showUrlInput = false
      }
      if ((this.cfData.value != this.previuosValue) && !(this.previuosValue == null && this.cfData.value == "")) {
        this.previuosValue = this.cfData.value;
        this.onValueSelected.emit(this.cfData);
      }
    }
  }
  keyup(event: any) {
    const value = event.target.value;
    this.onValueChange.emit(value);
    if (this.cfData.fieldType === "email") {
      this.isEmailValid = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/.test(value);
      if (!this.isEmailValid) {
        return;
      }
    }

    this.cfData.value = value;
    this.error = this.validate();
  }
  increment() {
    if (!this.cfData.value) {
      this.cfData.value = 1;
    } else {
      if (typeof this.cfData.value == "string") {
        if (!isNaN(this.cfData.value)) {
          this.cfData.value = parseInt(this.cfData.value);
        } else {
          this.cfData.value = 1;
        }
      }
      this.cfData.value = this.cfData.value + 1;
    }
    this.onValueSelected.emit(this.cfData);
  }
  decrement() {
    if (!this.cfData.value) {
      return;
    } else {
      this.cfData.value = this.cfData.value - 1;
    }
    this.onValueSelected.emit(this.cfData);
  }

  resetValue() {
    this.cfData.value = null;
    this.isDirty = true;
  }
  dateTimeChange(event: any) {
    const { value } = event;
    if (value instanceof Array) {
      this.cfData.value = [
        new Date(value[0]).getTime(),
        new Date(value[1]).getTime(),
      ];
    } else {
      this.cfData.value = new Date(value).getTime();
    }
    // this.onValueSelected.emit(this.cfData);
  }
  selectionChange(event: MatSelectChange) {
    this.selectOption = event.value;
    if(this.cfData.multiple){
      this.cfData.value = JSON.stringify(this.selectOption)
    }else{
      this.cfData.value = event.value
    }
    this.onValueSelected.emit(this.cfData);
  }

  optionChanged(event: MatCheckboxChange) {
    const value = event.source.value;
    let values = this.cfData.value || [];
    let index = values.findIndex((v) => v === value);
    if (index !== -1) {
      values.splice(index, 1);
    } else {
      values.push(value);
    }
    this.cfData.value = values;
    this.onValueSelected.emit(this.cfData);
  }
  singleSelectionChange(_: MatRadioChange) {
    this.onValueSelected.emit(this.cfData);
  }

  snapValue(value: any) {
    this.onValueSelected.emit(value);
  }
  private validate() {
    if (this.isDirty && this.isMandatory && !this.cfData.value) {
      return true;
    }

    return false;
  }
}
