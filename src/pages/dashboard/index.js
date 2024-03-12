// pages/dashboard.js

import Head from 'next/head';
import { useState } from 'react';
import ProfileTab from '@/components/ProfileTab';
import BookingsTab from '@/components/BookingsTab';
import { connect } from 'react-redux'
import Layout from '@/components/layout';
const Dashboard = ({user}) => {
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Layout>
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="User dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-semibold mb-4">Welcome, {user?.firstName} {user?.lastName}</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => handleTabChange('profile')}
              className={`py-2 px-4 rounded-md focus:outline-none ${
                activeTab === 'profile' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => handleTabChange('bookings')}
              className={`py-2 px-4 rounded-md focus:outline-none ${
                activeTab === 'bookings' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
              }`}
            >
              Bookings
            </button>
          </div>
          <div className="mt-8">
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'bookings' && <BookingsTab />}
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps)(Dashboard);
