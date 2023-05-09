import { HASURA_CLAIMS_KEY } from 'constants/auth';
import { HasuraClaims } from 'constants/auth';
import { User } from 'firebase/auth';
import { onAuthStateChanged, onIdTokenChanged } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { auth, database } from 'services/client/auth/firebase';

export type FirebaseAccountOrNull = User | null;
type TokenOrNull = string | null;
interface UpdateResponse {
  firebaseAccount: FirebaseAccountOrNull;
  token: TokenOrNull;
  userId: string | null | undefined;
  claims: HasuraClaims | null;
}
type FirebaseCallback = ({ firebaseAccount, token }: UpdateResponse) => void;

// const MINUTE = 60 * 1000;
// const HOUR = 60 * MINUTE;
// const DAY = 24 * HOUR;
// const FIREBASE_REFRESH_POLL_TIME = 20 * MINUTE;
// const MAX_LOGIN_TIME = 7 * DAY;

let token: TokenOrNull = null;

export const updateViewerToken = (
  user: FirebaseAccountOrNull,
  shouldForceRefresh?: boolean,
): Promise<UpdateResponse> => {
  return new Promise(async (resolve) => {
    if (user) {
      const firebaseToken = await user.getIdToken(shouldForceRefresh);
      const idTokenResult = await user.getIdTokenResult();
      const userId = idTokenResult.claims.userId as string;
      const hasuraClaim = idTokenResult.claims[HASURA_CLAIMS_KEY] as HasuraClaims;
      token = firebaseToken;

      if (hasuraClaim) {
        return resolve({ firebaseAccount: user, token, userId, claims: hasuraClaim });
      } else {
        // NOTE: This is using the older Firebase database, but since it's transient data, it should be trivial to change or even simply use a Poll to look for claims
        // Check if refresh is required.
        const metadataRef = ref(database, 'metadata/' + user.uid + '/refreshTime');

        onValue(metadataRef, async (data) => {
          if (!data.exists()) return;
          // Force refresh to pick up the latest custom claims changes.
          token = await user.getIdToken(true);
          const idTokenResult = await user.getIdTokenResult();
          const userId = idTokenResult.claims.userId as string;
          const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims'] as HasuraClaims;

          return resolve({ firebaseAccount: user, token, userId, claims: hasuraClaim });
        });
      }
    } else {
      token = null;
      return resolve({ firebaseAccount: user, token, userId: null, claims: null });
    }
  });
};

// NOTE: This should probably be a React hook and manage sub/unsub of these methods.
// However, with the client-side routing, it seems to only mount once and work correctly,
// but should be monitored for potential leaks.
export const watchSessionTokenChanges = (callback: FirebaseCallback) => {
  onAuthStateChanged(auth, async (user) => {
    updateViewerToken(user, true).then((res: UpdateResponse) => callback(res));
  });
  onIdTokenChanged(auth, async (user) => {
    updateViewerToken(user).then((res: UpdateResponse) => callback(res));
  });
};

export const getViewerToken = async () => {
  const currentUserToken = await auth?.currentUser?.getIdToken();
  return currentUserToken;
};

export const getAuthHeaders = async () => {
  const token = await getViewerToken();

  if (!token) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
