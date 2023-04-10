import { Component, OnInit } from '@angular/core';
import { DcDetails } from 'src/app/modal/appointment';
import { IProviderService } from 'src/app/provider/i-provider.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-search-dct',
  templateUrl: './search-dct.component.html',
  styleUrls: ['./search-dct.component.scss'],
})
export class SearchDctComponent implements OnInit {
  public dcDetails: DcDetails[];
  public filtereddcDetails: DcDetails[];

  public searchPinCode = '';
  constructor(
    public oService: IProviderService,
    public dialogRef: MatDialogRef<SearchDctComponent>,
    private _snackBar: MatSnackBar
  ) {
    this.oService.getDcDetails(this.searchPin).subscribe((result) => {
      this.dcDetails = result;
    });
  }

  ngOnInit(): void {}

  searchPin() {
    this.oService.getDcDetails(this.searchPinCode).subscribe((result) => {
      this.dcDetails = result;
    });
  }
  selectonlyone(dc: DcDetails) {
    this.dcDetails.forEach((odc) => {
      odc.selected = false;
    });
    dc.selected = true;
  }
  selectDc() {
    let dcDetailsF = this.dcDetails.filter((s) => {
      return s.selected;
    });
    if (dcDetailsF.length > 0) {
      this.dcDetails.forEach((s) => {
        s.selected = false;
      });
      this.dialogRef.close(dcDetailsF[0]);
    } else {
      this.openSnackBar();
    }
  }
  openSnackBar() {
    this._snackBar.open('kindly Select a DC', '', {
      duration: 5 * 1000,
    });
  }
}
