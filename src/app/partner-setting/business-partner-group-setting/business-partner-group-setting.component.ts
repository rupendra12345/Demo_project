import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BusinessPartnerService } from 'src/app/servive/business-partner.service';
import { BusinessPartnerAddSettingComponent } from '../business-partner-add-setting/business-partner-add-setting.component';
import { PartnerAddSettingPopupComponent } from '../partner-add-setting-popup/partner-add-setting-popup.component';

@Component({
  selector: 'app-business-partner-group-setting',
  templateUrl: './business-partner-group-setting.component.html',
  styleUrls: ['./business-partner-group-setting.component.css']
})
export class BusinessPartnerGroupSettingComponent implements OnInit , OnChanges {
  @Input() businessPartnerSettings: any;
  @Input() uniqueConditions: any;
  @Input() permissions: any;
  @Output() emitCreateSettingObj = new EventEmitter<any>();
  @Output() deleteSettingObj = new EventEmitter<any>();
  settingObj: any;
  uniquenessCondition: any[] = [];
  restrictions: any;
  loadProfile: LoadingProfile = JSON.parse(
    JSON.stringify(initialLoadingProfile)
  );
  settingOrgObj: any = null;

  constructor( private dialog: MatDialog, private service:BusinessPartnerService ) {}

  ngOnInit(): void {
    this.settingObj = this.businessPartnerSettings;
    this.service
    .getPartnerSetting()
    .subscribe((obj: any) => {
      console.log('abcd',obj);
      this.settingObj = obj;
     console.log('updatedPartnerSetting',this.settingObj)
     
    });
    console.log(this.settingObj);
    console.log(this.businessPartnerSettings);
    this.restrictions = {
      objectIdentifier: null,
      objectUuid: null,
      objectType: null,
    };
    this.loadProfile.overrideFor.push(this.restrictions);

    this.getBusinessPartnerSetting()
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("businessPartnerSettings",this.businessPartnerSettings)
    console.log(this.settingObj);
    
    if (
      changes.businessPartnerSettings &&
      changes.businessPartnerSettings.currentValue
    ) {
      this.settingObj = this.businessPartnerSettings;
    }
    
    if (changes.uniqueConditions && changes.uniqueConditions.currentValue) {
      this.uniquenessCondition = this.uniqueConditions;
    }
  }
  addNewSetting(action: string, settingObj: any = null) {
    this.loadProfile =
      settingObj && settingObj.uuid
        ? (this.loadProfile = JSON.parse(JSON.stringify(settingObj)))
        : JSON.parse(
            JSON.stringify({
              sequenceNumber: null,
              orgId: null,
              uuid: null,
              type: null,
              overrideFor: [this.restrictions],
              setting: null,
            })
          );
    let dialogRef = this.dialog.open(PartnerAddSettingPopupComponent, {
      data: {
        type: action,
        obj: this.loadProfile,
        settingList: this.settingObj,
      },
      
    });
    
    dialogRef.afterClosed().subscribe((res: any) => {
      console.log('dialogData',res)
      if (res && res.type !== "ORGANIZATION") {
        this.editProfile(res.type, res.obj);
      }
    });
  }

  editProfile(type: string, settingObj: any = null) {
    let dialogRef = this.dialog.open(BusinessPartnerAddSettingComponent, {
      data: {
        type: type,
        uniqueConditions: this.uniquenessCondition,
        settingObj: settingObj,
      },
    });
    dialogRef.afterClosed().subscribe((obj: any) => {
      if (obj) this.service
      .createPartnerSetting(obj)
      .subscribe((res: any) => {
        console.log('partnerSetting',res)
        if (res.status === 200) {
          this.getBusinessPartnerSetting();
          if (obj.uuid)
            this.service.openSnackBar(
              "Partner Setting Updated Successfully"
            );
          else
            this.service.openSnackBar(
              "Partner Setting Created Successfully"
            );
        } else {
          this.service.openSnackBar(res.error);
        }
      });
    });
  }
  getBusinessPartnerSetting() {
    // debugger
    console.log("jhdkfjhewkh")
       this.service
         .businessPartnerSetting()
         .subscribe((res: any) => {
           console.log('user',res)
           if (res.status === 200) {
             
             
             this.service.setPartnerSetting(res.data);
             
           } else {
             this.service.openSnackBar(res.error);
           }
         })
   
   }
  deleteSetting(type: string, id: string){
   this.service
      .deletePartnerSetting(id)
      .subscribe((res: any) => {
        if (res.status == 200) {
          if (type === "TYPE") {
            let index = this.settingObj.PartnerType.findIndex(
              (i) => i.uuid === id
            );
            if (index !== -1)
              this.settingObj.PartnerType.splice(index, 1);
          }
        }
      })
  }
}

export interface LoadingProfile {
  sequenceNumber?: null | undefined | any;
  orgId?: null | undefined | string;
  uuid?: null | undefined | string;
  type?: null | undefined | string;
  overrideFor?: null | undefined | any[];
  setting?: null | undefined | any;
}
export const initialLoadingProfile = {
  sequenceNumber: null,
  orgId: null,
  uuid: null,
  type: null,
  overrideFor: [],
  setting: null,
};