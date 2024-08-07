// pages/signup.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import GoogleAutocomplete from 'react-google-autocomplete';
import Layout from '@/components/layout';
import Link from 'next/link';

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    cellphone: '',
    place: '',
    location: null,
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (place) => {
    setFormData({
      ...formData,
      address: place.formatted_address,
      location: place?.geometry?.location,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors({ ...errors, email: 'Please enter a valid email address' });
      return;
    }

    // Validate cellphone number format
    const cellphoneRegex = /^0[0-9]{9}$/;
    if (!cellphoneRegex.test(formData.cell)) {
      setErrors({
        ...errors,
        cell: 'Please enter a valid cellphone number with 10 digits starting with 0',
      });
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      setErrors({
        ...errors,
        password: 'Password must be at least 8 characters long',
      });
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, password: 'Passwords do not match' });
      return;
    }

    try {
      // Make a POST request to the signup API endpoint
      const formDataWithFullname = {
        ...formData,
        fullName: `${formData.firstName} ${formData.lastName}`,
      };
      const response = await fetch('/api/vendors/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithFullname),
      });

      if (response.ok) {
        // Signup successful, redirect to another page or show success message
        router.push('/vendor-success');
      } else {
        // Handle signup error
        console.error('Signup failed:', response.statusText);
        // Display error message to the user
      }
    } catch (error) {
      console.error('Signup failed:', error.message);
      // Display error message to the user
    }
  };

  return (
    <Layout>
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
        <Head>
          <title>Vendor Signup</title>
          <meta name='description' content='Signup page' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className='bg-white p-8  max-w-md w-full'>
          <h1 className='text-3xl font-semibold text-gray-800 text-center mb-4'>
            Vendor Sign Up
          </h1>
          <p className='text-gray-600 text-center mb-8'>
            Join us and start getting bookings for your salon.
          </p>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='firstName' className='block text-gray-700'>
                First Name
              </label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                className='py-4 px-4 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='lastName' className='block text-gray-700'>
                Last Name
              </label>
              <input
                type='text'
                id='lastName'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                className='py-4 px-4 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='lastName' className='block text-gray-700'>
                Store Name
              </label>
              <input
                type='text'
                id='storeName'
                name='storeName'
                value={formData.storeName}
                onChange={handleChange}
                className='py-4 px-4 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='py-4 px-4 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50'
                required
              />
              {errors.email && (
                <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700'>
                Cellphone number
              </label>
              <input
                type='telephone'
                id='cell'
                name='cell'
                value={formData.cell}
                onChange={handleChange}
                className='py-4 px-4 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50'
                required
              />
              {errors.cell && (
                <p className='text-red-500 text-xs mt-1'>{errors.cell}</p>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='location' className='block text-gray-700'>
                Location
              </label>
              <GoogleAutocomplete
                id='location'
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                placeholder='Enter your location'
                onSelect={handleLocationChange}
                options={{
                  types: ['street_address', 'sublocality'],
                  componentRestrictions: { country: 'za' },
                }}
                className='py-4 px-4 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50'
                required
              />
              {errors.location && (
                <p className='text-red-500 text-xs mt-1'>{errors.location}</p>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='block text-gray-700'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='py-4 px-4 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50'
                required
              />
              {errors.password && (
                <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='block text-gray-700'>
                Confirm Password
              </label>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                className='py-4 px-4 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50'
                required
              />
              {errors.password && (
                <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
              )}
            </div>
            <button
              type='submit'
              className='bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-pink-400 w-full'
            >
              Sign Up
            </button>
            <div className='flex mt-2'>
              <Link
                href='/login'
                className='text-center bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-gray-400 w-96'
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
