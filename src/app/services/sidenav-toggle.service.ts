import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavToggleService {

  private sidenavToggle = new BehaviorSubject<boolean>(true);
  currentState = this.sidenavToggle.asObservable();
  constructor() { }

  changeState(state: boolean) {
    this.sidenavToggle.next(state);
  }
}
