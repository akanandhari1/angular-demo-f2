import { Component, OnInit, Input, Inject } from '@angular/core';
import { InsuranceProvider } from 'src/app/modal/iInsuranceProvider';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { SearchDctComponent } from '../search-dct/search-dct.component';
import { IProviderService } from 'src/app/provider/i-provider.service';
import {
  Appointments,
  Appointment,
  DcDetails,
} from 'src/app/modal/appointment';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
})
export class BookAppointmentComponent implements OnInit {
  @Input()
  public customerInfo: InsuranceProvider;
  public appointments: Appointments = new Appointments();
  public showAppoinment = false;
  minDate: Date;
  maxDate: Date;
  constructor(
    public dialog: MatDialog,
    public oService: IProviderService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BookAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA)
    public appointmentedit: Appointments
  ) {
    if (this.appointmentedit) {
      this.appointments = this.appointmentedit;
    } else {
      this.addAppointment();
    }
    this.minDate = new Date();
    this.maxDate = new Date(new Date().getFullYear() + 1, 11, 31);
  }

  ngOnInit(): void {
    this.oService.currentCustomer.subscribe((result) => {
      this.customerInfo = result;
    });
    this.oService.labtest().subscribe((re) => {
      this.tests = re;
    });
  }
  searchDc(oAppointment: Appointment) {
    const dialogRef = this.dialog.open(SearchDctComponent, { data: '' });
    dialogRef.afterClosed().subscribe((result: DcDetails) => {
      oAppointment.dcDetails = result;
    });
  }
  public typeOfVisit: any[] = ['DC Visit', 'Home Visit'];
  public tests: any[] = ['ECG', 'Thyroid', '2D-Echo', 'CTMT', 'MER'];
  addAppointment() {
    let oAppointment: Appointment = new Appointment();
    this.appointments.appointments.push(oAppointment);
  }
  deleteAppoinment(i: any) {
    this.appointments.appointments.splice(i, 1);
  }
  deleteDc(appointment: Appointment) {
    appointment.dcDetails = undefined;
  }
  validateAppointment(): any {
    if (this.appointments.appointments.length > 0) {
      let isValid = true;
      this.appointments.appointments.forEach((oAp: any) => {
        for (let obj in new Appointment()) {
          console.log(oAp);
          if (
            oAp[obj] != undefined &&
            oAp[obj].length > 0 &&
            oAp?.dcDetails !== undefined
          ) {
            isValid = true;
          } else {
            isValid = false;
          }
        }
      });
      if (!isValid) {
        this.openSnackBar('kindly fill all Fields of all Appointments');
      }
      return isValid;
    } else {
      this.openSnackBar('Kindly Add an Appointment to Confirm');
      return false;
    }
  }
  confirmAppointment() {
    if (this.validateAppointment()) {
      this.openSnackBar('Appointment Confirmed');
      this.dialogRef.close(this.appointments);
    }
  }
  openSnackBar(errorMessage = '') {
    this._snackBar.open(errorMessage, '', {
      duration: 5 * 1000,
    });
  }
}
