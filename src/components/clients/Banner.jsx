const Banner = () => {
  return (
    <section className="container mx-auto max-w-7xl px-4 py-8">
      <div className="flex h-86">
        <div className="w-1/4 pr-8 border-r border-gray-200">
          <ul className="space-y-4">
            <li className="flex items-center justify-between cursor-pointer hover:text-primary">
              <span>Woman's Fashion</span>
              <svg
                className="w-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </li>
            <li className="flex items-center justify-between cursor-pointer hover:text-primary">
              <span>Men's Fashion</span>
              <svg
                className="w-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </li>
            <li className="size-4 cursor-pointer hover:text-primary">
              Electronics
            </li>
            <li className="cursor-pointer hover:text-primary">
              Home & Lifestyle
            </li>
            <li className="cursor-pointer hover:text-primary">Medicine</li>
            <li className="cursor-pointer hover:text-primary">
              Sports & Outdoor
            </li>
            <li className="cursor-pointer hover:text-primary">Baby's & Toys</li>
            <li className="cursor-pointer hover:text-primary">
              Groceries & Pets
            </li>
            <li className="cursor-pointer hover:text-primary">
              Health & Beauty
            </li>
          </ul>
        </div>

        <div className="w-3/4 pl-8">
          <div className="flex flex-col justify-center bg-black h-85 text-white rounded-lg p-8 relative overflow-hidden">
            <div className="flex items-center mb-4">
              <svg
                className="w-7 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                fill="currentColor"
              >
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              <span>iPhone 14 Series</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Up to 10%
              <br />
              off Voucher
            </h1>
            <div className="flex gap-2">
              <button className="w-fit text-white border-b border-white pb-1 hover:text-gray-300">
                Shop Now
              </button>
              <svg
                className="w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="currentColor"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </div>

            <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
              <img
                src="/ip.png"
                alt="iPhone"
                className="w-110 h-80 bg-black object-contain"
              />
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
