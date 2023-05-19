import createInstance from './createInstance';

interface Params {
  firebaseId: string;
  email: string;
}

const createStripeUser = async ({ firebaseId, email }: Params) => {
  const stripe = createInstance();
  const stripeUser = await stripe.customers.create({
    email,
    metadata: {
      firebaseId,
    },
  });

  return stripeUser;
};

export default createStripeUser;
