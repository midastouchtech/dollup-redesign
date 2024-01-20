import { useState } from 'react';
import Layout from '@/components/layout';
import Autocomplete from 'react-google-autocomplete';
import Image from 'next/image';

const VendorsPage = () => {
  const [formData, setFormData] = useState({
    salonName: '',
    ownerName: '',
    salonCellphoneNumber: '',
    location: '',
    password: '',
    confirmPassword: '',
    ownerCellphoneNumber: '',
    salonEmail: '',
    ownerEmail: '',
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
    if (!formData.salonEmail || !emailRegex.test(formData.salonEmail)) {
      newErrors.salonEmail =
        'Please enter a valid email address for your salon';
      isValid = false;
    }

    if (!formData.ownerEmail || !emailRegex.test(formData.ownerEmail)) {
      newErrors.ownerEmail =
        'Please enter a valid email address for your email address';
      isValid = false;
    }

    // Validate phone number
    const phoneRegex = /^0\d{9}$/;
    if (
      !formData.salonCellphoneNumber ||
      !phoneRegex.test(formData.salonCellphoneNumber)
    ) {
      newErrors.salonCellphoneNumber =
        'Please enter a valid 10-digit phone number starting with 0';
      isValid = false;
    }

    if (
      !formData.ownerCellphoneNumber ||
      !phoneRegex.test(formData.ownerCellphoneNumber)
    ) {
      newErrors.ownerCellphoneNumber =
        'Please enter a valid 10-digit phone number starting with 0 for your cell number';
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form data:', formData);

    if (validateForm()) {
      // Perform the form submission logic, e.g., send data to the server
      // You can use formData to access the captured data
      console.log('Form submitted:', formData);
      const sanitizedData = {
        owner: {
          name: formData.ownerName,
          email: formData.ownerEmail,
          cellNumber: formData.ownerCellphoneNumber,
        },
        fullName: formData.ownerName,
        cell: formData.salonCellphoneNumber,
        email: formData.salonEmail,
        storeName: formData.salonName,
        location: {
          type: 'Point',
          coordinates: [formData.location.lng, formData.location.lat],
        },
        address: formData.location.address,
        password: formData.password,
        country: formData.country,
        province: formData.province,
        postalCode: formData.postalCode,
      };
      console.log('sanitizedData', sanitizedData);
      const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/vendors/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });
      const data = await res.json();
      console.log('res', data);
    } else {
      console.log('Form has errors. Please fix them before submitting.');
    }
  };

  const handlePlaceSelect = (place) => {
    const { formatted_address, geometry } = place;
    const { lat, lng } = geometry.location;
    console.log('place', place);
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        location: { address: formatted_address, lat: lat(), lng: lng() },
        country:
          place.address_components[place.address_components.length - 1]
            .long_name,
        province:
          place.address_components[place.address_components.length - 2]
            .long_name,
        postalCode:
          place.address_components[place.address_components.length - 3]
            .long_name,
      };
    });
  };

  return (
    <Layout>
      <div className='container mx-auto p-10 bg-white text-gray-700 opacity-90'>
        <div className='flex flex-col md:flex-row'>
          {/* Div 1: Page Text */}
          <div className='md:w-1/2 md:pr-8'>
            <Image
              src='/images/vendors.jpg'
              width={700}
              height={700}
              alt='Picture of the author'
              className='rounded-lg mb-3'
            />
            <h1 className='text-4xl font-bold mb-6'>
              Join Dollup and Boost Your Salon!
            </h1>
            <p className='mb-6'>
              Welcome to Dollup, where we empower salon owners like you to
              thrive in the digital age. Here are some fantastic reasons to join
              our platform:
            </p>

            <ul className='list-disc pl-6 mb-6'>
              <li>
                Expand your clientele by reaching a broader audience online.
              </li>
              <li>
                Effortlessly manage appointments and bookings with our
                user-friendly system.
              </li>
              <li>
                Promote your unique services to potential clients searching for
                beauty and wellness solutions.
              </li>
              <li>
                Showcase your talented stylists and their expertise to attract
                more customers.
              </li>
              <li>
                Boost your salon's visibility with our targeted marketing
                strategies.
              </li>
              <li>
                Seamlessly sell your custom beauty products alongside your
                services.
              </li>
            </ul>

            <p className='mb-6'>
              Join Dollup now and elevate your salon's success! Fill out the
              form below to get started.
            </p>
          </div>

          {/* Div 2: Page Form */}
          <div className='md:w-1/2 flex flex-col justify-center items-center'>
            <div className='md:w-3/4 w-full px-2 flex flex-col justify-center'>
              <form onSubmit={handleSubmit}>
                {/* Form fields */}
                {/* Add your own styling based on Tailwind CSS classes */}
                <div className='mb-4'>
                  <label
                    htmlFor='ownerName'
                    className='block text-sm font-medium'
                  >
                    Your Name
                  </label>
                  <input
                    type='text'
                    id='ownerName'
                    name='ownerName'
                    value={formData.ownerName}
                    onChange={handleChange}
                    className='form-input px-4 py-2 w-full border border-gray-300 rounded mt-2 focus:outline-none focus:border-pink-500'
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label
                    htmlFor='ownerEmail'
                    className='block text-sm font-medium'
                  >
                    Your Email
                  </label>
                  <input
                    type='email'
                    id='ownerEmail'
                    name='ownerEmail'
                    value={formData.ownerEmail}
                    onChange={handleChange}
                    className='form-input px-4 py-2 w-full border border-gray-300 rounded mt-2 focus:outline-none focus:border-pink-500'
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label
                    htmlFor='ownerCellphoneNumber'
                    className='block text-sm font-medium'
                  >
                    Your Cellphone Number
                  </label>
                  <input
                    type='telephone'
                    id='ownerCellphoneNumber'
                    name='ownerCellphoneNumber'
                    value={formData.ownerCellphoneNumber}
                    onChange={handleChange}
                    className='form-input px-4 py-2 w-full border border-gray-300 rounded mt-2 focus:outline-none focus:border-pink-500'
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='salonName'
                    className='block text-sm font-medium'
                  >
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
                  <label
                    htmlFor='salonCellphoneNumber'
                    className='block text-sm font-medium'
                  >
                    Salon Cellphone Number
                  </label>
                  <input
                    type='telephone'
                    id='salonCellphoneNumber'
                    name='salonCellphoneNumber'
                    value={formData.salonCellphoneNumber}
                    onChange={handleChange}
                    className='form-input px-4 py-2 w-full border border-gray-300 rounded mt-2 focus:outline-none focus:border-pink-500'
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label
                    htmlFor='salonEmail'
                    className='block text-sm font-medium'
                  >
                    Salon Email
                  </label>
                  <input
                    type='email'
                    id='salonEmail'
                    name='salonEmail'
                    value={formData.salonEmail}
                    onChange={handleChange}
                    className='form-input px-4 py-2 w-full border border-gray-300 rounded mt-2 focus:outline-none focus:border-pink-500'
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='location'
                    className='block text-sm font-medium'
                  >
                    Salon Address
                  </label>
                  <Autocomplete
                    id='location'
                    name='location'
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
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium'
                  >
                    Password
                  </label>
                  <input
                    type='text'
                    id='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    className='form-input px-4 py-2 w-full border border-gray-300 rounded mt-2 focus:outline-none focus:border-pink-500'
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label
                    htmlFor='confirmPassword'
                    className='block text-sm font-medium'
                  >
                    Confirm Password
                  </label>
                  <input
                    type='text'
                    id='confirmPassword'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className='form-input px-4 py-2 w-full border border-gray-300 rounded mt-2 focus:outline-none focus:border-pink-500'
                    required
                  />
                </div>

                {/* Repeat similar structure for other form fields */}

                {/* Display validation errors */}
                {errors.storeEmail && (
                  <p className='text-red-500 text-sm mb-4'>
                    {errors.storeEmail}
                  </p>
                )}

                {errors.ownerEmail && (
                  <p className='text-red-500 text-sm mb-4'>
                    {errors.ownerEmail}
                  </p>
                )}

                {errors.salonCellphoneNumber && (
                  <p className='text-red-500 text-sm mb-4'>
                    {errors.salonCellphoneNumber}
                  </p>
                )}

                {errors.ownerCellphoneNumber && (
                  <p className='text-red-500 text-sm mb-4'>
                    {errors.ownerCellphoneNumber}
                  </p>
                )}

                {errors.confirmPassword && (
                  <p className='text-red-500 text-sm mb-4'>
                    {errors.confirmPassword}
                  </p>
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
        </div>
      </div>
    </Layout>
  );
};

export default VendorsPage;
