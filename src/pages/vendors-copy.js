import { useState } from 'react';
import Layout from '@/components/layout';
import Autocomplete from 'react-google-autocomplete';

const VendorsPage = () => {
  const [formData, setFormData] = useState({
    salonName: '',
    ownerName: '',
    storeEmail: '',
    storePhoneNumber: '',
    location: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '', // Clear the error when the user starts typing
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.storeEmail || !emailRegex.test(formData.storeEmail)) {
      newErrors.storeEmail = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate phone number
    const phoneRegex = /^0\d{9}$/;
    if (
      !formData.storePhoneNumber ||
      !phoneRegex.test(formData.storePhoneNumber)
    ) {
      newErrors.storePhoneNumber =
        'Please enter a valid 10-digit phone number starting with 0';
      isValid = false;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Perform the form submission logic, e.g., send data to the server
      // You can use formData to access the captured data
      console.log('Form submitted:', formData);
    } else {
      console.log('Form has errors. Please fix them before submitting.');
    }
  };

  const handlePlaceSelect = (place) => {
    const { formatted_address, geometry } = place;
    const { lat, lng } = geometry.location;
    setFormData({
      ...formData,
      location: { address: formatted_address, lat, lng },
    });
  }

  return (
    <Layout>
      <div className='container mx-auto p-10 bg-white text-gray-700'>
        <h1 className='text-4xl font-bold mb-6'>
          Join Dollup and Boost Your Salon!
        </h1>
        <p className='mb-6'>
          Welcome to Dollup, where we empower salon owners like you to thrive in
          the digital age. Here are some fantastic reasons to join our platform:
        </p>


        <ul className='list-disc pl-6 mb-6'>
          <li>Expand your clientele by reaching a broader audience online.</li>
          <li>
            Effortlessly manage appointments and bookings with our user-friendly
            system.
          </li>
          <li>
            Promote your unique services to potential clients searching for
            beauty and wellness solutions.
          </li>
          <li>
            Showcase your talented stylists and their expertise to attract more
            customers.
          </li>
          <li>
            Boost your salon's visibility with our targeted marketing
            strategies.
          </li>
          <li>
            Seamlessly sell your custom beauty products alongside your services.
          </li>
        </ul>

        <p className='mb-6'>
          Join Dollup now and elevate your salon's success! Fill out the form
          below to get started.
        </p>

        <div className='flex flex-col md:flex-row'>
        <form onSubmit={handleSubmit} className='w-/12'>
          {/* Form fields */}
          {/* Add your own styling based on Tailwind CSS classes */}
          <div className='mb-4'>
            <label htmlFor='salonName' className='block text-sm font-medium'>
              Salon Name
            </label>
            <input
              type='text'
              id='salonName'
              name='salonName'
              value={formData.salonName}
              onChange={handleChange}
              className='form-input px-4 py-2 w-full border border-gray-300 rounded mt-2 focus:outline-none focus:border-pink-500'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='storeEmail' className='block text-sm font-medium'>
              Email
            </label>
            <input
              type='text'
              id='storeEmail'
              name='storeEmail'
              value={formData.storeEmail}
              onChange={handleChange}
              className='form-input px-4 py-2 w-full border border-gray-300 rounded mt-2 focus:outline-none focus:border-pink-500'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='storePhoneNumber' className='block text-sm font-medium'>
              Cellphone Number
            </label>
            <input
              type='text'
              id='storePhoneNumber'
              name='storePhoneNumber'
              value={formData.storePhoneNumber}
              onChange={handleChange}
              className='form-input px-4 py-2 w-full border border-gray-300 rounded mt-2 focus:outline-none focus:border-pink-500'
              required
            />
          </div>
          <div className='mb-4'>
            <Autocomplete
              className='form-input px-4 py-2 w-full border border-gray-300 rounded mt-2 focus:outline-none focus:border-pink-500'
              apiKey={'AIzaSyDka_7ppWokFIBPOxpKQ41NfgP6Q1Q3JBM'}
              onPlaceSelected={(place) => {
                handlePlaceSelect(place);
              }}
              options={{
                types: ['(regions)'],
                componentRestrictions: { country: 'za' },
              }}
            />
            </div>

          <div className='mb-4'>
            <label htmlFor='password' className='block text-sm font-medium'>
              Password
            </label>
            <input
              type='text'
              id='password'
              name='password'
              value={formData.storePhoneNumber}
              onChange={handleChange}
              className='form-input px-4 py-2 w-full border border-gray-300 rounded mt-2 focus:outline-none focus:border-pink-500'
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='confirmPassword' className='block text-sm font-medium'>
              Confirm Password
            </label>
            <input
              type='text'
              id='confirmPassword'
              name='confirmPassword'
              value={formData.storePhoneNumber}
              onChange={handleChange}
              className='form-input px-4 py-2 w-full border border-gray-300 rounded mt-2 focus:outline-none focus:border-pink-500'
              required
            />
          </div>

            

          {/* Repeat the pattern for other form fields */}

          {/* Display validation errors */}
          {errors.storeEmail && (
            <p className='text-red-500 text-sm mb-4'>{errors.storeEmail}</p>
          )}

          {/* Repeat the pattern for other form fields */}

          {/* Submit button */}
          <div className='mt-6'>
            <button
              type='submit'
              className='bg-pink-500 text-white px-4 py-2 rounded'
            >
              Join Dollup
            </button>
          </div>
        </form>
        </div>
      </div>
    </Layout>
  );
};

export default VendorsPage;
