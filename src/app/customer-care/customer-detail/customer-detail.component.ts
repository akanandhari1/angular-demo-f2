import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InsuranceProvider } from 'src/app/modal/iInsuranceProvider';

import { FormBuilder, FormGroup } from '@angular/forms';
import { iList } from 'src/app/modal/iListInterface';
import { IProviderService } from 'src/app/provider/i-provider.service';
import { BookAppointmentComponent } from '../book-appointment/book-appointment.component';
import { Appointments } from 'src/app/modal/appointment';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog.service';
import { RoResponseComponent } from '../ro-response/ro-response.component';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit {
  public form: FormGroup;
  public cInfo: InsuranceProvider;
  public disableEdit = true;
  public SelectedLabTests: any;
  public appointments: Appointments;
  @Output()
  public navigatetoDetail = new EventEmitter();
  public providerList: iList[] = [
    { id: 1, name: 'SBI' },
    { id: 2, name: 'HDFC' },
    { id: 3, name: 'TATA_AIG' },
  ];

  public LabTests: any[] = [];
  public genderList: string[] = ['Male', 'Female', 'other'];
  public stateList: any[];
  public statusList: iList[] = [
    { id: 1, name: 'Registered' },
    { id: 2, name: 'Appointment confirmed' },
  ];
  public showAppoinment = true;
  constructor(
    public oService: IProviderService,
    public dialog: MatDialog,
    public confirmDialog: ConfirmationDialogService,
    public fb: FormBuilder // @Inject(MAT_DIALOG_DATA) public cInfo: InsuranceProvider
  ) {
    this.oService.currentCustomer.subscribe((result: InsuranceProvider) => {
      this.cInfo = result;
      this.form = InsuranceProvider.createForm(result);
    });
    this.oService.labtest().subscribe((re) => {
      this.LabTests = re;
    });
    this.oService.getState().subscribe((states) => {
      this.stateList = states.map((s: any) => {
        return s.state;
      });
      // console.log(this.stateList);
    });
  }
  changeEdit() {
    this.disableEdit = !this.disableEdit;
    //  console.log(this.form);
    if (!this.disableEdit) {
      for (let control in this.form.controls) {
        this.form.controls[control].enable();
        // obj.disabled=false;
      }
    } else {
      for (let control in this.form.controls) {
        this.form.controls[control].disable();
        // obj.disabled=false;
      }
    }
  }
  ngOnInit(): void {}
  onFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
  }

  showbookAppoinment() {
    const dialogRef = this.dialog.open(BookAppointmentComponent, { data: '' });
    dialogRef.afterClosed().subscribe((result: Appointments) => {
      if (result) {
        console.log(result);
        this.appointments = result;
        this.appointments.status = 'Processing';
        this.showAppoinment = false;
      }
    });
  }
  noResponse() {
    const dialogRef = this.dialog.open(RoResponseComponent, { data: '' });
    dialogRef.afterClosed().subscribe((result: Appointments) => {
      if (result) {
        console.log(result);
        this.appointments = result;

        // this.showAppoinment = false;
      }
    });
  }
  deleteAppoinment(i: any) {
    this.appointments.appointments.splice(i, 1);
  }
  rebookAppoinment() {
    // this.deleteAppoinment(this.appointments.appointments.length - 1);
    const dialogRef = this.dialog.open(BookAppointmentComponent, {
      data: this.appointments,
    });
    dialogRef.afterClosed().subscribe((result: Appointments) => {
      if (result) {
        this.appointments = result;
        this.appointments.status = 'Processing';
        this.showAppoinment = false;
      }
    });
  }

  reset() {
    this.form.reset();
  }
  back() {
    this.navigatetoDetail.emit(2);
  }

  show() {
    this.confirmDialog
      .confirm(
        'Confirm Show',
        'Confirm Customer Appears to the Test',
        'Yes',
        'Cancel',
        true
      )
      .subscribe((result) => {
        this.appointments.status = 'Customer Appeared';
        this.appointments.comment = result;
      });
  }
  noShow() {
    this.confirmDialog
      .confirm(
        'Confirm no Show',
        'Confirm Customer not appears to the Test',
        'Yes',
        'Cancel',
        true
      )
      .subscribe((result) => {
        this.appointments.status = 'Customer not Appeared';
        this.appointments.comment = result;
      });
  }
  partialyCompleted() {
    this.confirmDialog
      .confirm(
        'Partially Completed',
        'Confirm Process Partially Completed',
        'Ok',
        'Cancel',
        true
      )
      .subscribe((result) => {
        this.appointments.status = 'Partially Completed';
        this.appointments.comment = result;
      });
  }
  reportPending() {
    this.confirmDialog
      .confirm(
        'Confirm Report Pending',
        'Confirm Pending of Report Generation',
        'Pending',
        'close',
        true
      )
      .subscribe((result) => {
        this.appointments.status = 'Report Pending';
        this.appointments.comment = result;
      });
  }
  QcProcess() {
    this.confirmDialog
      .confirm(
        'Confirm Qc In Process',
        'Update Qc in Process',
        'Ok',
        'Cancel',
        true
      )
      .subscribe((result) => {
        this.appointments.status = 'Qc in Process';
        this.appointments.comment = result;
      });
  }
}
