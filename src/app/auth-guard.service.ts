import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from './modal/login';

const User_data: User[] = [
  {
    UserName: 'customer',
    role: 'customer',
  },
  {
    UserName: 'QC',
    role: 'QC',
  },
  {
    UserName: 'Manager',
    role: 'manager',
  },
  {
    UserName: 'provider',
    role: 'provider',
  },
];
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor() {}
  public LoginUser: BehaviorSubject<any> = new BehaviorSubject(null);
  getUser() {
    return !!localStorage.getItem('SessionUser');
  }
  login(userName: string): Observable<any> {
    const user: User = User_data.find(
      (x) => x.UserName.toLowerCase() === userName.toLowerCase()
    ) as User;
    console.log('user', user);

    if (user != undefined && user != null) {
      console.log('user', user);
      localStorage.setItem('SessionUser', user.UserName);
      localStorage.setItem('SessionUserRole', user.role);
    }
    return of(user);
  }
}
