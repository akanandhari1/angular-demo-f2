import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export interface InsuranceProviderFormValue {
  PolicyId: string;
  MemberId: string;
  CustomerName: string;
  MobileNumber: string;
  OrderID: string;
  StartDate: string;
  EndDate: string;
}

export class InsuranceProvider {
  TPARequestId: string = '';
  PolicyId: string = '';
  MemberId: string = '';
  CustomerName: string = '';
  CustomerNo: string = '';
  Gender: string = '';
  DOB: string = '';
  Age: string = '';
  Address: string = '';
  State: string = '';
  City: string = '';
  Pincode: string = '';
  AgentName: string = '';
  AgentCode: string = '';
  AgentNumber: string = '';
  Status: string = '';
  Reports: string = '';
  InsuranceProvider?: string = '';
  DateOfAppointment?: Date;
  DateOfCreation?: Date;
  OrderId?: string = '';
  LabTests?: any = '';
  // constructor() {}
  static createForm(data: InsuranceProvider, disableField = true): FormGroup {
    let fb: FormBuilder = new FormBuilder();
    return fb.group({
      InsuranceProvider: [
        { value: data.InsuranceProvider, disabled: disableField },
        [Validators.required],
      ],
      PolicyNo: [
        { value: data.PolicyId, disabled: disableField },
        [Validators.required],
      ],
      MemberId: [{ value: data.MemberId, disabled: disableField }],
      AgentName: [{ value: data.AgentName, disabled: disableField }],
      AgentCode: [{ value: data.AgentCode, disabled: disableField }],
      AgentNumber: [
        { value: data.AgentNumber, disabled: disableField },
        [Validators.maxLength(10)],
      ],
      CustomerName: [{ value: data.CustomerName, disabled: disableField }],
      Gender: [
        { value: data.Gender, disabled: disableField },
        [Validators.required],
      ],
      DOB: [{ value: data.DOB, disabled: disableField }],
      CustomerNo: [
        { value: data.CustomerNo || '', disabled: disableField },
        [Validators.maxLength(10)],
      ],
      City: [
        { value: data.City || '', disabled: disableField },
        [Validators.required],
      ],
      State: [
        { value: data.State || '', disabled: disableField },
        [Validators.required],
      ],
      Pincode: [
        { value: data.Pincode || '', disabled: disableField },
        [Validators.required, Validators.maxLength(10)],
      ],
      LabTests: [
        { value: data.LabTests || '', disabled: disableField },
        [Validators.required],
      ],
    });
  }
}
