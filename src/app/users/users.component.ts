import { Component,Inject, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { IUser } from '../user';
import { Store, select } from '@ngrx/store';
import * as UserActions from '../user.actions';
import * as fromUser from '../user.selectors';
import {FormControl} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import * as L from 'leaflet';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { bpCustomFieldSelector } from '../user.selectors';
import { BusinessPartnerDialogComponent } from '../business-partner-dialog/business-partner-dialog.component';
import { AddBpCustomFieldsAction } from '../user.actions';
import { BusinessPartnerService } from '../servive/business-partner.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit,AfterViewInit{
  animal: 'panda' | 'unicorn' | 'lion';
  pageTitle = 'Users List';
  errorMessage = '';
  users: IUser[] = [];
  userFilter = "";
  skip:number = 0;
  customFields$: Observable<any[]>;
  customFields: any[];
  uniqueConditions: any[] = [];
  businessPartnerSettingDetails: any = {
    OrgDefault: null,
    PartnerType: null,
    PartnerGroup: null,
    CompanyType: null,
  };
  constructor(private store: Store,private matDialog: MatDialog, private service:BusinessPartnerService) { }

  myControl: FormControl = new FormControl();

  options = [
    'One',
    'Two',
    'Three'
   ];
 

  ngOnInit(): void {
    this.store.dispatch(new UserActions.FetchBpCustomFieldsAction(null));
    this.customFields$ = this.store.select(bpCustomFieldSelector).pipe(
      tap((cf) => (this.customFields = cf)),
      
      shareReplay(1)   
    );
   
    this.store.dispatch(new UserActions.LoadUsers()); // action dispatch

    this.store.pipe(select(fromUser.getUsers)).subscribe(
      users => {
        this.users = users;
      }
    )

    this.store.pipe(select(fromUser.getError)).subscribe(
      err => {
        this.errorMessage = err;
      }
    )
  this.getUniqueContraintList();
  // this.getBusinessPartnerSetting()
  // this.updatedPartnerSetting();
  }
  // updatedPartnerSetting() {
    
  //   this.service
  //     .getPartnerSetting()
  //     .subscribe((obj: any) => {
  //       console.log('abcd',obj);
  //       this.businessPartnerSettingDetails = obj;
  //    console.log('updatedPartnerSetting',this.businessPartnerSettingDetails)
       
  //     });

     
  // }
  getUniqueContraintList() {
    this.service
      .getUniquenessContraints()
      .subscribe((res: any) => {
        if (res.status === 200) {
          res.data["DEFAULT"] = null;
          this.uniqueConditions = Object.keys(res.data).map((item) => ({
            key: item,
            value: res.data[item],
          }));
        } else {
          this.service.openSnackBar(res.error);
        }
      })

}
// deleteSetting(obj: any) {

//     this.service
//       .deletePartnerSetting(obj.id)
//       .subscribe((res: any) => {
//         if (res.status == 200) {
//           if (obj.type === "TYPE") {
//             let index = this.businessPartnerSettingDetails.PartnerType.findIndex(
//               (i) => i.uuid === obj.id
//             );
//             if (index !== -1)
//               this.businessPartnerSettingDetails.PartnerType.splice(index, 1);
//           }
//           if (obj.type === "GROUP") {
//             let index = this.businessPartnerSettingDetails.PartnerGroup.findIndex(
//               (i) => i.uuid === obj.id
//             );
//             if (index !== -1)
//               this.businessPartnerSettingDetails.PartnerGroup.splice(
//                 index,
//                 1
//               );
//           }
//           if (obj.type === "COMPANY") {
//             let index = this.businessPartnerSettingDetails.CompanyType.findIndex(
//               (i) => i.uuid === obj.id
//             );
//             if (index !== -1)
//               this.businessPartnerSettingDetails.CompanyType.splice(index, 1);
//           }
//           if (obj.type === "ORGANIZATION") this.getBusinessPartnerSetting();
//           this.service.openSnackBar(
//             `Partner setting ${
//               obj.type === "ORGANIZATION" ? "reset to default" : "deleted"
//             } successfully !.`
//           );
//         } else {
//           this.service.openSnackBar(res.error);
//         }
//       })

// }
  // createSetting(obj) {
  //   console.log('createSetting')
  //     this.service
  //       .createPartnerSetting(obj)
  //       .subscribe((res: any) => {
  //         console.log('partnerSetting',res)
  //         if (res.status === 200) {
  //           this.getBusinessPartnerSetting();
  //           if (obj.uuid)
  //             this.service.openSnackBar(
  //               "Partner Setting Updated Successfully"
  //             );
  //           else
  //             this.service.openSnackBar(
  //               "Partner Setting Created Successfully"
  //             );
  //         } else {
  //           this.service.openSnackBar(res.error);
  //         }
  //       })
  
  // }
  
  
  addCustomFields() {
    let dialogRef = this.matDialog.open(
      BusinessPartnerDialogComponent,
      {
        width: "800px",
        height: "600px"
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.action === 'addCustomField') {
        this.store.dispatch(new AddBpCustomFieldsAction(res.customField));
          // action: "addCustomField",
          // payload: res.customField,
      
      }
      // if (res && res.action === 'updateCustomField') {
      //   this.store.dispatch(new UpdateBpCustomFieldsAction(res.customField));
       
      
      // }
    })
  }
  async editCf(cfObj: any) {
    let data = await this.service
      .fetchCfDetails(cfObj.uuid)
      .pipe(map((res: any) => res.data))
      .toPromise();

    

    this.matDialog.open(BusinessPartnerDialogComponent, {
      width: "800px",
      height: "600px",
      data: data,
    });
  }
  deleteField(uuid: string) {
    // this._store.dispatch(new DeleteBpSettingCustomField(uuid));
  }
  private map;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
  ngAfterViewInit(): void {
    // this.initMap();
  }

  openDialog() {
    this.matDialog.open(DialogBodyComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['2014', '2015', '2016', '2017', '2018', '2019', '2020'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
}

