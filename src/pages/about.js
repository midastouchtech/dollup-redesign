// pages/about.js

import Layout from '@/components/layout';
import Image from 'next/image';

const About = () => {
  return (
    <Layout>
    <div className="bg-pink-500 text-white min-h-screen flex flex-col items-center justify-center bg-opacity-80">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">About Dollup</h1>

        {/* Discover. Connect. Thrive. Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Discover. Connect. Thrive.</h2>
          <p>Welcome to Dollup, your ultimate destination for unlocking the beauty and wellness wonders that South Africa has to offer. Whether you're a beauty enthusiast seeking the perfect salon experience or a salon owner ready to elevate your business, Dollup is your go-to platform for seamless connections.</p>
        </section>

        {/* For Beauty Enthusiasts Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">For Beauty Enthusiasts</h2>
          <p>Unveil the beauty around you with Dollup. Explore a myriad of salons and wellness centers right in your neighborhood. Immerse yourself in a world of self-care, where every salon is a haven waiting to pamper and rejuvenate you. Read authentic reviews, view stunning portfolios, and make informed decisions that cater to your unique needs.</p>
          <p>Effortlessly schedule appointments with just a few clicks. Your journey to self-love starts here.</p>
        </section>

        {/* For Salon Owners Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">For Salon Owners</h2>
          <p>Join the Dollup revolution if you're a salon owner passionate about delivering top-notch services. Showcase your expertise to our discerning users and become a sought-after destination for beauty and wellness enthusiasts.</p>
          <p>Seamlessly manage appointments with our user-friendly interface. Stay organized, reduce no-shows, and focus on what you do best – making your clients feel extraordinary. Join Dollup and expand your reach beyond your local clientele.</p>
        </section>

        {/* Proudly Developed by Midas Touch Technologies */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Proudly Developed by Midas Touch Technologies</h2>
          <p>Dollup is a creation of Midas Touch Technologies, a pioneering force in web development.</p>
          <p>Visit Midas Touch Technologies: <a href="https://touch.net.za" className="underline">touch.net.za</a></p>
        </section>

        {/* Embrace the Pink Revolution */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Embrace the Pink Revolution</h2>
          <p>Dollup is not just a platform; it's a movement. Our signature pink hues symbolize the elegance, warmth, and vibrancy that define the beauty and wellness experiences you'll find within Dollup.</p>

          {/* Images */}
          <div className="flex justify-around mt-6">
            {/* <Image
              src="link-to-beauty-image" // Replace with the actual image link
              alt="Explore Beauty with Dollup"
              width={200}
              height={200}
            />
            <Image
              src="link-to-vendor-image" // Replace with the actual image link
              alt="Join Dollup Today"
              width={200}
              height={200}
            /> */}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <p className="text-xl mb-4">Ready to embark on your Dollup adventure?</p>
          <a href="#" className="bg-white text-pink-500 py-2 px-4 rounded-full inline-block hover:bg-pink-200">Explore Now</a>
        </section>
      </div>
    </div>
    </Layout>
  );
};

export default About;
