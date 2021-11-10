import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UsersComponent } from './users/users.component';
import { StoreModule } from '@ngrx/store';
import { reducer, metaReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeComponent } from './employee/employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { ChartsModule } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BusinessPartnerDialogComponent } from './business-partner-dialog/business-partner-dialog.component';
import { NewCustomFieldEditorComponent } from './new-custom-field-editor/new-custom-field-editor.component';
import { NewCustomFieldViewerComponent } from './new-custom-field-viewer/new-custom-field-viewer.component';
import { BusinessPartnerService } from './servive/business-partner.service';
import { BusinessPartnerPipe } from './pipe/business-partner.pipe';
import { BusinessPartnerGroupSettingComponent } from './partner-setting/business-partner-group-setting/business-partner-group-setting.component';
import { PartnerAddSettingPopupComponent } from './partner-setting/partner-add-setting-popup/partner-add-setting-popup.component';
import { BusinessPartnerAddSettingComponent } from './partner-setting/business-partner-add-setting/business-partner-add-setting.component';
import { DriverComponent } from './driver/driver.component';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    EmployeeComponent,
    HeaderComponent,
    BusinessPartnerDialogComponent,
    NewCustomFieldEditorComponent,
    NewCustomFieldViewerComponent,
    BusinessPartnerPipe,
    BusinessPartnerGroupSettingComponent,
    PartnerAddSettingPopupComponent,
    BusinessPartnerAddSettingComponent,
    DriverComponent,
    
  ],
  entryComponents: [DialogBodyComponent, BusinessPartnerDialogComponent,PartnerAddSettingPopupComponent,BusinessPartnerAddSettingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OwlDateTimeModule,
    MatDatepickerModule,
    OwlNativeDateTimeModule,
    MatTabsModule,
    MatRadioModule,
    MatDialogModule,
    ChartsModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
    StoreModule.forRoot(reducer, {
      metaReducers,
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([UserEffects]),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatDialogModule,
    ChartsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  providers: [BusinessPartnerService, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
