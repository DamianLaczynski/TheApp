export type IdleState = { state: 'IDLE' };

type RegisterState = { state: AUTH_STATE_VALUE['REGISTER']};

type LoginState = { state: AUTH_STATE_VALUE['LOGIN']};

export type LoggedInState = { state: AUTH_STATE_VALUE['LOGGED_IN'] };

export type NotLoggedInState = { state: AUTH_STATE_VALUE['NOT_LOGGED_IN'] };

type AUTH_STATE_VALUE = typeof AUTH_STATE_VALUE;

export const AUTH_STATE_VALUE = {
  IDLE: 'IDLE',
  REGISTER: 'REGISTER',
  LOGIN: 'LOGIN',
  LOGGED_IN: 'LOGGED_IN',
  NOT_LOGGED_IN: 'NOT_LOGGED_IN',
  AUTHENTICATION_ERROR_STATE: 'AUTHENTICATION_ERROR_STATE',
} as const;

export type AuthStateValue = keyof typeof AUTH_STATE_VALUE;

export type AuthState =
  | IdleState
  | RegisterState
  | LoginState
  | NotLoggedInState
  | LoggedInState;
