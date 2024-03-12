// pages/payment-success.js

import Head from 'next/head';
import Layout from '@/components/layout';
import Link from 'next/link';

const PaymentSuccess = () => {
  return (
    <Layout>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Head>
        <title>Payment Success</title>
        <meta name="description" content="Payment successful" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full flex items-center justify-center flex-col">
        <svg
          className="text-green-500 w-20 h-20 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-4">
          Payment Successful
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Your payment has been successfully processed. Thank you for booking
          with us!
        </p>
        <Link href="/" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-green-400">
          Continue Browsing
        </Link>
      </div>
    </div>
    </Layout>
  );
};

export default PaymentSuccess;
