import stripe from 'services/server/stripe/instance';

interface Params {
  id: string;
  email: string;
}

const createStripeUser = async ({ id, email }: Params) => {
  const stripeUser = await stripe.customers.create({
    email,
    metadata: {
      id,
    },
  });

  return stripeUser;
};

export default createStripeUser;
