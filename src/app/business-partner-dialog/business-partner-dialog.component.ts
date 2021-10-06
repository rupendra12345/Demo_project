import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-business-partner-dialog',
  templateUrl: './business-partner-dialog.component.html',
  styleUrls: ['./business-partner-dialog.component.css']
})
export class BusinessPartnerDialogComponent implements OnInit {
  cf: any;
  uuid: string;
  customField: any = {};
  restrictions: any = [];
  showUpdate: boolean = true;
  constructor(
    private matDialogRef: MatDialogRef<
    BusinessPartnerDialogComponent
  >,
  @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    if (data) {
  
      this.cf = data.cfs;
      this.uuid = data.uuid;
      if (data.restriction && data.restriction.restrictions) {
        this.restrictions = data.restriction.restrictions;
      }
      this.customField = data;
    }
   }

  ngOnInit(): void {
  }
  createCustomFields() {
    this.cf.options = this.cf.options.filter((item) => item != null);
    this.customField = {
      cfs: this.cf,
      restriction: { restrictions: this.restrictions, isRestricted: true },
    };
    this.matDialogRef.close({customField: this.customField, action: 'addCustomField'});
  }
  updateCustomFields(){
    this.cf.options = this.cf.options.filter(item => item != null)
    this.customField.cfs = this.cf
    //this._store.dispatch(new UpdateCustomFieldAction(this.customField))
    this.matDialogRef.close({customField: this.customField, action: 'updateCustomField'});
  }
}
