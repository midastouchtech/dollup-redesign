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

export async function getStaticProps({ query }) {
  let subCategories = [];
  const subs_res = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/sub-categories`
  );
  const top_catgories = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/sub-categories/top-categories`
  );
  const subsData = await subs_res.json();
  subCategories = subsData;
  const topCategories = await top_catgories.json();
  return {
    props: {
      subCategories,
      topCategories
    },
  };
}

export default function Home({ subCategories, topCategories }) {
  console.log('categories:', subCategories);
  console.log('topCategories:', topCategories);
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
console.log('subCategories:', subCategories)
  const groupedOptions = subCategories ? subCategories?.map((subCategory) => {
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
    }) :[]
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/vendors/search`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

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
  };

  return (
    <Layout>
      <div className="   md:px-60 py-40 flex flex-col justify-center align-center bg-[url('/images/landing.jpeg')]">
        <h1 className='text-center text-4xl mb-6 font-bold text-gray-100 drop-shadow-md'>
          Book beauty and wellness services locally.
        </h1>
        <div className='md:py-6  flex md:flex-row flex-col w-full rounded-full bg-white px-4'>
          <div className='md:w-1/2 w-full px-2  mb-6 md:mb-1'>
            <Select
              title='Service'
              placeholder='Select a service'
              options={groupedOptions}
              formatGroupLabel={formatGroupLabel}
              onChange={(e) => setCategory(e)}
              classNames={{
                control: () =>
                  'w-full border-transparent border text-gray-700 bg-white  focus:outline-none font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center ',
              }}
            />
          </div>
          <div className='md:w-1/2 w-full px-2 mb-6 md:mb-1'>
            <Autocomplete
              className='w-full border-transparent border text-gray-700 bg-white hover:bg-pink-100 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-4 text-center inline-flex items-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800'
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
        <div className='py-6 flex flex-row justify-center'>
          <button
            onClick={sanitizeDataAndSearch}
            className=' text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-xl px-20 py-6 py-6 text-center me-2 mb-2'
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
                <SearchResult
                  result={result}
                  category={getCategoryName(result.services[0].subCategory.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='w-screen py-20 bg-gray-200 flex flex-col justify-center align-center '>
        <h1 className='text-center text-xl mb-6 font-bold text-red-700'>
          WHAT WE SERVE
        </h1>
        <p className='px-60 text-4xl text-center'>
          your ultimate beauty companion designed to make
          <br />
          your salon experience seamless and stress-free.a.
        </p>
        <div
          className={`h-full w-full px-10 py-10 px-10 text-center md:text-left bg-red
           text-center`}
        >
          <div className='  grid md:grid-cols-5 grid-cols-1 flex flex-col justify-center items-center section-image '>
            <div className='py-4 flex flex-col justify-center items-center text-center'>
              <div className="rounded-lg shadow-2xl border border-slate-300 bg-wghite w-full h-60 bg-[url('/images/vectors/1.jpg')] bg-cover "></div>
              <div className='flex flex-col justify-center items-center'>
                <h2 className='text-4xl py-4 font-bold'>Easy To Book</h2>
              </div>

              <p className='text-base'>
                Browse through the list of services offered by the salon
              </p>
            </div>
            <div className='h-96 hidden md:block px-28 py-28'>
              <div className='h-20 w-20 flex flex-col rounded-full justify-center items-center text-center bg-blue-900'></div>
            </div>
            <div className='py-2 flex flex-col justify-center items-center text-center'>
              <div className="rounded-lg shadow-2xl border border-slate-300 bg-wghite w-full h-60 bg-[url('/images/vectors/2.jpg')] bg-cover "></div>
              <div className='flex flex-col justify-center items-center'>
                <h2 className='text-4xl py-4 font-bold'>Choose date</h2>
              </div>

              <p className='text-base w-4/5'>
                Check the calendar and select a date and time slot that works
                best for you
              </p>
            </div>
            <div className='h-96 hidden md:block px-28 py-28'>
              <div className='h-20 w-20 flex flex-col rounded-full justify-center items-center text-center bg-blue-900'></div>
            </div>
            <div className=' py-4 flex flex-col justify-center items-center text-center'>
              <div className="rounded-lg shadow-2xl border border-slate-300 bg-wghite w-full h-60 bg-[url('/images/vectors/3.jpg')] bg-cover "></div>
              <div className='flex flex-col justify-center items-center'>
                <h2 className='text-4xl py-4 font-bold'>Easy Payment</h2>
              </div>

              <p className='text-base'>
                Review your selected services, and Confirm your booking and
                proceed to the payment page.
              
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-screen py-20 bg-gray-200 flex flex-col justify-center align-center '>
        <h1 className='text-center text-5xl mb-6 font-bold'>
          TOP CATEGORIES
        </h1>
        <div className='  grid md:grid-cols-4 grid-cols-1 px-6 flex flex-col justify-center items-center section-image '>
          {topCategories?.map((category) => { 
            
            return (
            <div
              key={category._id.id}
              className='py-4 flex flex-col justify-center items-center text-center mr-6 '
            >
              <div className={`rounded-lg shadow-2xl border border-slate-300 bg-wghite w-full h-72 overflow-hidden bg-[url(`}>
                <Image
                  src={category?.thumbnail}
                  alt='Picture of the author'
                  height={800}
                  width={600}
                />
              </div>
              <p className='text-base font-bold py-6'>{category.name}</p>
            </div>
          )})}
        </div>
      </div>
      <div className='bg-white  grid md:grid-cols-2 grid-cols-1 flex flex-col justify-center items-center section-image '>
              <div className='bg-pink h-10'></div>
              <div className='bg-pink h-10'></div>
      </div>


    </Layout>
  );
}
