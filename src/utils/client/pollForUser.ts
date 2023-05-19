// @ts-nocheck
const POLL_TIME_MS = 250;
const ONE_MINUTE = 60 * 1000;
const MAX_POLLS = ONE_MINUTE / POLL_TIME_MS;

type Resolve = (value: unknown) => void;
type Reject = (reason?: any) => void;

export const pollForUser = (client: ApolloClient<object>, user: FirebaseUserOrNull) => {
  let requestMade = 0;
  let success = false;

  if (!user?.uid) {
    return Promise.reject(new Error('Did not have a valid user ID'));
  }

  const makeQuery = async (resolve: Resolve, reject: Reject) => {
    requestMade = requestMade + 1;

    if (requestMade === MAX_POLLS) {
      reject(new Error('User poll timed out'));
    }

    const result = await client.query({
      query: GET_AUTH_USER,
      variables: { firebaseId: user.uid },
      fetchPolicy: 'no-cache',
    });

    if (result.errors) {
      return reject(result.errors);
    } else if (result.data && result.data.users?.length) {
      success = true;
      return resolve(result.data.users[0]);
    } else if (!success) {
      setTimeout(makeQuery, POLL_TIME_MS, resolve, reject);
    }
  };

  return updateViewerToken(user, true).then((resp) => {
    if (!resp.token) {
      throw new Error('Could not find user token');
    }

    return new Promise(makeQuery);
  });
};
