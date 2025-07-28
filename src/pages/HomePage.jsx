"use client";

import Banner from "../components/clients/Banner";
import Category from "../components/clients/Category";
import SellProduct from "../components/clients/SellProduct";
import OurProduct from "../components/clients/OurProduct";

const HomePage = () => {
  return (
    <main>
      <OurProduct />

      {/* <Banner />
      <Category />
      <SellProduct />
      <section className="container max-w-7xl mx-auto py-16">
        <div className="bg-black text-white rounded-lg p-16 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <div className="text-green-500 font-semibold mb-4">
                Categories
              </div>
              <h2 className="text-5xl font-bold mb-8">
                Enhance Your
                <br />
                Music Experience
              </h2>

              <div className="flex space-x-6 mb-8">
                <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">23</span>
                  <span className="text-xs">Hours</span>
                </div>
                <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">05</span>
                  <span className="text-xs">Days</span>
                </div>
                <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">59</span>
                  <span className="text-xs">Minutes</span>
                </div>
                <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">35</span>
                  <span className="text-xs">Seconds</span>
                </div>
              </div>

              <button className="bg-green-500 text-white px-8 py-3 rounded font-semibold hover:bg-green-400 transition-colors">
                Buy Now!
              </button>
            </div>

            <div className="w-1/2 flex items-end justify-center">
              <img
                src="/speaker.png"
                alt="JBL Speaker"
                className="w-220 h-96 object-cover rotate-y-180"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* app products */}
      {/* 
      <section className="container max-w-7xl mx-auto  py-16">
        <div className="flex items-center mb-8">
          <div className="w-5 h-10 bg-red-500 rounded mr-4"></div>
          <span className="text-red-500 font-semibold">Featured</span>
        </div>
        <h2 className="text-4xl font-bold mb-8">New Arrival</h2>

        <div className="grid grid-cols-2 gap-6 h-150">
          <div className="bg-black text-white rounded-lg p-8 relative overflow-hidden">
            <div className="absolute bottom-8 left-8 z-10">
              <h3 className="text-2xl font-bold mb-4">PlayStation 5</h3>
              <p className="text-gray-300 mb-4">
                Black and White version of the PS5
                <br />
                coming out on sale.
              </p>
              <button className="text-white border-b border-white pb-1 hover:text-gray-300">
                Shop Now
              </button>
            </div>
            <img
              src="/ps5.png"
              alt="PlayStation 5"
              className="absolute left-0 bottom-0 w-full h-full object-contain"
            />
          </div>

          <div className="grid grid-rows-2 gap-6">
            <div className="bg-gray-900 text-white rounded-lg p-6 relative overflow-hidden">
              <div className="absolute bottom-6 left-6 z-10">
                <h3 className="text-xl font-bold mb-2">Women's Collections</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Featured woman collections that
                  <br />
                  give you another vibe.
                </p>
                <button className="text-white border-b border-white pb-1 hover:text-gray-300 text-sm">
                  Shop Now
                </button>
              </div>
              <img
                src="/woman.png"
                alt="Woman with hat"
                className="absolute right-0 top-0 w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-black text-white rounded-lg p-6 relative overflow-hidden">
                <div className="absolute bottom-6 left-6 z-10">
                  <h3 className="text-lg font-bold mb-2">Speakers</h3>
                  <p className="text-gray-300 text-xs mb-3">
                    Amazon wireless speakers
                  </p>
                  <button className="text-white border-b border-white pb-1 hover:text-gray-300 text-sm">
                    Shop Now
                  </button>
                </div>
                <img
                  src="/speaker1.png"
                  alt="Speakers"
                  className="absolute right-0 top-0 w-full h-full object-contain"
                />
              </div>

              <div className="bg-black text-white rounded-lg p-6 relative overflow-hidden">
                <div className="absolute bottom-6 left-6 z-10">
                  <h3 className="text-lg font-bold mb-2">Perfume</h3>
                  <p className="text-gray-300 text-xs mb-3">
                    GUCCI INTENSE OUD EDP
                  </p>
                  <button className="text-white border-b border-white pb-1 hover:text-gray-300 text-sm">
                    Shop Now
                  </button>
                </div>
                <img
                  src="/gucci.png"
                  alt="Perfume"
                  className="absolute right-0 top-0 w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto  py-16">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <svg
                  className="text-white w-7"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M112 0C85.5 0 64 21.5 64 48l0 48L16 96c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 208 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 160l-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l16 0 176 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 224l-48 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 144 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 288l0 128c0 53 43 96 96 96s96-43 96-96l128 0c0 53 43 96 96 96s96-43 96-96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L112 0zM544 237.3l0 18.7-128 0 0-96 50.7 0L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">FREE AND FAST DELIVERY</h3>
            <p className="text-gray-600">
              Free delivery for all orders over $140
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <svg
                  className="text-white w-7"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 48C141.1 48 48 141.1 48 256l0 40c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-40C0 114.6 114.6 0 256 0S512 114.6 512 256l0 144.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24l-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40L464 256c0-114.9-93.1-208-208-208zM144 208l16 0c17.7 0 32 14.3 32 32l0 112c0 17.7-14.3 32-32 32l-16 0c-35.3 0-64-28.7-64-64l0-48c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64l0 48c0 35.3-28.7 64-64 64l-16 0c-17.7 0-32-14.3-32-32l0-112c0-17.7 14.3-32 32-32l16 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">24/7 CUSTOMER SERVICE</h3>
            <p className="text-gray-600">Friendly 24/7 customer support</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <svg
                  className="text-white w-7"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M269.4 2.9C265.2 1 260.7 0 256 0s-9.2 1-13.4 2.9L54.3 82.8c-22 9.3-38.4 31-38.3 57.2c.5 99.2 41.3 280.7 213.6 363.2c16.7 8 36.1 8 52.8 0C454.7 420.7 495.5 239.2 496 140c.1-26.2-16.3-47.9-38.3-57.2L269.4 2.9zM144 221.3c0-33.8 27.4-61.3 61.3-61.3c16.2 0 31.8 6.5 43.3 17.9l7.4 7.4 7.4-7.4c11.5-11.5 27.1-17.9 43.3-17.9c33.8 0 61.3 27.4 61.3 61.3c0 16.2-6.5 31.8-17.9 43.3l-82.7 82.7c-6.2 6.2-16.4 6.2-22.6 0l-82.7-82.7c-11.5-11.5-17.9-27.1-17.9-43.3z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">MONEY BACK GUARANTEE</h3>
            <p className="text-gray-600">We return money within 30 days</p>
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default HomePage;
