import Stripe from 'stripe';

const API_VERSION = '2022-08-01';

const createInstance = () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: API_VERSION,
    typescript: true,
  });

  return stripe;
};

export default createInstance;
