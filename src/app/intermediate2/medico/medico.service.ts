import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  algo: any;
  constructor(public http: HttpClient) { }
  getMedicos (): Observable<any> {
    return this.http.get('...');
  }
}
