import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessPartnerService } from 'src/app/servive/business-partner.service';

@Component({
  selector: 'app-business-partner-add-setting',
  templateUrl: './business-partner-add-setting.component.html',
  styleUrls: ['./business-partner-add-setting.component.css']
})
export class BusinessPartnerAddSettingComponent implements OnInit {
  partnerFields: any[] = JSON.parse(JSON.stringify(BusinessPartnerFields));
  isForChild: boolean = false;
  partnerSetting: any = {
    OrgDefault: null,
    PartnerType: null,
    PartnerGroup: null,
  };
  setting: any = {
    FieldsMandateOnCreate: {
      configs: null,
      isApplicable: true,
    },
    FieldsMandateOnVerification: {
      configs: null,
      isApplicable: true,
    },
    FieldsRequireReVerificationOnUpdate: {
      configs: null,
      isApplicable: true,
    },
    UniquenessConstraint: {
      configs: {
        uniqueBy: null,
      },
      isApplicable: true,
    },
  };
  selectedUniqueContraint: any[] = [];

  constructor(
    
    private service:BusinessPartnerService,
    public dialogRef: MatDialogRef<BusinessPartnerAddSettingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.service.getPartnerSetting().subscribe((obj: any) => {
      this.partnerSetting = obj;

      if (this.data.type == "ORGANIZATION") {
        this.settingObjBinding(obj);
        this.isForChild = true;
        this.data.uniqueConditions = this.data.uniqueConditions.filter(
          (i) => i.key != "DEFAULT"
        );
      }
      if (
        this.data.type == "TYPE" ||
        this.data.type == "GROUP" ||
        this.data.type == "COMPANY"
      ) {
        if (this.data.settingObj.uuid)
          this.settingObjBinding(this.data.settingObj);
        else this.createPartnerTypeGroup();
      }
    });
  }
  createPartnerTypeGroup() {
    this.data.settingObj.setting = this.setting;
    if (!this.data.settingObj?.setting?.UniquenessConstraint?.configs?.uniqueBy)
      this.selectedUniqueContraint = this.data.uniqueConditions.filter(
        (ele) => ele.key === "DEFAULT"
      );
  }
  settingObjBinding(partnerSetting: any) {
    let partnerSettingTypes: any;
    if (this.data.type == "ORGANIZATION")
      partnerSettingTypes = this.partnerSetting.OrgDefault[0];
    if (
      this.data.settingObj &&
      (this.data.settingObj.type == "PartnerType" ||
        this.data.settingObj.type == "PartnerGroup" ||
        this.data.settingObj.type == "CompanyType") &&
      this.data.settingObj.uuid
    )
      partnerSettingTypes = partnerSetting;
    if (
      this.data.settingObj &&
      this.data.settingObj.type == "PartnerGroup" &&
      this.data.settingObj.uuid
    )
      partnerSettingTypes = partnerSetting;
    if (partnerSetting) {
      //FieldsMandateOnCreate
      let createConfig =
        partnerSettingTypes.setting.FieldsMandateOnCreate.configs;
      Object.keys(createConfig)
        .map((item) => ({
          key: item,
          value: createConfig[item],
        }))
        .map((ele) => {
          let index = this.partnerFields.findIndex(
            (i) => i.fieldKey === ele.key
          );
          if (index != -1)
            this.partnerFields[index].mandateOnCreate = ele.value;
        });
      //FieldsMandateOnVerification
      let verificationConfig =
        partnerSettingTypes.setting.FieldsMandateOnVerification.configs;
      Object.keys(verificationConfig)
        .map((item) => ({
          key: item,
          value: verificationConfig[item],
        }))
        .map((ele) => {
          let index = this.partnerFields.findIndex(
            (i) => i.fieldKey === ele.key
          );
          if (index != -1)
            this.partnerFields[index].mandateOnVerification = ele.value;
        });
      //FieldsRequireReVerificationOnUpdate
      let reVerificationConfig =
        partnerSettingTypes.setting.FieldsRequireReVerificationOnUpdate.configs;
      Object.keys(reVerificationConfig)
        .map((item) => ({
          key: item,
          value: reVerificationConfig[item],
        }))
        .map((ele) => {
          let index = this.partnerFields.findIndex(
            (i) => i.fieldKey === ele.key
          );
          if (index != -1)
            this.partnerFields[index].mandateOnReVerification = ele.value;
        });
      //UniquenessConstraint
      if (partnerSettingTypes?.setting?.UniquenessConstraint?.configs) {
        let uniqueValue =
          partnerSettingTypes?.setting?.UniquenessConstraint?.configs?.uniqueBy;
        this.selectedUniqueContraint = this.data.uniqueConditions.filter(
          (ele) => JSON.stringify(ele.value) === JSON.stringify(uniqueValue)
        );
        this.setting.UniquenessConstraint.configs.uniqueBy = this.selectedUniqueContraint[0]?.value;
      } else {
        partnerSettingTypes.setting.UniquenessConstraint = JSON.parse(
          JSON.stringify(this.selectedUniqueContraint)
        );
      }
    }
  }
  selectedUniqueCondition(conditionObj: any) {
    if (conditionObj.key !== "DEFAULT") {
      if (!this.setting.UniquenessConstraint) {
        let obj = {
          configs: {
            uniqueBy: null,
          },
          isApplicable: true,
        };
        this.setting.UniquenessConstraint = JSON.parse(JSON.stringify(obj));
      }
      this.setting.UniquenessConstraint.configs.uniqueBy = conditionObj.value;
      this.selectedUniqueContraint = [conditionObj];
    } else this.setting.UniquenessConstraint = null;
  }
  onSave() {
    //mandateOnCreate
    let mandateOnCreate = this.partnerFields.reduce((acc, value) => {
      acc[value.fieldKey] = value.mandateOnCreate;
      return acc;
    }, {});
    //mandateOnVerification
    let mandateOnVerification = this.partnerFields.reduce((acc, value) => {
      acc[value.fieldKey] = value.mandateOnVerification;
      return acc;
    }, {});
    //mandateOnReVerification
    let mandateOnReVerification = this.partnerFields.reduce((acc, value) => {
      acc[value.fieldKey] = value.mandateOnReVerification;
      return acc;
    }, {});
    if (this.selectedUniqueContraint[0]?.key == "DEFAULT")
      this.setting.UniquenessConstraint = null;
    this.setting.FieldsMandateOnCreate.configs = mandateOnCreate;
    this.setting.FieldsMandateOnVerification.configs = mandateOnVerification;
    this.setting.FieldsRequireReVerificationOnUpdate.configs = mandateOnReVerification;
    if (
      this.data.settingObj &&
      (this.data.settingObj.type == "PartnerType" ||
        this.data.settingObj.type == "PartnerGroup" ||
        this.data.settingObj.type == "CompanyType")
    ) {
      this.data.settingObj.setting = this.setting;
      this.dialogRef.close(this.data.settingObj);
    }
    if (this.data.type === "ORGANIZATION") {
      this.partnerSetting.OrgDefault[0].setting.FieldsMandateOnCreate.configs = mandateOnCreate;
      this.partnerSetting.OrgDefault[0].setting.FieldsMandateOnVerification.configs = mandateOnVerification;
      this.partnerSetting.OrgDefault[0].setting.FieldsRequireReVerificationOnUpdate.configs = mandateOnReVerification;
      this.partnerSetting.OrgDefault[0].setting.UniquenessConstraint = this.setting.UniquenessConstraint;
      this.dialogRef.close(this.partnerSetting.OrgDefault[0]);
    }
  }

}
export const BusinessPartnerFields = [
  {
      fieldKey: 'city',
      fieldName: 'Hub(City)',
      description: 'Business Partner City',
      mandateOnCreate: null,
      mandateOnVerification: null,
      mandateOnReVerification: null
  },
  {
      fieldKey: 'name',
      fieldName: 'Name',
      description: 'Business Partner Name',
      mandateOnReVerification: null
  },
  {
      fieldKey: 'gstNo',
      fieldName: 'Gst No.',
      description: 'Business Partner Gst Number',
      mandateOnCreate: null,
      mandateOnVerification: null,
      mandateOnReVerification: null
  },
  {
      fieldKey: 'contactNumber',
      fieldName: 'Contact Number',
      description: 'Business Partner Contact Number',
      mandateOnCreate: null,
      mandateOnVerification: null,
      mandateOnReVerification: null
  },
  {
      fieldKey: 'panNumber',
      fieldName: 'Pan No.',
      description: 'Business Partner Pan Number',
      mandateOnCreate: null,
      mandateOnVerification: null,
      mandateOnReVerification: null
  },
  {
      fieldKey: 'aadharNo',
      fieldName: 'Aadhar No.',
      description: 'Business Partner Aadhar Number',
      mandateOnVerification: null,
      mandateOnReVerification: null
  },
  {
      fieldKey: 'group',
      fieldName: 'Partner Group',
      description: 'Business Partner Group',
      mandateOnReVerification: null
  },
  {
      fieldKey: 'paymentInfo',
      fieldName: 'Payment Info',
      description: 'Any of UPI or Bank Account Info',
      mandateOnVerification: null,
      mandateOnReVerification: null
  },
  {
      fieldKey: 'bankInfo',
      fieldName: 'Bank Info',
      description: 'At least 1 bank account info',
      mandateOnVerification: null,
      mandateOnReVerification: null
  },
  {
      fieldKey: 'laneInfo',
      fieldName: 'Lane Info',
      description: 'At least 1 lane info',
      mandateOnVerification: null,
      mandateOnReVerification: null
  },
  {
      fieldKey: 'panImage',
      fieldName: 'Pan Image',
      description: 'Business Partner Pan Image',
      mandateOnVerification: null,
      mandateOnReVerification: null
  },
  {
      fieldKey: 'aadharImage',
      fieldName: 'Aadhar Image',
      description: 'Business Partner Aadhar Image',
      mandateOnVerification: null,
      mandateOnReVerification: null
  },
  {
      fieldKey: 'bankAccountChequeImage',
      fieldName: 'Bank Account Cheque Image',
      description: 'Business Partner Bank Account Cheque Image',
      mandateOnVerification: null,
      mandateOnReVerification: null
  },
]