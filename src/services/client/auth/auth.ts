import { captureException } from '@sentry/react';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebase';

export interface Credentials {
  email: string;
  password: string;
}

export const handleSignup = async ({
  email,
  password,
}: Credentials): Promise<void | UserCredential> =>
  createUserWithEmailAndPassword(auth, email, password)
    .then(function (user) {
      return user;
    })
    .catch((error) => {
      captureException(error);
    });

export const handleLogin = async ({
  email,
  password,
}: Credentials): Promise<void | UserCredential> =>
  signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      return user;
    })
    .catch((error) => {
      captureException(error);
    });
