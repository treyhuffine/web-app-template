import * as Sentry from '@sentry/serverless';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { VALID_SIGNUP_REQUEST_TIMEOUT } from './services/constants';
import { getIsValidUsernameFormat } from './services/getIsValidUsernameFormat';
import insertUser from './services/graphql/mutations/insertUser';
import insertUserCommunicationPreferences from './services/graphql/mutations/insertUserCommunicationPreferences';
import upadateUsername from './services/graphql/mutations/updateUsername';
import checkUsernameAvailability from './services/graphql/queries/checkUsernameAvailability';
import getRecentSignupRequest from './services/graphql/queries/getRecentSignupRequest';
import createStripeUser from './services/stripe/createStripeUser';

Sentry.GCPFunction.init({
  dsn: process.env.SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// admin.initializeApp(functions.config().firebase);
admin.initializeApp();

exports.processSignUp = Sentry.GCPFunction.wrapEventFunction(
  functions.auth.user().onCreate(async (user) => {
    let userId = '';

    try {
      const stripeUser = await createStripeUser({ firebaseId: user.uid, email: user.email! });
      // GET SIGN UP REQUEST AND MAKE CHANGES IF NEEDED
      // - Validate username (and insert after so it doesn't fail for whatever reason and make them enter again later)

      const signupRequestResponse = await getRecentSignupRequest({ email: user.email || '' });
      const signupRequest = signupRequestResponse.signupRequests[0];
      let isValidRequestTime = false;

      if (signupRequest.createdAt) {
        isValidRequestTime =
          Date.now() - new Date(signupRequest.createdAt).getTime() <= VALID_SIGNUP_REQUEST_TIMEOUT;
      }

      const fullName = isValidRequestTime ? signupRequest?.fullName : '';
      const username = isValidRequestTime ? signupRequest?.username : '';
      const ipResponse = isValidRequestTime ? signupRequest?.fullDetails : {};

      const insertedUser = await insertUser({
        firebaseId: user.uid,
        email: user.email!,
        stripeCustomerId: stripeUser.id,
        latestAuthProvider: user.providerData[0].providerId,
        originalAuthProvider: user.providerData[0].providerId,
        fullName: fullName || user.displayName || '',
        identityData: user.providerData.map((d) => ({
          email: d.email,
          provider: d.providerId,
          phoneNumber: d.phoneNumber,
          displayName: d.displayName,
        })),
        city: signupRequest?.city || '',
        country: signupRequest?.country || '',
        ip: signupRequest?.ip || '',
        platform: signupRequest?.platform || '',
        region: signupRequest?.region || '',
        timezone: signupRequest?.timezone || '',
        zip: signupRequest?.zip || '',
        fullDetails: ipResponse || null,
      });
      functions.logger.log(insertedUser);
      userId = insertedUser?.insertUsersOne?.id;

      await insertUserCommunicationPreferences({
        id: userId,
      });

      const uploadUsername = username.toLowerCase();
      const availabilityRespone = await checkUsernameAvailability({ username: uploadUsername });

      if (
        username &&
        getIsValidUsernameFormat(uploadUsername) &&
        !availabilityRespone?.usernamesClaimed?.length &&
        !availabilityRespone?.usernamesActive?.length
      ) {
        await upadateUsername({ id: userId, username: uploadUsername });
      }
    } catch (error) {
      functions.logger.log('--- ERROR = ', error);
      // @ts-ignore this should exist
      Sentry.captureException(error);
    }

    // try {
    //   await addUserEmailToProvider(config, user.email!);
    // } catch (error) {
    //   functions.logger.log('--- ERROR = ', error);
    //   // @ts-ignore this should exist
    //   Sentry.captureException(error);
    // }

    const customClaims = {
      userId: userId,
      'https://hasura.io/jwt/claims': {
        'x-hasura-default-role': 'user',
        'x-hasura-allowed-roles': ['user', 'anonymous'],
        'x-hasura-user-id': userId,
        'x-hasura-subscriptions': '{}',
      },
    };

    return admin
      .auth()
      .setCustomUserClaims(user.uid, customClaims)
      .then(() => {
        // Update real-time database to notify client to force refresh.
        const metadataRef = admin.database().ref('metadata/' + user.uid);
        // Set the refresh time to the current UTC timestamp.
        // This will be captured on the client to force a token refresh.
        return metadataRef.set({ refreshTime: Date.now() });
      })
      .catch((error) => {
        functions.logger.log('--- ERROR = ', error);
        // @ts-ignore this should exist
        Sentry.captureException(error);
      });
  }),
);
