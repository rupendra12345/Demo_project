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
      tap((cf) =>{ (this.customFields = cf), console.log('cf',this.customFields)}),
      
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

  }
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
    this.initMap();
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

