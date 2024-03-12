import Image from 'next/image';
import { Inter } from 'next/font/google';
import Layout from '@/components/layout';
import { useEffect, useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import Time from '@/components/time';
import Select from 'react-select';
import Autocomplete from 'react-google-autocomplete';
import SearchResult from '@/components/SearchResult';
import { getVendor, getAllVendorIds } from '@/lib/vendors';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const inter = Inter({ subsets: ['latin'] });



export async function getServerSideProps({query}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/categories`);
  const servicesRes = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/services`);
  const productsRes = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/products`);
  const categories = await res.json();
  const services = await servicesRes.json();
  const products = await productsRes.json();
  return {
    props: {
      categories,
      services,
      products,
    },
  };
}

function SimpleArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} bg-gray-100 rounded-full w-8 h-8`}
      onClick={onClick}
    />
  );
}

export default function Home({ products, categories, services}) {
  console.log("services", services)
  const [time, setTime] = useState('10:00');
  const [date, setDate] = useState({
    startDate: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const [nearbySalons, setNearbySalons] = useState(null);

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
    getNearbySalons();
  }, []);

  const handleDateChange = (newValue) => {
    console.log('newValue:', newValue);
    setDate(newValue);
  };
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SimpleArrow />,
    prevArrow: <SimpleArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Layout>
      <div className="md:px-60 py-40 flex flex-col justify-center align-center bg-[url('/images/landing.jpeg')]">
        <h1 className='text-center text-4xl mb-6 font-bold text-gray-100 drop-shadow-md'>
          Services
        </h1>
      </div>
      <div className='w-screen md:py-2 md:px-40 bg-gray-100 flex flex-col justify-center align-center '>
        <h1 className='text-center text-3xl mb-6 font-bold'></h1>
        <div className=' px-10  grid md:grid-cols-1 grid-cols-1 px-6 flex flex-col justify-center items-center section-image '>
          <h2 className='text-2xl font-bold text-gray-700 mb-4'>
            Categories
          </h2>
          <Slider {...settings}>
            {categories?.map((category) => {
              return (
                <div>
                  <div
                    key={category.id}
                    className='w-full flex flex-col justify-center items-center'
                  >
                    <div
                      key={category._id}
                      className='py-4 flex w-56 h-96 flex-col justify-center items-center text-center mr-6 '
                    >
                      <div
                        className={`rounded-lg shadow-2xl border border-slate-300 bg-wghite w-full h-60 overflow-hidden bg-[url(`}
                      >
                        <Image
                          src={category?.thumbnail}
                          alt='Picture of the author'
                          height={800}
                          width={600}
                        />
                      </div>

                      <div class='mt-4 w-full flex items-center  border border-gray-900 rounded dark:border-gray-700 rounded rounded-full'>
                        
                        <label
                          for='bordered-checkbox-2'
                          class='text-center w-full py-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 '
                        >
                          {category?.name}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <div className='w-screen md:py-2 md:px-40 bg-gray-100 flex flex-col justify-center align-center '>
        <div className='  grid md:grid-cols-1 grid-cols-1 px-6 flex flex-col justify-center items-center section-image '>
          <h2 className='text-2xl font-bold text-gray-700 mb-4'>
            Beauty Spots Near You
          </h2>
          <Slider {...settings}>
            {nearbySalons?.map((salon) => {
              return (
                <div>
                  <div
                    key={salon.id}
                    className='w-full flex flex-col justify-center items-center'
                  >
                    <div
                      className='py-4 flex w-56 h-96 flex-col justify-center items-center text-center mr-6 '
                    >
                      <div
                        className={`rounded-lg shadow-2xl border border-slate-300 bg-wghite w-full h-60 overflow-hidden bg-[url(`}
                      >
                        <Image
                          src={salon.avatar}
                          alt='Picture of the author'
                          height={1200}
                          width={600}
                        />
                      </div>

                      <div class='mt-4 w-full flex items-center  border border-gray-900 rounded dark:border-gray-700 rounded rounded-full'>
                        
                        <label
                          for='bordered-checkbox-2'
                          class='text-center w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 '
                        >
                          {salon.storeName}
                          <br />
                          <span className='text-sm font-light text-gray-500'>
                            {salon.address}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <div className='w-screen md:py-2 md:px-40 bg-gray-100 flex flex-col justify-center align-center '>
        <div className='  grid md:grid-cols-1 grid-cols-1 px-6 flex flex-col justify-center items-center section-image '>
          <h2 className='text-2xl font-bold text-gray-700 mb-4'>
            Trending Styles
          </h2>
          <Slider {...settings}>
            {services?.map((service) => {
              return (
                <div>
                  <div
                    key={service.id}
                    className='w-full flex flex-col justify-center items-center'
                  >
                    <div
                      key={service.id}
                      className='py-4 flex w-56 h-96 flex-col justify-center items-center text-center mr-6 '
                    >
                      <div
                        className={`rounded-lg shadow-2xl border border-slate-300 bg-wghite w-full h-60 overflow-hidden bg-[url(`}
                      >
                        <Image
                          src={service.thumbnail}
                          alt='Picture of the author'
                          height={1200}
                          width={600}
                        />
                      </div>

                      <div class='mt-4 w-full flex items-center  border border-gray-900 rounded dark:border-gray-700 rounded rounded-full'>
                       
                        <label
                          for='bordered-checkbox-2'
                          class='text-center w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 '
                        >
                          {service.name}
                          <br />
                          <span className='text-sm font-light text-gray-500'>
                            {service.vendor.storeName}
                          </span>
                          <br />
                          <span className='text-sm font-light text-red-500'>
                            R {service.salePrice}
                          </span>
                          
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <div className='w-screen md:py-2 md:px-40 bg-gray-100 flex flex-col justify-center align-center '>
        <div className='  grid md:grid-cols-1 grid-cols-1 px-6 flex flex-col justify-center items-center section-image '>
          <h2 className='text-2xl font-bold text-gray-700 mb-4'>
            Top Products 
          </h2>
          <Slider {...settings}>
            {products?.map((product) => {
              return (
                <div>
                  <div
                    key={product.id}
                    className='w-full flex flex-col justify-center items-center'
                  >
                    <div
                      key={product.id}
                      className='py-4 flex w-56 h-96 flex-col justify-center items-center text-center mr-6 '
                    >
                      <div
                        className={`rounded-lg shadow-2xl border border-slate-300 bg-wghite w-full h-60 overflow-hidden bg-[url(`}
                      >
                        <Image
                          src={product.thumbnail}
                          alt='Picture of the author'
                          height={1200}
                          width={600}
                        />
                      </div>

                      <div class='mt-4 w-full flex items-center  border border-gray-900 rounded dark:border-gray-700 rounded rounded-full'>
                        <label
                          for='bordered-checkbox-2'
                          class='text-center w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300 '
                        >
                          {product.title}
                          <br />
                          <span className='text-sm font-light text-gray-500'>
                            {product.subTitle}
                          </span>
                          <br />
                          <span className='text-sm font-light text-red-500'>
                            R {product.salePrice}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <div className='h-fit bg-gray-100 grid md:grid-cols-1 grid-cols-1 flex flex-col justify-center items-center'>
        <div className='bg-red-100 rounded rounded-lg" md:mx-40 my-10 px-4 h-fit bg-gray-200 grid md:grid-cols-1 grid-cols-1 flex flex-col justify-center items-center'>
          <div className='bg-pink border border-red px-10 py-10 w-92'>
            <h2 className='text-xl py-4 font-bold'>DOWNLOAD APP</h2>
            <h2 className='text-2xl py-4 font-bold'>
              Get Started With Dollup Today!
            </h2>
            <p className='text-base'>
              Book appointments for haircuts, coloring, styling, manicures,
              pedicures, facials, and more with just a few taps.
            </p>
            <button className='rounded rounded-full bg-red-600 text-white py-4 px-4 mt-4'>
              Get The App
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
