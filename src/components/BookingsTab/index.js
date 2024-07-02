import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
const BookingsTab = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch bookings data
    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/users/bookings/${user._id}`);
        const data = await response.json();
        setBookings(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);
  // Fetch and manage bookings data here
  console.log('bookings', bookings, 'isLoading', isLoading);
  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>My Bookings</h2>
      {/* Table to display bookings */}
      <table className='w-full table-auto'>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan='3'>Loading...</td>
            </tr>
          )}
          {!isLoading && bookings.length === 0 && (
            <tr className='table-auto'>
              <td colSpan='3'>No bookings found</td>
            </tr>
          )}
          {!isLoading &&
            bookings?.map((booking) => (
              <div
                key={booking._id}
                className='p-2 my-2 shadow shadow-lg w-full bg-white dark:bg-gray-800 rounded-lg'
              >
                <tr className='py-2 w-full'>
                  <th className='w-2/4'> Date</th>
                  <td class=' w-2/4 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400'>
                    {moment(booking.date).format('DD MMM YYYY')}
                  </td>
                </tr>
                <tr className='py-2'>
                  <th className='w-2/4'> Time</th>
                  <td class=' w-2/4 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400'>
                    {booking.time}
                  </td>
                </tr>
                <tr className='py-4 px-4'>
                  <th className='w-2/4'> Salon</th>
                  <td class=' w-2/4 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400'>
                    {booking.service.vendor.storeName}
                  </td>
                </tr>
                <tr className='py-4 px-4'>
                  <th className='w-2/4'> Service</th>
                  <td class=' w-2/4 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400'>
                    {booking.service.name}
                  </td>
                </tr>
                <tr className='py-4 px-4'>
                  <th className='w-2/4'> Price</th>
                  <td class=' w-2/4 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400'>
                    R {booking.service.salePrice}
                  </td>
                </tr>
                <tr className='py-4 px-4'>
                  <th className='w-2/4'> Service Image</th>
                  <td class=' w-2/4 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400'>
                    <img
                      src={booking.service.thumbnail}
                      width='100px'
                      height='100px'
                    />
                  </td>
                </tr>
                <tr className='py-4 px-4'>
                  <th className='w-2/4'> Actions</th>
                  <td className='flex space-x-2  w-2/4 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400'>
                    <button className='bg-blue-500 text-white px-2 py-1 rounded-md'>
                      Edit
                    </button>
                    <button className='bg-red-500 text-white px-2 py-1 rounded-md'>
                      Cancel
                    </button>
                  </td>
                </tr>
              </div>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(BookingsTab);
