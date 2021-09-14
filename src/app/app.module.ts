import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UsersComponent } from './users/users.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { EmployeeComponent } from './employee/employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogBodyComponent } from "./dialog-body/dialog-body.component";
import { ChartsModule } from 'ng2-charts';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [AppComponent, UsersComponent, EmployeeComponent],
  entryComponents:[DialogBodyComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,MatTabsModule,MatDialogModule,ChartsModule,MatMenuModule,MatAutocompleteModule ,MatInputModule,MatSelectModule,StoreModule.forRoot(reducers, {
    metaReducers,
    runtimeChecks: {
      strictStateImmutability: true,
      strictActionImmutability: true,
    }
  }), !environment.production ? StoreDevtoolsModule.instrument() : [], EffectsModule.forRoot([UserEffects]), FormsModule, ReactiveFormsModule, BrowserAnimationsModule,MatButtonModule],
  exports: [MatFormFieldModule,MatInputModule,MatSelectModule,MatTabsModule,MatAutocompleteModule,MatMenuModule,MatDialogModule,ChartsModule,MatButtonModule],
  providers: [],
  bootstrap: [AppComponent], // default component
})
export class AppModule { }

