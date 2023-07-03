import handler from '@my-sst-app/core/handler';
import Stripe from 'stripe';
import {calculateCost} from '../../core/src/core';
import {config} from 'process';

export const main = handler(async (event: any) => {
  const {storage, source} = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = 'Scratch charge';

  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

  if (!STRIPE_SECRET_KEY) {
    throw new Error('Missing Stripe Key');
  }

  // now STRIPE_SECRET_KEY is a `string`, not a `string | undefined`
  // also add missing `apiVersion`
  const stripe = new Stripe(STRIPE_SECRET_KEY, {apiVersion: '2022-11-15'});

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: 'usd'
  });

  return {status: true};
});
