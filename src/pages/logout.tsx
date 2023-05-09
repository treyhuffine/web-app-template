import * as React from 'react';
import { useApolloClient } from '@apollo/client';
import * as Sentry from '@sentry/nextjs';
import { useViewer } from 'hooks';
import { useRouter } from 'next/router';
import { AuthStatus } from 'constants/auth';
import { HOME_PAGE } from 'constants/pages';
// import { auth } from 'services/client/auth';
import Head from 'components/Head';

const Logout = () => {
  const router = useRouter();
  const viewer = useViewer();
  const client = useApolloClient();

  React.useEffect(() => {
    if (router.isReady && viewer.status === AuthStatus.Anonymous) {
      router.push(HOME_PAGE);
    }
  }, [router.isReady, viewer.status]);

  React.useEffect(() => {
    if (router.isReady && viewer.status === AuthStatus.User) {
      client
        .resetStore()
        // .then(() => auth.signOut())
        // .then(() => {
        //   router.push(LOGIN_PAGE);
        // })
        .catch((error) => Sentry.captureException(error));
    }
  }, [router.isReady, viewer, client]);

  return (
    <>
      <Head noIndex title="Log Out" description="Log out of your account." />
      <div>&nbsp;</div>
    </>
  );
};

export default Logout;
