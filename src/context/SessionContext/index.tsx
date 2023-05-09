import * as React from 'react';
import { AuthStatus } from 'constants/auth';
import { Viewer } from 'constants/user';
import { watchSessionTokenChanges } from 'services/client';

interface SessionUtils {
  checkIsSessionViewer: (userId: string) => boolean;
  isSessionLoading: boolean;
  isUserSession: boolean;
  isAnonymousSession: boolean;
}

const DEFAULT_VIEWER: Viewer = {
  status: AuthStatus.Loading,
  userId: null,
  firebaseAccount: null,
  config: null,
  claims: null,
};

export const SessionContext = React.createContext<Viewer & SessionUtils>({
  ...DEFAULT_VIEWER,
  checkIsSessionViewer: (_userId: string) => false,
  isSessionLoading: true,
  isUserSession: false,
  isAnonymousSession: false,
});

export const SessionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [session, setSession] = React.useState(DEFAULT_VIEWER);

  React.useEffect(() => {
    watchSessionTokenChanges(({ firebaseAccount, claims, userId }) => {
      if (firebaseAccount) {
        setSession({
          status: AuthStatus.User,
          firebaseAccount: firebaseAccount,
          userId,
          claims,
          config: null,
        });
      } else {
        setSession({
          status: AuthStatus.Anonymous,
          firebaseAccount: null,
          config: null,
          userId: null,
          claims: null,
        });
      }
    });
  }, []);

  return (
    <SessionContext.Provider
      value={{
        ...session,
        checkIsSessionViewer: (userId: string) => userId === session.userId,
        isSessionLoading: session.status === AuthStatus.Loading,
        isUserSession: session.status === AuthStatus.User,
        isAnonymousSession: session.status === AuthStatus.Anonymous,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
