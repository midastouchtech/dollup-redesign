// components/ProfileTab.js

import { useState } from 'react';
import { connect } from 'react-redux'
import GoogleAutocomplete from 'react-google-autocomplete';

const ProfileTab = ({user}) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    location: user?.location,
    place: user?.place,
    cellphone: user?.cellphone,
    password: '',
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (place) => {
    setFormData({ ...formData, place: place.formatted_address, location: place?.geometry?.location });
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
    if (!cellphoneRegex.test(formData.cellphone)) {
      setErrors({ ...errors, cellphone: 'Please enter a valid cellphone number with 10 digits starting with 0' });
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      setErrors({ ...errors, password: 'Password must be at least 8 characters long' });
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, password: 'Passwords do not match' });
      return;
    }

    try {
      // Make a POST request to the signup API endpoint
      const response = await fetch('/api/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Signup successful, redirect to another page or show success message
        
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
    <div>
      <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="py-4 px-4 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="py-4 px-4 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="py-4 px-4 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700">Location</label>
            <GoogleAutocomplete
              id="location"
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              placeholder="Enter your location"
              onSelect={handleLocationChange}
              className="py-4 px-4 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
              required
            />
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">{errors.location}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="cellphone" className="block text-gray-700">Cellphone Number</label>
            <input
              type="text"
              id="cellphone"
              name="cellphone"
              value={formData.cellphone}
              onChange={handleChange}
              className="py-4 px-4 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
              required
            />
            {errors.cellphone && (
              <p className="text-red-500 text-xs mt-1">{errors.cellphone}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="py-4 px-4 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div><div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="py-4 px-4 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
        {/* Other profile fields (lastName, email, location, cellphone, password) */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-400">Save Changes</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
      user: state.auth
    }
  }
  
  export default connect(mapStateToProps)(ProfileTab);
  