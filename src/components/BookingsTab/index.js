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
              <Fragment key={booking._id}>
                <tr className='border border-gray-200 py-2'>
                  <th> Date</th>
                  <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{moment(booking.date).format('DD MMM YYYY')}</td>
                </tr>
                <tr className='border border-gray-200 py-4 px-4'>
                  <th> Salon</th>
                  <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{booking.service.vendor.storeName}</td>
                </tr>
                <tr className='border border-gray-200 py-4 px-4'>
                  <th> Service</th>
                  <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{booking.service.name}</td>
                </tr>
                <tr className='border border-gray-200 py-4 px-4'>
                  <th> Actions</th>
                  <td className='flex space-x-2 border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400'>
                    <button className='bg-blue-500 text-white px-2 py-1 rounded-md'>
                      Edit
                    </button>
                    <button className='bg-red-500 text-white px-2 py-1 rounded-md'>
                      Cancel
                    </button>
                  </td>
                </tr>
              </Fragment>
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
