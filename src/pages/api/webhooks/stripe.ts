import * as Sentry from '@sentry/nextjs';
import { parse } from 'content-type';
import { NextApiRequest, NextApiResponse } from 'next';
import getRawBody from 'raw-body';
import Stripe from 'stripe';
import { HttpMethods } from 'constants/http';
import stripe from 'services/server/stripe/instance';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const ACCOUNT_UPDATED: Stripe.WebhookEndpointCreateParams.EnabledEvent = 'account.updated';
const PAYMENT_METHOD_ATTACHED: Stripe.WebhookEndpointCreateParams.EnabledEvent =
  'payment_method.attached';
const PAYMENT_METHOD_AUTOMATICALLY_UPDATED: Stripe.WebhookEndpointCreateParams.EnabledEvent =
  'payment_method.automatically_updated';
const PAYMENT_METHOD_UPDATED: Stripe.WebhookEndpointCreateParams.EnabledEvent =
  'payment_method.updated';
const CHARGE_SUCCEEDED: Stripe.WebhookEndpointCreateParams.EnabledEvent = 'charge.succeeded';
const CHARGE_REFUNDED: Stripe.WebhookEndpointCreateParams.EnabledEvent = 'charge.refunded';
const CHARGE_REFUND_UPDATED: Stripe.WebhookEndpointCreateParams.EnabledEvent =
  'charge.refund.updated';
// const CHARGE_UPDATED: Stripe.WebhookEndpointCreateParams.EnabledEvent = 'charge.updated';
// | 'charge.dispute.closed'
// | 'charge.dispute.created'

// https://stripe.com/docs/billing/subscriptions/checkout
// https://stripe.com/docs/payments/checkout/fulfill-orders

const parseRawBody = async (req: NextApiRequest, limit: string | number) => {
  const contentType = parse(req.headers['content-type'] || 'text/plain');
  const { parameters } = contentType;
  const encoding = parameters.charset || 'utf-8';
  const buffer = await getRawBody(req, { encoding, limit });

  if (buffer) {
    const body = buffer.toString();
    return body;
  } else {
    throw new Error('Request did not contain a body');
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, headers } = req;

  if (method !== HttpMethods.Post) {
    res.setHeader('Allow', [HttpMethods.Post]);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const sig = headers['stripe-signature'] as string;
  let event: Stripe.Event;

  try {
    const body = await parseRawBody(req, '1mb');
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error) {
    Sentry.withScope((_scope) => {
      Sentry.captureException(error);
    });

    console.log('---- ERROR EVENT = ', error);
    // @ts-ignore
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    console.log('=== STRIPE WEBHOOK ===', JSON.stringify(event));
    switch (event.type) {
      case ACCOUNT_UPDATED: {
        // await handleAccountUpdated(event);
        break;
      }

      case PAYMENT_METHOD_ATTACHED: {
        // await handlePaymentMethodAttached(event);
        break;
      }
      case PAYMENT_METHOD_AUTOMATICALLY_UPDATED: {
        // await handlePaymentMethodAttached(event);
        break;
      }
      case PAYMENT_METHOD_UPDATED: {
        // await handlePaymentMethodAttached(event);
        break;
      }
      case CHARGE_SUCCEEDED: {
        // await handleChargeSucceeded(event);
        break;
      }
      case CHARGE_REFUNDED:
      case CHARGE_REFUND_UPDATED: {
        // await handleChargeRefund(event);
        break;
      }

      default:
        console.log('--- DID NOT MATCH', event.type);
        break;
    }
  } catch (error) {
    Sentry.withScope((_scope) => {
      Sentry.captureException(error);
    });
    Sentry.withScope((_scope) => {
      Sentry.captureException(error);
    });

    console.log('---- ERROR HANDLING WEBHOOK = ', error);
    // @ts-ignore
    return res.status(500).send(`Webhook Event Handler Error: ${error.message}`);
  }

  // Return a response to acknowledge receipt of the event
  return res.status(200).json({ received: true });
};

export default Sentry.withSentry(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
