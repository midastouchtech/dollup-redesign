import React, { useState } from 'react';
import Link from 'next/link';
export default function SearchRsult({ result, category }) {
  const [selectedTab, setSelectedTab] = useState('about');
  return (
    <div class='w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <ul
        class='flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800'
        id='defaultTab'
        data-tabs-toggle='#defaultTabContent'
        role='tablist'
      >
        <li class='me-2'>
          <button
            id='about-tab'
            data-tabs-target='#about'
            type='button'
            role='tab'
            aria-controls='about'
            aria-selected='true'
            onClick={() => setSelectedTab('about')}
            class='inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500'
          >
            About
          </button>
        </li>
        <li class='me-2'>
          <button
            id='services-tab'
            data-tabs-target='#services'
            type='button'
            role='tab'
            aria-controls='services'
            aria-selected='false'
            onClick={() => setSelectedTab('services')}
            class='inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300'
          >
            Services
          </button>
        </li>
        <li class='me-2'>
          <button
            id='statistics-tab'
            data-tabs-target='#statistics'
            type='button'
            role='tab'
            aria-controls='statistics'
            aria-selected='false'
            class='inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300'
            onClick={() => setSelectedTab('statistics')}
          >
            Facts
          </button>
        </li>
      </ul>
      <div id='defaultTabContent'>
        <div
          class={`${
            selectedTab !== 'about' ? 'hidden ' : ''
          } p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
          id='about'
          role='tabpanel'
          aria-labelledby='about-tab'
        >
          <h2 class='mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white'>
            {result?.storeName}
          </h2>
          <p class='mb-3 text-gray-500 dark:text-gray-400'>{result?.bio}</p>
          <Link
            href={`/book?id=${result?.id}`}
            class='inline-flex items-center bg-pink-500 py-2 px-4 rounded-lg font-medium text-white hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700'
          >
            Book
            <svg
              class=' w-2.5 h-2.5 ms-2 rtl:rotate-180'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 6 10'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='m1 9 4-4-4-4'
              />
            </svg>
          </Link>
        </div>
        <div
          class={`${
            selectedTab !== 'services' ? 'hidden ' : ''
          } p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
          id='services'
          role='tabpanel'
          aria-labelledby='services-tab'
        >
          <h2 class='mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white'>
            Serices offered in this salon in the category
          </h2>

          <ul role='list' class='space-y-4 text-gray-500 dark:text-gray-400'>
            {result?.services?.map((service) => (
              <li class='flex space-x-2 rtl:space-x-reverse items-center'>
                <svg
                  class='flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                </svg>
                <span class='leading-tight'>{service.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div
          class={`${
            selectedTab !== 'statistics' ? 'hidden ' : ''
          } p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`}
          id='statistics'
          role='tabpanel'
          aria-labelledby='statistics-tab'
        >
          <div class='grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-3 dark:text-white sm:p-8'>
            <div class='flex flex-col'>
              <dt class='mb-2 text-3xl font-extrabold'>Email</dt>
              <dd class='text-gray-500 dark:text-gray-400'>{result?.email}</dd>
              <button className='bg-pink-500 text-white rounded-lg px-4 py-2 mt-4'>
                Message
              </button>
            </div>
            <div class='flex flex-col'>
              <dt class='mb-2 text-3xl font-extrabold'>Cell </dt>
              <dd class='text-gray-500 dark:text-gray-400'>{result?.cell}</dd>
              <button className='bg-pink-500 text-white rounded-lg px-4 py-2 mt-4'>
                Call
              </button>
            </div>
            <div class='flex flex-col'>
              <dt class='mb-2 text-3xl font-extrabold'>Address</dt>
              <dd class='text-gray-500 dark:text-gray-400'>
                {result?.address}
              </dd>
              <button className='bg-pink-500 text-white rounded-lg px-4 py-2 mt-4'>
                Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
