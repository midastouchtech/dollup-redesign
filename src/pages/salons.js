import { Inter } from 'next/font/google';
import Layout from '@/components/layout';
import { useEffect, useState } from 'react';
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
    let vendors = [];
    const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/vendors/list`);
    const data = await res.json();
    console.log('found:', data.length);
    vendors = data;
    return {
      props: {
        vendors,
      },
    };
  }
  

export default function Home({ vendors }) {
  const [nearbySalons, setNearbySalons] = useState(null);
  const [loading, setLoading] = useState(false);

  const getNearbySalons = async () => {
    
    try {
        setLoading(true);
      const location = await getCurrentLocation(); // Implement getCurrentLocation function
      console.log('getNearbySalons for location', location)
      const response = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/vendors/near`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location }),
      });

      const nearbySalonsData = await response.json();
      console.log("nearby salons", nearbySalonsData)
      setNearbySalons(nearbySalonsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching nearby salons:', error);
    }
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lng: longitude });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  useEffect(() => {
    // You can uncomment the following line to automatically get nearby salons on page load
    // getNearbySalons();
  }, []);
  console.log('vendors', vendors)
  return (
    <Layout>
      <div className='container mx-auto   md:px-60 py-20 flex flex-col justify-center align-center '>
        <h1 className='text-center text-4xl mb-6 font-bold text-gray-700'>
          Book beauty and wellness services locally.
        </h1>
        <div className='py-6 bg-white p-10'>
          <h2 className='text-2xl font-bold text-gray-700 mb-4'>
            All salons
          </h2>
          {vendors && (
            <>
              {nearbySalons ? (
                <div>
                  <h3 className='text-lg font-bold text-gray-700 mb-2'>
                    Nearby Salons:
                  </h3>
                  {nearbySalons?.map((result) => (
                    <div key={result.id} className='mb-4 w-full'>
                      <SearchResult result={result} />
                    </div>
                  ))}
                </div>
              ) : (
                <button
                  onClick={getNearbySalons}
                  className='text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                >
                 {loading ? "Searching..." : "Find nearby salons"}
                </button>
              )}
              <h3 className='text-lg font-bold text-gray-700 mt-4'>
                All Salons:
              </h3>
              {vendors?.map((result) => (
                <div key={result.id} className='mb-4 w-full'>
                  <SearchResult result={result} />
                </div>
              ))}
            </>
          )}
          {!vendors && (
            <p>No salons found</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

