// pages/logout.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Delete all cookies
    Object.keys(Cookies.get()).forEach((cookie) => {
      Cookies.remove(cookie);
    });

    // Redirect to the login page after logout
    router.push('/login');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-4">Logging you out...</h1>
      </div>
    </div>
  );
};

export default Logout;
