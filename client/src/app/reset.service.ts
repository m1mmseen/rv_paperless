import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  private resetFormSubject = new Subject<void>();

  public resetFormAction$ = this.resetFormSubject.asObservable();

  public triggerResetForm() {
    this.resetFormSubject.next();
  }
  constructor() { }
}
