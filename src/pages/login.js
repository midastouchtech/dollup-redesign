// pages/login.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Layout from '@/components/layout';
import {connect } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const Login = ({ login }) => {
  const params = useSearchParams();
  const backToParam = params.get('backto');
  console.log("backto=",backToParam)
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };

    try {
      // Make a POST request to the login API endpoint
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        // If login successful, parse response JSON and store token in a cookie
        const { user } = await response.json();
        Cookies.set('dollup_client_user', JSON.stringify(user));
        login(user) // dispatch the user to the store
        // Redirect user to dashboard or another protected route
        if(backToParam){
            window.location.href = backToParam;
        }
        else{
            router.push('/dashboard');
        }
      } else {
        // If login fails, handle error accordingly
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <Layout>
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-8  max-w-md w-full'>
          <h1 className='text-2xl font-semibold mb-4 text-center'>Welcome back!</h1>
          <p className='text-gray-600 text-center mb-8'>Please log in to your account to access your dashboard and manage your bookings.
            If you don't have an account yet, you can sign up for free.
            </p>
          <form onSubmit={handleLogin} >
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700'>
                Email
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='py-4 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='block text-gray-700'>
                Password
              </label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='py-4 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50'
                required
              />
            </div>
            {error && <div className='text-red-600 mb-4'>{error}</div>}
            <button
              type='submit'
              className='bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-pink-400 w-full'
            >
              Login
            </button>
            <div className='flex mt-2'>
            <Link
             href="/signup"
             className='text-center bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-gray-400 w-96'
            >
              Sign up
            </Link>
            </div>
            
          </form>
          
        </div>
      </div>
    </Layout>
  );
};

const mapDispatchToProps = dispatch => ({
    login: (user) =>dispatch({
        type: "LOGIN",
        payload: user
    })
})

export default connect(null, mapDispatchToProps)(Login);
