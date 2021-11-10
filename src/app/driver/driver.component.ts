import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { combineLatest, forkJoin, fromEvent, merge, Observable, of, Subscription } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  pluck,
  shareReplay,
  take,
  tap,
} from 'rxjs/operators';
import { DriverService } from '../servive/driver.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
})
export class DriverComponent implements OnInit {
  searchKey: string;
  driverList$: Observable<any> = new Observable();
  testList: any = [];
  testListSecond: any = [];
  scrollTop: number = 0;
  @ViewChild('searchDriver') search: any;
  @ViewChild('scroll') scroll: ElementRef;
  offset = null;
  searchParameter: string;
  subscriptions: Subscription = new Subscription();
  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.driverList$ = this.getDriver(this.offset, this.searchParameter);
  }
  getDriver(offSet, search) {
    return this.driverService.getDrivers(offSet, search).pipe(
      pluck('data'),
      tap((r: any) => {
        this.offset = r[r.length - 1].uuid;
      }),
      shareReplay(1),
      catchError(() => of([]))
    );
  }

  ngAfterViewInit(): void {
    this.subscriptions.add(
      fromEvent(this.scroll.nativeElement, 'scroll')
        .pipe(
          debounceTime(150),
          map((e: any) => {
            return {
              scrollTop: e.srcElement.scrollTop,
              scrollHeight: e.srcElement.scrollHeight,
            };
          })
        )
        .subscribe((target: any) => {
          if (this.scrollTop <= target.scrollTop) {
            let per = Math.round(
              (target.scrollTop / target.scrollHeight) * 100
            );
            if (per > 75) {
              this.driverList$ = merge(this.driverList$,combineLatest(
                this.driverList$,
                this.getDriver(this.offset, this.searchParameter)
              ).pipe(
                map((res: any) => [...res[0], ...res[1]]),
                tap((r: any) => {
                  this.offset = r[r.length - 1].uuid;
                })
              ));
            }
          }
        })
    );

    this.subscriptions.add(
      fromEvent(this.search.nativeElement, 'keyup')
        .pipe(
          debounceTime(250),
          distinctUntilChanged(),
          map((e: any) => e.target.value)
        )
        .subscribe((value: any) => {
          console.log('search', value);
          this.offset = null;
          this.searchParameter = value;
          this.driverList$ = merge(
            this.driverList$,
            this.getDriver(this.offset, this.searchParameter)
          );
        })
    );
  }
}
