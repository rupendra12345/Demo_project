import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { forkJoin, from, interval, Observable, observable, of, race, Subscription, zip } from 'rxjs';
import { concatMap, delay, flatMap, map, mergeMap, pluck, retry, take, tap, toArray } from 'rxjs/operators';
import { PracticeServiceService } from '../servive/practice-service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
   response1:any;
   response2:any;
   response3:any;
   
   productFirst:any;
   productSecond:any;
   productThird:any;

   demodata:any;
   demodata1:any;

   practice:any
  constructor(private practiceservice:PracticeServiceService) { }

  users = [
    {
      name:'java',
      class:'one'
    },
    {
      name:'Angular',
      class:'two'
    },
    {
      name:'Java',
      class:'three'
    }
  ]

  ngOnInit(): void {
    // const letters$ = of('a','b','c');
    // const numbers$ = of(1,2,3);
    
    // const combined = letters$.pipe(
    //   mergeMap(Letter=>{
    //     return numbers$.pipe(map(numberEl=> Letter + numberEl))
    //   })
    // );
    // combined.subscribe(res=>{
    //   console.log(res)
    // });

    // const alphabates$ = of('a','b','c');
    // const number$ = of(1,2,3);
    // forkJoin([alphabates$,number$]).subscribe(res=>{
    //   console.log(res);
    

    // })

    // const arry = ['a','b','c','d'];
    // const usertime= interval(2000);
    // let subSubscription:Subscription;
    // subSubscription = usertime.pipe(
    //   tap(res=>{
    //     if(res==4){
    //       subSubscription.unsubscribe();
    //     }
    //   }),
    //   map(data=>arry[data])
    // ).subscribe(res=>console.log(res))

    
    // usertime.pipe(
    //   map(data=>
    //       arry[data]
    //   )
    //   ).subscribe(res=>console.log(res))

    // from(this.users).pipe(
    //   pluck('name'),
    //   toArray()
    // ).subscribe(res=>{console.log(res)})

  // this.mergeMapExample();
  // this.forkJoinExample();
  // this.rendondata()
   //  this.raceCondition()
  // this.threeapi()
  this.concatMap()
  }
  
  mergeMapExample(){
    this.practiceservice.firstapi().pipe(
      mergeMap(res1=>{
        return this.practiceservice.secondapi().pipe(map(res2=>{
          return{
            response1:res1,
            response2:res2
          }
        }))
      })
     ).subscribe(finloutput=>{
       console.log('mergeMap')
       console.log(finloutput);
       this.productFirst = finloutput.response1;
       this.productSecond = finloutput.response2;
     })
  }
  threeapi(){
     this.practiceservice.firstapi().pipe(
      
      mergeMap(res1=>{
        console.log(res1)
      
       return this.practiceservice.secondapi().pipe(delay(3000),
       
       )
    
      }
      
      )
      
    ).subscribe(res=>{console.log(res)})
    
  
  }
  forkJoinExample(){
    const firstData = this.practiceservice.firstapi();
    const secondData = this.practiceservice.secondapi();
  
    
    forkJoin([firstData,secondData]).subscribe(res=>{
    
      this.productFirst = res[0];
      this.productSecond = res[1];
      console.log('firstResponse',this.productFirst);
      console.log('secondResponse',this.productSecond);
      this.practiceservice.thirdapi().subscribe(res=>{console.log('thirdResponse',res)})
    })
      
  
  }

  

  raceCondition(){
    const first =  this.practiceservice.firstapi().pipe(delay(5000),map(i => console.log(i)));
    const second = this.practiceservice.secondapi().pipe(delay(9000),map(i => console.log(i)));
    const third = this.practiceservice.thirdapi().pipe(map(i => console.log(i)));
    
    first.pipe(
      flatMap(() => second),
      flatMap(() => third)

    )
      .subscribe((res)=> console.log('finished',res));
  }

  concatMap(){
    const first =  this.practiceservice.firstapi().pipe(delay(5000));
    const second = this.practiceservice.secondapi().pipe(delay(9000));
    const third = this.practiceservice.thirdapi()
    first.pipe(
      concatMap(
        res => second
        
      )
    ).subscribe(res=>console.log(res))
  }
 

}
