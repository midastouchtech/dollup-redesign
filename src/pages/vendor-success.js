import Link from 'next/link';
import Layout from '@/components/layout';
export default function RegistrationSuccess() {
  return (
    <Layout>
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='bg-white p-8 rounded-lg shadow-lg text-center'>
          <h1 className='text-2xl font-semibold mb-4 text-pinkAccent'>
            Registration Successful!
          </h1>
          <p className='text-gray-700 mb-6'>
            Thank you for registering as a vendor! You can now log in to your
            dashboard.
          </p>
          <a
            className='text-white bg-pink-500 px-4 py-2 rounded-lg'
            href='http://localhost:3001/login'
          >
            Go to Login
          </a>
        </div>
      </div>
    </Layout>
  );
}
