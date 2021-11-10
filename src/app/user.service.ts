import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IUser } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'assets/users.json';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.userUrl)
      .pipe(
    
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
 
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
     
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
   // console.error(errorMessage);
    return throwError(errorMessage);
  }
}
