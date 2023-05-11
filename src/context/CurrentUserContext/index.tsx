import * as React from 'react';
import * as Sentry from '@sentry/nextjs';
import { Geo } from '@vercel/edge';
import { AuthStatus } from 'constants/auth';
import { RequestStatus } from 'constants/requests';
import { GetCurrentUserQuery, useGetCurrentUserLazyQuery } from 'types/generated/client';
import api from 'services/client/api';
import { useSession } from 'hooks/useSession';

const IP_PATH = 'v1/ip';

interface IpResponse extends Geo {
  ip: string;
}

export type CurrentUserResponse =
  | (ReturnType<typeof useGetCurrentUserLazyQuery>[1] & {
      user?: GetCurrentUserQuery['usersByPk'] | null;
    })
  | null;
interface CurrentUser {
  currentUser: CurrentUserResponse;
  geo: null | (IpResponse & { requestStatus: RequestStatus });
}

const DEFAULT_USER: CurrentUser = {
  currentUser: null,
  geo: null,
};

export const CurrentUserContext = React.createContext(DEFAULT_USER);

export const CurrentUserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const session = useSession();
  const [ipResponse, setIpResponse] = React.useState<IpResponse | null>(null);
  const [ipRequestStatus, setIpRequestStatus] = React.useState(RequestStatus.Idle);
  const [queryFetch, queryResult] = useGetCurrentUserLazyQuery();
  const { data } = queryResult;

  React.useEffect(() => {
    if (!!session.userId && session.status === AuthStatus.User) {
      // NOTE: Should we check for firebase token here?
      // There are some edge race conditions where it's fetching without a token, but it seems rare and to not effect usability.
      queryFetch({ variables: { id: session.userId } });
    }
  }, [session.status, session.userId, queryFetch]);

  React.useEffect(() => {
    const fetchIp = async () => {
      setIpRequestStatus(RequestStatus.Loading);
      try {
        const data: IpResponse = await api.get(IP_PATH);
        setIpResponse({
          ...data,
          city: decodeURIComponent(data.city || ''),
          region: decodeURIComponent(data.region || ''),
        });
        setIpRequestStatus(RequestStatus.Success);
      } catch (error) {
        Sentry.captureException(error);
        setIpRequestStatus(RequestStatus.Error);
      }
    };
    fetchIp();
  }, []);

  // NOTE: This ensures we only return the current user if the session exists from firebase.
  // It is possible the current user could remain in the apollo cache and won't update until the useEffect above runs.
  const currentUser = { ...queryResult, user: session.userId ? data?.usersByPk : null };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        geo: { ...ipResponse, requestStatus: ipRequestStatus },
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
