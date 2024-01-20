import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);
  return (
    <>
      <nav className='bg-white border-gray-200 dark:bg-gray-900'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4'>
          <Link
            href='https://flowbite.com'
            className='flex items-center space-x-3 rtl:space-x-reverse'
          >
            <img src='images/logo.png' className='h-12' alt='Flowbite Logo' />
            <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
              Dollup
            </span>
          </Link>
          <div className='flex items-center space-x-6 rtl:space-x-reverse'>
            <Link
              href='tel:5541251234'
              className='hidden md:block text-sm  text-gray-500 dark:text-white hover:underline'
            >
              +27 78 123 4567
            </Link>
            <Link
              href='#'
              className='hidden md:block text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
            >
              Login
            </Link>
            <Link
              href='#'
              className='text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800'
            >
              Sign up
            </Link>
            <button
              data-collapse-toggle='navbar-sticky'
              type='button'
              className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='navbar-sticky'
              aria-expanded='false'
              onClick={toggleIsOpen}
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 17 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 1h15M1 7h15M1 13h15'
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div
          className={` ${isOpen ? "" : "hidden"
            } items-center justify-between  w-full  md:w-auto md:order-1 absolute`}
          id="navbar-sticky"
        >
          
            <ul className="md:bg-transparent sm:bg-transparent  flex p-4 md:p-0 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 flex-col">
            <li>
              <Link
                href='/'
                className="text-xl block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current='page'
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href='/about'
                className="text-xl block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href='/search'
                className="text-xl block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Find Salons
              </Link>
            </li>
            <li>
              <Link
                href='/salons'
                className="text-xl block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                All Salons
              </Link>
            </li>
            <li>
              <Link
                href='/vendors'
                className="text-xl block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                For Vendors
              </Link>
            </li>
          </ul>
        </div>
      <nav className='bg-pink-50 dark:bg-gray-700 hidden md:block'>
        <div className='max-w-screen-xl px-4 py-3 mx-auto'>
          <div className='flex items-center'>
            <ul className='flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm'>
              <li>
                <Link
                  href='/'
                  className='text-gray-700 dark:text-white hover:underline'
                  aria-current='page'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='text-gray-700 dark:text-white hover:underline'
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href='/search'
                  className='text-gray-700 dark:text-white hover:underline'
                >
                  Find Salons
                </Link>
              </li>
              <li>
                <Link
                  href='/salons'
                  className='text-gray-700 dark:text-white hover:underline'
                >
                  All Salons
                </Link>
              </li>
              <li>
                <Link
                  href='/vendors'
                  className='text-gray-700 dark:text-white hover:underline'
                >
                  For Vendors
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
      </nav>
    </>
  );
};

export default Navigation;
