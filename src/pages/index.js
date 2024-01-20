import Image from 'next/image';
import { Inter } from 'next/font/google';
import Layout from '@/components/layout';
import Dropdown from '@/components/dropdown';
import SearchDropdown from '@/components/dropdown/search';
import { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import Time from '@/components/time';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [time, setTime] = useState('10:00');
  const [value, setValue] = useState({
    startDate: new Date(),
  });

  const handleValueChange = (newValue) => {
    console.log('newValue:', newValue);
    setValue(newValue);
  };
  const services = [{ title: 'Option1', icon: 'beer' }, { title: 'options2' }];
  return (
    <Layout>
      <div className='container mx-auto   md:px-60 h-screen flex flex-col py-40 '>
        <h1 className='text-center text-6xl mb-1 font-bold text-gray-700'>
          Welcome to Dollup
        </h1>
        <h2 className='text-center text-4xl mb-6 font-bold text-gray-700'>
          Your Gateway to Beauty and Wellness
        </h2>
        <p className='text-center text-xl mb-6 font-bold text-gray-700'>
          Discover the best salons and wellness centers near you with Dollup!
          We're your one-stop platform for all your beauty and relaxation needs.
        </p>
        <div className='py-6 flex flex-row justify-center'>
          <Link
            href='/search'
            className='text-xl w-40 text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2'
          >
            Explore now!
          </Link>

        </div>
      </div>
    </Layout>
  );
}
