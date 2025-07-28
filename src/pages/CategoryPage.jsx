import ProductItem from "../components/clients/ProductItem";

const CategoryPage = () => {
  return (
    <main className="container max-w-7xl mx-auto">
      <h6 className="text-xl font-bold mb-8 mt-3.5">Category name</h6>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>

      <div className="flex justify-center items-center space-x-2 mb-12">
        <button
          className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          disabled
        >
          <svg
            className="w-3.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded">1</button>
        <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
          2
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
          3
        </button>
        <span className="px-2">...</span>
        <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
          10
        </button>
        <button className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50">
          <svg
            className="w-3.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </button>
      </div>
    </main>
  );
};

export default CategoryPage;
