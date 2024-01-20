import Image from 'next/image';
import { Inter } from 'next/font/google';
import Layout from '@/components/layout';
import { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import Time from '@/components/time';
import Select from 'react-select';
import Autocomplete from 'react-google-autocomplete';
import SearchResult from '@/components/SearchResult';
const inter = Inter({ subsets: ['latin'] });

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

export async function getServerSideProps({query}) {
  let subCategories = [];
  const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/sub-categories`);
  const data = await res.json();
  console.log('data:', data);
  subCategories = data;
  return {
    props: {
      subCategories,
    },
  };
}

export default function Home({ subCategories }) {
  console.log('categories:', subCategories);
  const [time, setTime] = useState('10:00');
  const [date, setDate] = useState({
    startDate: new Date(),
  });
  const [location, setLocation] = useState(null);
  const [category, setCategory] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDateChange = (newValue) => {
    console.log('newValue:', newValue);
    setDate(newValue);
  };

  const groupedOptions = subCategories
    .map((subCategory) => {
      const mainCategory = subCategory.category.name;
      return {
        label: mainCategory,
        id: subCategory.category.id,
        options: [
          {
            label: subCategory.name,
            value: subCategory.id,
          },
        ],
      };
    })
    .reduce((acc, curr) => {
      const existing = acc.find((item) => item.id === curr.id);
      if (existing) {
        existing.options.push(...curr.options);
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);

  const categoryOptions = subCategories.map((category) => {
    return { label: category.name, value: category.id };
  });

  console.log({ time, date, location, category });

  const postSearch = async (data) => {
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/vendors/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const results = await res.json();
    console.log('results:', results);
    setSearchResults(results);
  };

  const sanitizeDataAndSearch = () => {
    const data = {
      category: category.value,
      location: {
        lat: location.geometry.location.lat(),
        lng: location.geometry.location.lng(),
      },
      date: date.startDate,
      time,
    };
    postSearch(data);
  };

  const getCategoryName = (id) => {
    console.log('id:', id);
    const category = subCategories.find((category) => category.id === id);
    return category.name;
  }

  return (
    <Layout>
      <div className='container mx-auto   md:px-60 py-40 flex flex-col justify-center align-center '>
        <h1 className='text-center text-4xl mb-6 font-bold text-gray-700'>
          Book beauty and wellness services locally.
        </h1>
        <div className='md:py-6 py-1 flex md:flex-row flex-col w-full'>
          <div className='md:w-1/2 w-full px-2  mb-6 md:mb-1'>
            <Select
              title='Service'
              options={groupedOptions}
              formatGroupLabel={formatGroupLabel}
              onChange={(e) => setCategory(e)}
              classNames={{
                control: () =>
                  'w-full border-pink-300 border text-gray-700 bg-white hover:bg-pink-100 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800',
              }}
            />
          </div>
          <div className='md:w-1/2 w-full px-2 mb-6 md:mb-1'>
            <Autocomplete
              className='w-full border-pink-300 border text-gray-700 bg-white hover:bg-pink-100 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-4 text-center inline-flex items-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800'
              apiKey={'AIzaSyDka_7ppWokFIBPOxpKQ41NfgP6Q1Q3JBM'}
              onPlaceSelected={(place) => {
                console.log(place);
                setLocation(place);
              }}
              options={{
                types: ['(regions)'],
                componentRestrictions: { country: 'za' },
              }}
            />
          </div>
        </div>
        <div className='md:py-6 py-1  flex md:flex-row flex-col justify-between w-full'>
          <div className='md:w-3/4 w-full px-2  mb-6 md:mb-1'>
            <Datepicker
              value={date}
              onChange={handleDateChange}
              asSingle={true}
              useRange={false}
              primaryColor={'fuchsia'}
              containerClassName={'relative'}
              inputClassName='w-full p-4 ps-10 text-sm text-gray-700 border border-pink-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-pink-700 dark:border-pink-600 dark:placeholder-pink-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
          <div className='md:w-1/4  w-full px-2  mb-6 md:mb-1'>
            <Time onChange={(t) => setTime(t)} value={time} />
          </div>
        </div>
        <div className='py-6 flex flex-row justify-center'>
          <button
            onClick={sanitizeDataAndSearch}
            className='text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {searchResults && (
          <div className='py-6 bg-white p-10'>
            <h2 className='text-2xl font-bold text-gray-700 mb-4'>
              Search Results:
            </h2>
            {/* Customize the rendering of search results based on your data structure */}
            {searchResults?.map((result) => (
              <div key={result.id} className='mb-4 w-full'>
                <SearchResult result={result} category={getCategoryName(result.services[0].subCategory.id)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}


