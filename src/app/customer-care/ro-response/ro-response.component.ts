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
  selector: 'app-ro-response',
  templateUrl: './ro-response.component.html',
  styleUrls: ['./ro-response.component.scss'],
})
export class RoResponseComponent implements OnInit {
  public appointments: Appointments = new Appointments();
  constructor(
    public dialog: MatDialog,
    public oService: IProviderService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RoResponseComponent>,
    @Inject(MAT_DIALOG_DATA)
    public appointmentedit: Appointments
  ) {
    if (this.appointmentedit) {
      this.appointments = this.appointmentedit;
    } else {
    }
  }

  ngOnInit(): void {}
  openSnackBar(errorMessage = '') {
    this._snackBar.open(errorMessage, '', {
      duration: 5 * 1000,
    });
  }
  noResponse() {
    this.openSnackBar('No Response Notified');
    this.dialogRef.close(this.appointments);
  }
}
