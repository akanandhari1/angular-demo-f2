import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { findLastKey } from 'lodash';
import { Observable } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private Authguardservice: AuthGuardService, private router: Router) {}  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      console.log('user',this.Authguardservice.getUser())

      if(!this.Authguardservice.getUser()){
        console.log('user',this.Authguardservice.getUser())
        return false;
      }
    return true;
  }
  
}
