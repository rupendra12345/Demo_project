import { Component,Inject, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { IUser } from '../user';
import { Store, select } from '@ngrx/store';
import * as UserActions from '../user.actions';
import * as fromUser from '../user.selectors';
import {FormControl} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import * as L from 'leaflet';
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

  constructor(private store: Store,private matDialog: MatDialog) { }

  myControl: FormControl = new FormControl();

  options = [
    'One',
    'Two',
    'Three'
   ];
 

  ngOnInit(): void {

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

