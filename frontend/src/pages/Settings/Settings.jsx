/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import onError from '../../lib/errorLib';
import BillingForm from '../../components/BillingForm/BillingForm';
import './Settings.css';
import config from '../../config';

const stripePromise = loadStripe(config.STRIPE_KEY);

export default function Settings() {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function billUser(details) {
    return API.post('notes', '/billing', {
      body: details,
    });
  }

  async function handleFormSubmit(storage, { token, error }) {
    if (error) {
      onError(error);
      return;
    }

    setIsLoading(true);

    try {
      await billUser({
        storage,
        source: token.id,
      });

      alert('Your card has been charged successfully!');
      nav('/');
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className='Settings'>
      <Elements
        stripe={stripePromise}
        fonts={[
          {
            cssSrc:
              'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800',
          },
        ]}
      >
        <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
      </Elements>
    </div>
  );
}
