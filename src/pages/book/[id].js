import Image from 'next/image';
import { Inter } from 'next/font/google';
import Layout from '@/components/layout';
import { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import Time from '@/components/time';
import Select from 'react-select';
import Autocomplete from 'react-google-autocomplete';
import SearchResult from '@/components/SearchResult';
import { getVendor, getAllVendorIds } from '@/lib/vendors';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/router';
import ShortUniqueId from 'short-unique-id';
import {connect} from 'react-redux';
const inter = Inter({ subsets: ['latin'] });

export const getStaticPaths = async () =>
  await getAllVendorIds().then((vendorIds) => {
    const paths = vendorIds;
    return {
      paths,
      fallback: false,
    };
  });

export async function getStaticProps({ params }) {
  const { id } = params;
  const vendor = await getVendor(id);
  return {
    props: {
      id,
      vendor,
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

function Home({ id, vendor, user }) {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [location, setLocation] = useState('');

  const [time, setTime] = useState('10:00');
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date()
  });
  const [loading, setLoading] = useState(false);

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
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  console.log(vendor.stylists)

  const createBooking = async () => {
    const uid = new ShortUniqueId({ length: 10 });
    
    setLoading(true);
    const booking = {
      service: selectedService,
      stylist: selectedStylist,
      product: selectedProduct,
      date: date.startDate,
      id: uid.rnd(),
      user: {
        _id: user?._id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        cellphone: user?.cellphone,
      }, 
    };
    const res = await fetch('/api/bookings/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    });
    const data = await res.json();
    if(!user){
      router.push(`/login?backto=/bookings/${data.id}`);
      return;
    }
    router.push(`/bookings/${data.id}`);
  }

  return (
    <Layout>
      <div className="md:px-60 py-40 flex flex-col justify-center align-center bg-[url('/images/landing.jpeg')]">
        <h1 className='text-center text-4xl mb-6 font-bold text-gray-100 drop-shadow-md'>
          Bookings
        </h1>
      </div>
      <div className='w-screen md:py-20 md:px-40 flex flex-col justify-center align-center '>
        <h1 className='text-left mt-4 px-6 text-3xl mb-6 font-bold'>Book a service</h1>
        <div className=' px-10  grid md:grid-cols-1 grid-cols-1 px-6 flex flex-col justify-center items-center section-image '>
          <h2 className='text-2xl font-bold text-gray-700 mb-4'>
            Choose Service
          </h2>
          <Slider {...settings}>
            {vendor.services?.map((service) => {
              return (
                <div>
                  <div key={service.id} className=' h-56 md:h-80 flex items-center justify-center '>
                    <div class='md:max-w-sm w-24 md:w-44 h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
                      <div class='h-1/2'>
                        <img
                          class='rounded-t-lg w-full h-full'
                          src={service.thumbnail}
                          alt=''
                        />
                      </div>
                      <div class='p-2 h-1/2 flex items-center justify-end flex-col'>
                        <h5 class='mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white'>
                          {service.name}
                        </h5>
                        <button
                          href='#'
                          onClick={() => setSelectedService(service)}
                          class={`${selectedService?.id === service.id ? "ring-4 ring-red-300" :""} w-full flex items-center justify-center px-1 py-1 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800`}
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <div className='my-10 w-screen md:py-20 md:px-40 flex flex-col justify-center align-center '>
        <div className='  grid md:grid-cols-1 grid-cols-1 px-6 flex flex-col justify-center items-center section-image '>
          <h2 className='text-2xl font-bold text-gray-700 mb-4'>
            Choose an expert
          </h2>
          <Slider {...settings}>
            {vendor.stylists?.map((stylist) => {
              return (
                <div>
                  <div key={stylist.id} className=' h-56 md:h-80 flex items-center justify-center'>
                    <div class='md:max-w-sm w-24 md:w-44 h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
                      <div class='h-1/2'>
                        <img
                          class='rounded-t-lg w-full h-full'
                          src={stylist.thumbnail || '/images/lp.jpeg'}
                          alt=''
                        />
                      </div>
                      <div class='p-2 h-1/2 flex items-center justify-end flex-col'>
                        <h5 class='mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white'>
                          {stylist.name}
                        </h5>
                        <button
                          href='#'
                          onClick={() => setSelectedStylist(stylist)}
                          class={`${selectedStylist?.id === stylist.id ? "ring-4 ring-red-300" :""} w-full flex items-center justify-center px-1 py-1 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800`}
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <div className='my-10 w-screen md:py-20 md:px-40 flex flex-col justify-center align-center '>
        <div className='  grid md:grid-cols-1 grid-cols-1 px-6 flex flex-col justify-center items-center section-image '>
          <h2 className='text-2xl font-bold text-gray-700 mb-4'>
            Choose a product
          </h2>
          <Slider {...settings}>
            {vendor.products?.map((product) => {
              return (
                <div>
                  <div key={product.id} className=' h-56 md:h-80 flex items-center justify-center'>
                    <div class='md:max-w-sm w-24 md:w-44 h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
                      <div class='h-1/2'>
                        <img
                          class='rounded-t-lg w-full h-full'
                          src={product.thumbnail}
                          alt=''
                        />
                      </div>
                      <div class='p-2 h-1/2 flex items-center justify-end flex-col'>
                        <h5 class='mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white'>
                          {product.title}
                        </h5>
                        <h5 class='mb-2 text-xs tracking-tight text-gray-900 dark:text-white'>
                          {product.subTitle}
                        </h5>
                        <button
                          href='#'
                          onClick={() => setSelectedProduct(product)}
                          class={`${selectedProduct?.id === product.id ? "ring-4 ring-red-300" :""} w-full flex items-center justify-center px-1 py-1 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800`}
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <div className='w-screen md:py-20 md:px-40 bg-gray-100 flex flex-col justify-center align-center '>
        <div className='md:py-6 py-1  flex md:flex-row flex-col justify-between w-full'>
          <div className='md:w-3/4 w-full px-2  mb-6 md:mb-1'>
            <Datepicker
              value={date}
              onChange={handleDateChange}
              asSingle={true}
              primaryColor={'fuchsia'}
              containerClassName={'relative'}
              inputClassName='w-full p-6 ps-10 text-sm text-gray-700 rounded-full border border-gray-900 bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-pink-700 dark:border-pink-600 dark:placeholder-pink-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
          <div className='md:w-1/4 w-full px-2  mb-6 md:mb-1'>
            <button
              onClick={() => createBooking()}
              className='w-full p-6 ps-10 text-xl text-gray-100 rounded-full  bg-red-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-pink-700 dark:border-pink-600 dark:placeholder-pink-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            >
              Book now
            </button>
          </div>
        </div>
      </div>
      <div className=' md:px-40 h-fit bg-gray-100 grid md:grid-cols-2 grid-cols-1 flex flex-col justify-center items-center'>
        <div className='bg-pink px-10 py-10'>
          <Image
            src={vendor?.bannerImages ? vendor?.bannerImages[0] : ""}
            alt='Picture of the author'
            height={450}
            width={450}
          />
        </div>
        <div className='bg-pink px-10 py-10'>
          <h2 className='text-2xl py-4 font-bold'>About Us</h2>
          <p className='text-base'>{vendor?.bio}</p>
        </div>
      </div>
      <div className=' md:px-40 h-fit bg-gray-100 grid md:grid-cols-2 grid-cols-1 flex flex-col justify-center items-center'>
        <div className='bg-pink px-10 py-10'>
          <Image
            src='/images/Testimonial.jpeg'
            alt='Picture of the author'
            height={450}
            width={450}
          />
        </div>
        <div className='bg-pink px-10 py-10'>
          <h2 className='text-xl py-4 font-bold'>WHAT THEY SAY</h2>
          <h2 className='text-2xl py-4 font-bold'>
            What Our Customers Say About Us
          </h2>
          <p className='text-base'>
            Absolutely amazing! The salon booking system has revolutionized my
            beauty routine. No more waiting on hold or playing phone tag to
            secure an appointment. With just a few clicks, I can book my
            preferred services, select my favorite stylist, and choose a
            convenient time slot all from the comfort of my home. I love it!"
          </p>
          <div class='flex items-center mt-4'>
            <div class='flex-shrink-0 '>
              <img
                class='w-16 h-16 rounded-full'
                src='/images/Testimonial.jpeg'
                alt='Neil image'
              />
            </div>
            <div class='flex-1 min-w-0 ms-4'>
              <p class='text-sm font-medium truncate dark:text-white'>
                Theresa Jordan
              </p>
              <p class='text-sm truncate '>Food enthusiast</p>
            </div>
            <div class='flex items-center flex-1 min-w-0 ms-4'>
              <div class='flex items-center space-x-1 rtl:space-x-reverse'>
                <svg
                  class='w-4 h-4 text-yellow-300'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 22 20'
                >
                  <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                </svg>
                <svg
                  class='w-4 h-4 text-yellow-300'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 22 20'
                >
                  <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                </svg>
                <svg
                  class='w-4 h-4 text-yellow-300'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 22 20'
                >
                  <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                </svg>
                <svg
                  class='w-4 h-4 text-yellow-300'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 22 20'
                >
                  <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                </svg>
                <svg
                  class='w-4 h-4 text-gray-200 dark:text-gray-600'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 22 20'
                >
                  <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                </svg>
              </div>
            </div>
          </div>
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

const mapStateToProps = (state) => {
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps)(Home);
