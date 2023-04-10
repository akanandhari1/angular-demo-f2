import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsuranceProviderService {

  constructor(private http: HttpClient) {}
  public getState(): Observable<any> {
    return this.http.get('assets/masterData/states.json');
  }
}
