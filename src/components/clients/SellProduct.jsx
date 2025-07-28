import ProductItem from "./ProductItem";

const SellProduct = () => {
  return (
    <section className="container max-w-7xl mx-auto px-4 py-16">
      <div className="mb-8">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-5 h-10 bg-red-500 rounded mr-4"></div>
            <span className="text-red-500 font-semibold">This Month</span>
          </div>
        </div>
        <div className="flex justify-between">
          <h2 className="text-4xl font-bold">Best Selling Products</h2>
          <button className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition-colors">
            View All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </section>
  );
};

export default SellProduct;
