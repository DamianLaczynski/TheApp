import { Injectable, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Token } from '../model/token';
import { AUTH_STATE_VALUE, AuthState } from '../../utils/auth-state.type';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {

  private $authState = signal<AuthState>({ state: AUTH_STATE_VALUE.IDLE });


  state$ = toObservable(this.$authState);

  constructor() {
  }

  setRegisterState()
  {
    this.$authState.set({ state: AUTH_STATE_VALUE.REGISTER});
  }

  setLogInState()
  {
    this.$authState.set({ state: AUTH_STATE_VALUE.LOGIN });
  }

  setLoggedInState()
  {
    this.$authState.set({ state: AUTH_STATE_VALUE.LOGGED_IN });
  }

  setNotLoggedInState()
  {
    this.$authState.set({ state: AUTH_STATE_VALUE.NOT_LOGGED_IN });
  }


}
