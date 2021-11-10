import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, shareReplay, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-partner-add-setting-popup',
  templateUrl: './partner-add-setting-popup.component.html',
  styleUrls: ['./partner-add-setting-popup.component.css']
})
export class PartnerAddSettingPopupComponent implements OnInit {
  searchStream$: Subject<string> = new Subject();
  @ViewChild("searchGroup", { static: false }) searchGroup: any;
  search: string = "";
  selectedPartnerType: any[] = [];
  selectedPartnerGroup: any[] = [];
  selectedCompanyType: any[] = [];
  selectedPartner: any;
  selectedCompany: any;
  groups$: Observable<any>;
  groupObj = {
    groupId: null,
    name: null,
  };
  loadingStream$: Subject<boolean> = new Subject();

  constructor(
    public dialogRef: MatDialogRef<PartnerAddSettingPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log('dialog Data',this.data)
    if (this.data.settingList.PartnerType)
      this.selectedPartnerType = this.data.settingList.PartnerType.map(
        (ele) => ele.overrideFor[0].objectType
      );
    // if (this.data.settingList.CompanyType)
    //   this.selectedCompanyType = this.data.settingList.CompanyType.map(
    //     (ele) => ele.overrideFor[0].objectType
    //   );
    if (this.data.obj.uuid) {
      if (this.data.type == "TYPE")
        this.selectedPartner = this.data.obj.overrideFor[0].objectType;
      // if (this.data.type == "COMPANY")
      //   this.selectedCompany = this.data.obj.overrideFor[0].objectType;
      // if (this.data.type == "GROUP") {
      //   this.selectedPartnerGroup = this.data.obj.overrideFor.map((ele) => {
      //     let obj = {
      //       name: ele.objectIdentifier,
      //       uuid: ele.objectUuid,
      //     };
      //     return obj;
      //   });
      // }
    }
  }
  ngAfterViewInit(): void {
    if (this.data.type != "TYPE") this.searchStream$.next(this.search);
  }
  selectGroup = (value: any) => {
    const obj = value;
    const index = this.selectedPartnerGroup.findIndex(
      (v: any) => v.uuid === value.uuid
    );
    if (index !== -1) {
      this.selectedPartnerGroup = this.selectedPartnerGroup.filter(
        (v) => v.uuid !== value.uuid
      );
    } else {
      this.selectedPartnerGroup = [...this.selectedPartnerGroup, value];
    }
  };
  proceed() {
    if (this.data.type === "TYPE") {
      this.data.obj.type = "PartnerType";
      this.data.obj.overrideFor[0].objectType = this.selectedPartner;
      this.data.obj.overrideFor[0].objectIdentifier = this.data.obj.overrideFor[0].objectType;
     }
    // else if (this.data.type === "GROUP") {
    //   this.data.obj.type = "PartnerGroup";
    //   this.data.obj.overrideFor = this.selectedPartnerGroup.map((ele) => {
    //     let obj = {
    //       objectType: "group",
    //       objectIdentifier: ele.name,
    //       objectUuid: ele.uuid,
    //     };
    //     return obj;
    //   });
    // } else if (this.data.type === "COMPANY") {
    //   this.data.obj.type = "CompanyType";
    //   this.data.obj.overrideFor[0].objectType = this.selectedCompany;
    //   this.data.obj.overrideFor[0].objectIdentifier = this.data.obj.overrideFor[0].objectType;
    // } else {
    //   this.data.obj.type = "OrgDefault";
    // }
    else {
      this.data.obj.type = "OrgDefault";
    }
    this.dialogRef.close(this.data);
  }
}
