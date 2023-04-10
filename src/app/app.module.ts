import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from '../material.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { IProviderComponent } from './provider/i-provider/i-provider.component';
import { IProviderHomeComponent } from './provider/i-provider-home/i-provider-home.component';
import { IProviderListComponent } from './provider/i-provider-list/i-provider-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InsuranceProviderComponent } from './insurance-provider/insurance-provider/insurance-provider.component';
import { InsuranceProviderHomeComponent } from './insurance-provider/insurance-provider-home/insurance-provider-home.component';
import { InsuranceProviderListComponent } from './insurance-provider/insurance-provider-list/insurance-provider-list.component';
import { FileDragNDropDirective } from './insurance-provider/file-drag-n-drop.directive';
import { NgxFileDragDropModule } from 'ngx-file-drag-drop';
import { DeleteConfirmComponent } from './insurance-provider/delete-confirm/delete-confirm.component';
import { QualityCheckHomeComponent } from './QC/quality-check-home/quality-check-home.component';
import { CreateRegisterComponent } from './customer-care/create-register/create-register.component';
import { CustomerLandingComponent } from './customer-care/customer-landing/customer-landing.component';

import { AppRouterModule } from './router-module/router-module.module';
import { CustomerDetailComponent } from './customer-care/customer-detail/customer-detail.component';
import { LoginComponent } from './login/login.component';
import { BookAppointmentComponent } from './customer-care/book-appointment/book-appointment.component';
import { SearchDctComponent } from './customer-care/search-dct/search-dct.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './shared/confirmation-dialog.service';
import { RoResponseComponent } from './customer-care/ro-response/ro-response.component';
import { ProgressComponent } from './insurance-provider/insurance-provider-list/progress/progress.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SelectComponent } from './shared/select/select.component';
//import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

@NgModule({
  declarations: [
    AppComponent,
    IProviderComponent,
    IProviderHomeComponent,
    IProviderListComponent,
    InsuranceProviderComponent,
    InsuranceProviderHomeComponent,
    InsuranceProviderListComponent,
    FileDragNDropDirective,
    DeleteConfirmComponent,
    QualityCheckHomeComponent,
    CreateRegisterComponent,
    CustomerLandingComponent,
    CustomerDetailComponent,
    LoginComponent,
    BookAppointmentComponent,
    SearchDctComponent,
    ConfirmationDialogComponent,
    RoResponseComponent,
    ProgressComponent,
    SelectComponent,
  ],
  imports: [
    AppRouterModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxFileDragDropModule,

    //  NgxMatTimepickerModule,
  ],
  providers: [
    ConfirmationDialogService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  entryComponents: [ConfirmationDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
