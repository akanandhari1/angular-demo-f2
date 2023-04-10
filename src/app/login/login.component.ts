import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';
import { User } from '../modal/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public readonly form = this.createForm();
  hide = true;
  IsInvalidCredentials = false;

  constructor(
    public fb: FormBuilder,
    public authservice: AuthGuardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.setItem('SessionUser', this.form.value.UserName);
  }
  onFormSubmit() {
    if (!this.form.valid) {
      this.form.markAsTouched();
      return;
    }
    this.authservice.login(this.form.value.UserName).subscribe(
      (val) => {
        console.log(val);
        this.IsInvalidCredentials = false;
        if (val === undefined || val === null) {
          this.IsInvalidCredentials = true;
        } else {
          if (val.role === 'provider') {
            this.router.navigate(['./insuranceProvider']);
          } else if (val.role === 'QC') {
            this.router.navigate(['./qc']);
          } else if (val.role === 'manager') {
            this.router.navigate(['./shc']);
          } else if (val.role === 'customer') {
            this.router.navigate(['./home']);
          }
          this.authservice.LoginUser.next(val);
        }
      },
      (err) => {
        this.IsInvalidCredentials = true;
      }
    );
  }
  createForm() {
    return this.fb.group({
      UserName: [null, Validators.required],
      Password: [null, Validators.required],
    });
  }
}
