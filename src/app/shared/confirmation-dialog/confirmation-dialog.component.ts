import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogService } from '../confirmation-dialog.service';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  onNoClick(): void {
    this.dialogRef.close();
  }

  public comment: any = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any = {
      title: '',
      message: '',
      btnOkText: 'OK',
      btnCancelText: 'Cancel',
      isCancel: true,
      hasComment: false,
    }
  ) {}

  ngOnInit() {
    if (this.data.hasComment) {
      this.comment = null;
    }
  }

  public decline() {
    this.dialogRef.close(false);
  }

  public accept() {
    if (this.data.hasComment) {
      this.dialogRef.close({ comment: this.comment });
    } else {
      this.dialogRef.close(true);
    }
  }

  public dismiss() {
    this.dialogRef.close();
  }
}
