import { APP_DEV } from 'constants/internal';
import stripe from 'services/server/stripe/instance';

interface Params {
  email: string;
  userId: string;
  username?: string;
}

const STRIPE_CONNECT_TYPE = 'express';
const DEFAULT_PAYOUT_DELAY_DAYS = 7;
const DEFAULT_PAYOUT_INTERVAL = 'daily';

export const createConnectAccount = async ({ email, userId, username = '' }: Params) => {
  let business_profile;

  if (username) {
    business_profile = {
      url:
        process.env.APP_STAGE === APP_DEV
          ? `<PROD_URL>/${username}`
          : `${process.env.APP_URL}/${username}`,
    };
  }
  const account = await stripe.accounts.create({
    type: STRIPE_CONNECT_TYPE,
    email,
    business_profile,
    metadata: {
      userId,
    },
    settings: {
      payouts: {
        schedule: {
          delay_days: DEFAULT_PAYOUT_DELAY_DAYS,
          interval: DEFAULT_PAYOUT_INTERVAL,
        },
      },
    },
  });

  return account;
};
