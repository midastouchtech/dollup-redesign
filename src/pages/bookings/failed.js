// pages/payment-failed.js

import Head from 'next/head';
import Layout from '@/components/layout';
import Link from 'next/link';

const PaymentFailed = () => {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <Head>
          <title>Payment Failed</title>
          <meta name="description" content="Payment failed" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full flex items-center justify-center flex-col">
          <svg
            className="text-red-500 w-20 h-20 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <h1 className="text-3xl font-semibold text-gray-800 text-center mb-4">
            Payment Failed
          </h1>
          <p className="text-gray-600 text-center mb-4">
            Oops! There was an issue processing your payment. Please try again
            later.
          </p>
          <Link
            href="/checkout"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-red-400"
          >
            Try Again
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentFailed;
