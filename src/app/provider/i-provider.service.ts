import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { InsuranceProvider } from '../modal/iInsuranceProvider';
import { providerFile } from '../modal/providerFile';
import { DcDetails } from '../modal/appointment';
import { iList } from '../modal/iListInterface';
@Injectable({
  providedIn: 'root',
})
export class IProviderService {
  constructor(private http: HttpClient) {
    this.currentCustomer = new BehaviorSubject<InsuranceProvider>(
      new InsuranceProvider()
    );
  }
  public currentCustomer: BehaviorSubject<InsuranceProvider>;
  public getState(): Observable<any> {
    return this.http.get('assets/masterData/states.json');
  }
  public LabTests: iList[] = [
    { id: 1, name: 'ECG' },
    { id: 2, name: 'CTMT' },
    { id: 3, name: 'X-Ray' },
    { id: 4, name: 'Urine Cotinine' },
    { id: 5, name: 'Thyroid' },
    { id: 6, name: '2D-Echo' },
    { id: 7, name: 'EEG' },
    { id: 8, name: 'CT Scan' },
    { id: 9, name: 'MRI Scan' },
    { id: 10, name: 'Diabetes' },
    { id: 11, name: 'Kidney Function' },
    { id: 12, name: 'Lipid Profile Test' },
    { id: 13, name: 'Vitamin B12' },
    { id: 14, name: 'Abdominal Check' },
    { id: 15, name: 'Liver Function' },
    { id: 16, name: 'CT Calcium Scoring' },
    { id: 17, name: 'Eye Checkup' },
  ];
  public ELEMENT_DATA: InsuranceProvider[] = [
    {
      PolicyId: '123456789',
      MemberId: 'Hydrogen',
      CustomerNo: '9442211232',
      CustomerName: 'Ravi ',
      Gender: 'male',
      DOB: '',
      Age: '28',
      Address: 'addresss',
      State: 'kerala',
      City: 'kozhikode',
      Pincode: '600893',
      AgentCode: 'code',
      AgentName: 'Nmae',
      AgentNumber: 'number',
      Status: 'inprogress',
      Reports: 'customer repot',
      InsuranceProvider: 'SBI',
      TPARequestId: '6',
      DateOfAppointment: new Date(),
      DateOfCreation: new Date(),
      OrderId: '12',
    },
    {
      PolicyId: '765441',
      MemberId: 'A12431',
      CustomerNo: '314512345678',
      CustomerName: 'Ram',
      Gender: 'male',
      DOB: '',
      Age: '28',
      Address: 'addresss',
      State: 'Tamilnadu',
      City: 'Karur',
      Pincode: '600893',
      AgentCode: 'code',
      AgentName: 'AGRAM',
      AgentNumber: '987654321',
      Status: 'inprogress',
      Reports: 'customer repot',
      InsuranceProvider: 'TATA AIG',
      TPARequestId: '5',
      DateOfAppointment: new Date(2023, 12, 1),
      DateOfCreation: new Date(),
      OrderId: '12',
    },
    {
      PolicyId: '661121',
      MemberId: 'B76543',
      CustomerNo: '765432198',
      CustomerName: 'Siva',
      Gender: 'male',
      DOB: '',
      Age: '30',
      Address: 'addresss',
      State: 'Tamilnadu',
      City: 'Chennai',
      Pincode: '600893',
      AgentCode: 'code',
      AgentName: 'ADRAM',
      AgentNumber: '876543219',
      Status: 'inprogress',
      Reports: 'customer repot',
      InsuranceProvider: '',
      TPARequestId: '1',
      DateOfAppointment: new Date(),
      DateOfCreation: new Date(),
      OrderId: '12',
    },
    {
      PolicyId: '665432',
      MemberId: 'Q123456',
      CustomerNo: '9442211232',
      CustomerName: 'Kumar ',
      Gender: 'male',
      DOB: '',
      Age: '28',
      Address: 'addresss',
      State: 'kerala',
      City: 'kozhikode',
      Pincode: '600893',
      AgentCode: 'code',
      AgentName: 'Nmae',
      AgentNumber: 'number',
      Status: 'inprogress',
      Reports: 'customer repot',
      InsuranceProvider: 'TATA AIG',
      TPARequestId: '2',
      DateOfAppointment: new Date(),
      DateOfCreation: new Date(),
      OrderId: '12',
    },
    {
      PolicyId: '765441',
      MemberId: 'A12431',
      CustomerNo: '314512345678',
      CustomerName: 'Suresh',
      Gender: 'male',
      DOB: '',
      Age: '28',
      Address: 'addresss',
      State: 'Tamilnadu',
      City: 'Karur',
      Pincode: '600893',
      AgentCode: 'code',
      AgentName: 'AGRAM',
      AgentNumber: '987654321',
      Status: 'inprogress',
      Reports: 'customer repot',
      InsuranceProvider: 'SBI',
      TPARequestId: '3',
      DateOfAppointment: new Date(),
      DateOfCreation: new Date(),
      OrderId: '12',
    },
    {
      PolicyId: '876543',
      MemberId: 'C345678',
      CustomerNo: '765432198',
      CustomerName: 'RUKU',
      Gender: 'male',
      DOB: '',
      Age: '30',
      Address: 'addresss',
      State: 'Tamilnadu',
      City: 'Chennai',
      Pincode: '600893',
      AgentCode: 'code',
      AgentName: 'ADRAM',
      AgentNumber: '876543219',
      Status: 'inprogress',
      Reports: 'customer repot',
      InsuranceProvider: '',
      TPARequestId: '4',
      DateOfAppointment: new Date(),
      DateOfCreation: new Date(),
      OrderId: '12',
    },
  ];
  public dcDetails: DcDetails[] = [
    {
      name: 'Vijaya Diagonostics',
      address: '12,block 2,anna nagar',
      city: 'Chennai',
      state: 'tamil nadu',
      pinCode: '600001',
      email: 'kk@VijayaDiagonostics',
      phoneNumber: 7654321098,
    },
    {
      name: 'Sk Diagonostics',
      address: '12,block 2,kk nagar',
      city: 'kanchipuram',
      state: 'tamil nadu',
      pinCode: '603001',
      email: 'ram@SkDiagonostics',
      phoneNumber: 9876543210,
    },
    {
      name: 'bk Diagonostics',
      address: '13,block 1,bk nagar',
      city: 'chegalpattu',
      state: 'tamil nadu',
      pinCode: '603001',
      email: 'ram@bkDiagonostics',
      phoneNumber: 8765432109,
    },
  ];
  public documentList(provider: any): providerFile[] {
    let sendData: providerFile[] = [];
    switch (provider) {
      case 'HDFC':
        let s = [
          {
            date: new Date('03-02-2023'),
            fileName: 'a.xlsx',
            isprocessed: false,
            downloadLink: 'http://www.google.com',
          },
          {
            date: new Date('04-01-2023'),
            fileName: 'b.xlsx',
            isprocessed: false,
            downloadLink: 'http://www.google.com',
          },
          {
            date: new Date('04-01-2023'),
            fileName: 'c.xlsx',
            isprocessed: false,
            downloadLink: 'http://www.google.com',
          },
          {
            date: new Date('04-01-2023'),
            fileName: 'd.xlsx',
            isprocessed: false,
            downloadLink: 'http://www.google.com',
          },
          {
            date: new Date('04-01-2023'),
            fileName: 'e.xlsx',
            isprocessed: false,
            downloadLink: 'http://www.google.com',
          },
          {
            date: new Date('05-12-2022'),
            fileName: 'f.xlsx',
            isprocessed: false,
            downloadLink: 'http://www.google.com',
          },
        ];
        sendData = s.map((t) => providerFile.from(t));
        break;
      case 'SBI':
        {
          let s = [
            {
              date: new Date('03-02-2023'),
              fileName: 'sbi_upload_03_02.xlsx',
              isprocessed: false,
              downloadLink: 'http://www.google.com',
            },
            {
              date: new Date('02-01-2023'),
              fileName: 'sbi_upload_04_01.xlsx',
              isprocessed: false,
              downloadLink: 'http://www.google.com',
            },
            {
              date: new Date('05-12-2022'),
              fileName: 'sbi_upload_04_12.xlsx',
              isprocessed: false,
              downloadLink: 'http://www.google.com',
            },
          ];
          sendData = s.map((t) => providerFile.from(t));
        }
        break;
      case 'TATA_AIG':
        {
          let s = [
            {
              date: new Date('13-02-2023'),
              fileName: 'tata_aig_upload_13_02.xlsx',
              isprocessed: false,
              downloadLink: 'http://www.google.com',
            },
            {
              date: new Date('14-01-2023'),
              fileName: 'tata_aig_upload_14_01.xlsx',
              isprocessed: false,
              downloadLink: 'http://www.google.com',
            },
            {
              date: new Date('02-12-2022'),
              fileName: 'tata_aig_upload_02_12.xlsx',
              isprocessed: false,
              downloadLink: 'http://www.google.com',
            },
          ];
          sendData = s.map((t) => providerFile.from(t));
        }
        break;
    }
    return sendData;
  }
  public search(): Observable<any> {
    return of(this.ELEMENT_DATA);
  }
  public labtest(): Observable<any> {
    return of(this.LabTests);
  }
  public getProviderFiles(provider: any): Observable<providerFile[]> {
    return of(this.documentList(provider));
  }
  public getDcDetails(pin: any): Observable<DcDetails[]> {
    if (pin.length > 0) {
      let filtereddcDetails = this.dcDetails.filter((s) => {
        return s.pinCode == pin;
      });
      return of(filtereddcDetails);
    } else {
      return of(this.dcDetails);
    }
  }
}
