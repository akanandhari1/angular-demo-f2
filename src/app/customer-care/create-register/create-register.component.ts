import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { iList } from 'src/app/modal/iListInterface';
import { IProviderService } from 'src/app/provider/i-provider.service';
import { MatSelect } from '@angular/material/select';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-create-register',
  templateUrl: './create-register.component.html',
  styleUrls: ['./create-register.component.scss'],
})
export class CreateRegisterComponent implements OnInit {
  readonly form = this.createForm();
  public SelectedLabTests: any;
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
  select: AbstractControl = this.form.controls['LabTests'];
  private _data = new BehaviorSubject<any[]>(this.LabTests);
  data$ = this._data.asObservable();

  constructor(
    public oService: IProviderService,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.oService.getState().subscribe((states) => {
      this.stateList = states.map((s: any) => {
        return s.state;
      });
      console.log(this.stateList);
    });
    this.oService.labtest().subscribe((re) => {
      this.LabTests = re;
    });
  }

  valueChanged(e: any) {
    console.log(`Value is: ${e}`);
    this.select.setValue(e);
  }

  searchChanged(e: any) {
    console.log(`Search by: ${e}`);
    let val = e ? e.trim() : null;
    if (!val) {
      this._data.next(this.LabTests);
      return;
    } else {
      val = val.toLowerCase();
    }
    this._data.next(this.getAllThatContain(val));
  }

  getAllThatContain(val: string): string[] {
    return this.LabTests.filter(
      (i: iList) => i.name.toLowerCase().indexOf(val.toLowerCase()) > -1
    ).map((val) => val.name);
  }
  ngOnInit(): void {
    console.log(this.form.get('InsuranceProvider'));
  }
  onFormSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this._snackBar.open('Submitted successfully', 'Close', {
        panelClass: 'success-snackbar',
        duration: 6000,
        verticalPosition: 'top', // Allowed values are  'top' | 'bottom'
        horizontalPosition: 'center', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      });
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      InsuranceProvider: [null, [Validators.required]],
      PolicyNo: [null, [Validators.required]],
      MemberId: [null],
      AgentName: [null],
      AgentCode: [null],
      AgentNo: [
        null,
        [
          Validators.minLength(10),
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ],
      ],
      CustomerName: [null],
      Gender: [null, [Validators.required]],
      DOB: [null],
      CutomerNo: [
        null,
        [
          Validators.minLength(10),
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ],
      ],
      city: [null, [Validators.required]],
      State: [null, [Validators.required]],
      Pincode: [null, [Validators.required, Validators.maxLength(6)]],
      LabTests: [null, [Validators.required]],
    });
  }
  reset() {
    this.form.reset();
    this.form.setValue({}, { emitEvent: false });
    this.form.markAsUntouched();
    this.form.markAsPristine();
  }
}
