import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InsuranceProvider } from 'src/app/modal/iInsuranceProvider';
import { iList } from 'src/app/modal/iListInterface';
import { IProviderService } from 'src/app/provider/i-provider.service';
import { SharedExportService } from 'src/app/shared-export.service';

const ELEMENT_DATA: InsuranceProvider[] = [
  {
    TPARequestId: '',
    PolicyId: '123456789',
    MemberId: 'Hydrogen',
    CustomerNo: 'Name',
    CustomerName: 'H12NameName13432543144 ',
    Gender: 'male',
    DOB: '12/12/2011',
    Age: '32',
    Address: 'addresss',
    State: 'kerala',
    City: 'kozhikode',
    Pincode: '600893',
    AgentCode: 'code',
    AgentName: 'Nmae',
    AgentNumber: 'number',
    Status: 'inprogress',
    Reports: 'customer repot',
  },
  {
    TPARequestId: '',
    PolicyId: '2',
    MemberId: 'Hydrogen',
    CustomerNo: 'Name',
    CustomerName: 'H',
    Gender: 'male',
    DOB: '12/12/2011',
    Age: '32',
    Address: 'addresss',
    State: 'kerala',
    City: 'kozhikode',
    Pincode: '600893',
    AgentCode: 'code',
    AgentName: 'Nmae',
    AgentNumber: 'number',
    Status: 'inprogress',
    Reports: 'customer repot',
  },
  {
    TPARequestId: '',
    PolicyId: '3',
    MemberId: 'Hydrogen2',
    CustomerNo: 'Name3',
    CustomerName: 'H',
    Gender: 'female',
    DOB: '12/12/2011',
    Age: '32',
    Address: 'addresss',
    State: 'kerala',
    City: 'kozhikode',
    Pincode: '600893',
    AgentCode: 'code',
    AgentName: 'Nmae',
    AgentNumber: 'number',
    Status: 'inprogress',
    Reports: 'customer repot',
  },
  {
    TPARequestId: '',
    PolicyId: '4',
    MemberId: 'Hydrogen4',
    CustomerNo: 'Name',
    CustomerName: 'H',
    Gender: 'male',
    DOB: '12/12/2011',
    Age: '32',
    Address: 'addresss',
    State: 'kerala',
    City: 'kozhikode',
    Pincode: '600893',
    AgentCode: 'code',
    AgentName: 'Nmae',
    AgentNumber: 'number',
    Status: 'inprogress',
    Reports: 'customer repot',
  },
  {
    TPARequestId: '',
    PolicyId: '5',
    MemberId: 'Hydrogen',
    CustomerNo: 'Name',
    CustomerName: 'H',
    Gender: 'male',
    DOB: '12/12/2011',
    Age: '32',
    Address: 'addresss',
    State: 'kerala',
    City: 'kozhikode',
    Pincode: '600893',
    AgentCode: 'code',
    AgentName: 'Nmae',
    AgentNumber: 'number',
    Status: 'inprogress',
    Reports: 'customer repot',
  },
  {
    TPARequestId: '',
    PolicyId: '6',
    MemberId: 'Hydrogen11',
    CustomerNo: 'Name',
    CustomerName: 'H12NameName13432543144',
    Gender: 'male',
    DOB: '12/12/2011',
    Age: '32',
    Address: 'addresss',
    State: 'kerala',
    City: 'kozhikode',
    Pincode: '600893',
    AgentCode: 'code',
    AgentName: 'Nmae',
    AgentNumber: 'number',
    Status: 'inprogress',
    Reports: 'customer repot',
  },
];
@Component({
  selector: 'app-insurance-provider-home',
  templateUrl: './insurance-provider-home.component.html',
  styleUrls: ['./insurance-provider-home.component.scss'],
})
export class InsuranceProviderHomeComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'PolicyId',
    'MemberId',
    'CustomerNo',
    'CustomerName',
    'Gender',
    'DOB',
    'Age',
    'Address',
    'State',
    'City',
    'Pincode',
    'AgentCode',
    'AgentName',
    'AgentNumber',

    'Reports',
  ];

  dataSource: MatTableDataSource<InsuranceProvider>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  readonly form = this.createForm();

  constructor(
    public oService: IProviderService,
    public fb: FormBuilder,
    public fileExportService: SharedExportService
  ) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  createForm() {
    return this.fb.group({
      PolicyId: [null],
      MemberId: [null],
      CustomerName: [null],
      MobileNumber: [null],
      OrderID: [null],
      StartDate: [null],
      EndDate: [null],
    });
  }
  reset() {
    this.form.reset();
  }
  downloadCsv() {
    console.log(this.dataSource.data);
    this.fileExportService.exportAsExcelFile(
      this.dataSource.data,
      'filedownload'
    );
    //this.fileExportService.exportToCsv(this.dataSource.data, 'text/csv');
  }
}
