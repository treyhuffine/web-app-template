import { AuthStatus, HasuraClaims } from 'constants/auth';
import { User } from 'firebase/auth';

// TODO: Have a config param as well to load user settings from the DB
export interface Viewer {
  status: AuthStatus;
  firebaseAccount: User | null;
  config: null;
  claims: HasuraClaims | null;
  userId: string | null | undefined;
}

export enum Role {
  User = 'user',
  Admin = 'admin',
  Anonymous = 'anonymous',
}

export enum Theme {
  Dark = 'DARK',
  Light = 'LIGHT',
}

export const MAX_SNACKBARS = 3;
export const SHACKBAR_AUTOHIDE_DURATION = 2000; // ms
