import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InsuranceProvider } from 'src/app/modal/iInsuranceProvider';
import { SharedExportService } from 'src/app/shared-export.service';
import { iList } from 'src/app/modal/iListInterface';
import { IProviderService } from '../i-provider.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerDetailComponent } from 'src/app/customer-care/customer-detail/customer-detail.component';
@Component({
  selector: 'app-i-provider-home',
  templateUrl: './i-provider-home.component.html',
  styleUrls: ['./i-provider-home.component.scss'],
})
export class IProviderHomeComponent {
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
  @Input('from')
  public fromScreen = 'shc';
  @Output()
  public navigatetoDetail = new EventEmitter();
  dataSource: MatTableDataSource<InsuranceProvider>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  readonly form = this.createForm();

  constructor(
    public oService: IProviderService,
    public fb: FormBuilder,
    public fileExportService: SharedExportService,
    public dialog: MatDialog
  ) {
    this.oService.getState().subscribe((states) => {
      this.stateList = states.map((s: any) => {
        return s.state;
      });
      console.log(this.stateList);
    });
    this.oService.search().subscribe((ELEMENT_DATA) => {
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    });
  }

  displayedColumns: string[] = [
    'TPARequestId',
    'PolicyId',
    'MemberId',
    'CustomerName',
    'CustomerNo',
     'Gender',
    'DOB',
    'Age',
    'Address',
    'State',
    'City',
    'Pincode',
    'InsuranceProvider',
    'AgentName',
    'AgentCode',
    'AgentNumber',
    'Status',
  ];

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
    }
  downloadExcel() {
    let dateTim = new Date().toString();
    this.fileExportService.exportAsExcelFile(
      this.dataSource.data,
      'filedownload_' + dateTim
    );
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  showCustomerDetail(data: any) {
    this.oService.currentCustomer.next(data);
    this.navigatetoDetail.emit(1);
    // this.dialog.open(CustomerDetailComponent, { data: data });
  }
}
