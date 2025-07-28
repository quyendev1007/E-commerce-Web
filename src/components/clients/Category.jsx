const Category = () => {
  return (
    <section className="container mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-5 h-10 bg-red-500 rounded mr-4"></div>
            <span className="text-red-500 font-semibold">Categories</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-bold">Browse By Category</h2>
          <div className="flex space-x-2">
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
              <svg
                className="w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
            </button>
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
              <svg
                className="w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-6">
        <div className="flex flex-col gap-3 justify-center items-center border border-gray-300 rounded-lg p-6 text-center hover:bg-red-500 hover:text-white cursor-pointer transition-colors">
          <svg
            className="w-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM144 448c0 8.8 7.2 16 16 16l64 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-64 0c-8.8 0-16 7.2-16 16zM304 64L80 64l0 320 224 0 0-320z" />
          </svg>
          <p className="font-medium">Phones</p>
        </div>
        <div className="border flex flex-col items-center justify-center gap-3 border-gray-300 rounded-lg p-6 text-center hover:bg-red-500 hover:text-white cursor-pointer transition-colors">
          <svg
            className="w-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path d="M64 64l0 288 512 0 0-288L64 64zM0 64C0 28.7 28.7 0 64 0L576 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 416c-35.3 0-64-28.7-64-64L0 64zM128 448l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-384 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
          </svg>
          <p className="font-medium">Computers</p>
        </div>
        <div className="border flex flex-col items-center justify-center gap-3 border-gray-300 rounded-lg p-6 text-center hover:bg-red-500 hover:text-white cursor-pointer transition-colors">
          <svg
            className="w-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
          </svg>
          <p className="font-medium">SmartWatch</p>
        </div>
        <div className="border flex flex-col items-center justify-center gap-3 border-gray-300 rounded-lg p-6 text-center hover:bg-red-500 hover:text-white cursor-pointer transition-colors">
          <svg
            className="w-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M149.1 64.8L138.7 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-74.7 0L362.9 64.8C356.4 45.2 338.1 32 317.4 32L194.6 32c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
          </svg>
          <p className="font-medium">Camera</p>
        </div>
        <div className="border flex flex-col items-center justify-center gap-3 border-gray-300 rounded-lg p-6 text-center hover:bg-red-500 hover:text-white cursor-pointer transition-colors">
          <svg
            className="w-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M256 80C149.9 80 62.4 159.4 49.6 262c9.4-3.8 19.6-6 30.4-6c26.5 0 48 21.5 48 48l0 128c0 26.5-21.5 48-48 48c-44.2 0-80-35.8-80-80l0-16 0-48 0-48C0 146.6 114.6 32 256 32s256 114.6 256 256l0 48 0 48 0 16c0 44.2-35.8 80-80 80c-26.5 0-48-21.5-48-48l0-128c0-26.5 21.5-48 48-48c10.8 0 21 2.1 30.4 6C449.6 159.4 362.1 80 256 80z" />
          </svg>
          <p className="font-medium">HeadPhones</p>
        </div>
        <div className="border flex flex-col items-center justify-center gap-3 border-gray-300 rounded-lg p-6 text-center hover:bg-red-500 hover:text-white cursor-pointer transition-colors">
          <svg
            className="w-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path d="M192 64C86 64 0 150 0 256S86 448 192 448l256 0c106 0 192-86 192-192s-86-192-192-192L192 64zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24l0 32 32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0 0 32c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-32-32 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l32 0 0-32z" />
          </svg>
          <p className="font-medium">Gaming</p>
        </div>
      </div>
    </section>
  );
};

export default Category;
