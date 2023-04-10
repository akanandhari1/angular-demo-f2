import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InsuranceProvider } from 'src/app/modal/iInsuranceProvider';
import { SharedExportService } from 'src/app/shared-export.service';
import { iList } from 'src/app/modal/iListInterface';
import { IProviderService } from 'src/app/provider/i-provider.service';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog.service';

@Component({
  selector: 'app-quality-check-home',
  templateUrl: './quality-check-home.component.html',
  styleUrls: ['./quality-check-home.component.scss'],
})
export class QualityCheckHomeComponent implements OnInit {
  public providerList: iList[] = [
    { id: 1, name: 'SBI' },
    { id: 2, name: 'HDFC' },
    { id: 3, name: 'TATA_AIG' },
  ];
  public stateList: any[];
  public statusList: iList[] = [
    { id: 1, name: 'Registered' },
    { id: 2, name: 'Appointment confirmed' },
  ];

  constructor(
    public oService: IProviderService,
    public fb: FormBuilder,
    public fileExportService: SharedExportService,
    public confirmDialog: ConfirmationDialogService
  ) {}
  ngOnInit(): void {
    this.oService.getState().subscribe((states) => {
      this.stateList = states.map((s: any) => {
        return s.state;
      });
      console.log(this.stateList);
    });
    this.oService.search().subscribe((ELEMENT_DATA) => {
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      console.log(ELEMENT_DATA);
    });
  }
  displayedColumns: string[] = [
    'TPARequestId',
    'PolicyId',
    'MemberId',
    'CustomerName',
    'CustomerNo',

    'InsuranceProvider',

    'Approve',
    'Reject',
    'Reports',
  ];

  dataSource: MatTableDataSource<InsuranceProvider>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public readonly form = this.createForm();

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  createForm() {
    return this.fb.group({
      PolicyId: [null],
      MemberId: [null],
      OrderId: [null],
      CustomerName: [null],
      MobileNumber: [null],
      OrderID: [null],
      StartDate: [null],
      EndDate: [null],
      DateOf: [null],
      State: [null],
      Status: [null],
      InsuranceProvider: [null],
      TPARequestId: [null],
    });
  }
  reset() {
    this.form.reset();
    this.form.setValue({}, { emitEvent: false });
    this.form.markAsUntouched();
    this.form.markAsPristine();
  }
  downloadExcel() {
    let dateTim = new Date().toString();
    this.fileExportService.exportAsExcelFile(
      this.dataSource.data,
      'filedownload_' + dateTim
    );
  }
  approve() {
    this.confirmDialog
      .confirm('Approve', 'Approve the Request ?', 'Approve', 'Cancel', true)
      .subscribe((result) => {
        // this.appointments.status = 'Customer Appeared';
        // this.appointments.comment = result;
      });
  }
  reject() {
    this.confirmDialog
      .confirm('Reject', 'Reject the Request ?', 'Reject', 'Cancel', true)
      .subscribe((result) => {
        // this.appointments.status = 'Customer Appeared';
        // this.appointments.comment = result;
      });
  }
}
