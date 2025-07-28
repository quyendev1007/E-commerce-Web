import { Link, useNavigate } from "react-router";
import { debouncedSearch } from "../../customHooks/debounceSearch";
import { useState } from "react";
import { useGetList } from "../../customHooks/apiHook";

const HeaderClient = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const debouncedSearchValue = debouncedSearch(search, 500);

  const { data } = useGetList("products", {
    search: debouncedSearchValue,
    limit: 4,
  });

  const productSearch = debouncedSearchValue ? data : [];

  return (
    <>
      <div className="bg-black text-white text-center py-3 text-sm">
        <div className="container max-w-7xl">
          <span>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </span>
          <a href="#" className="underline ml-2 font-semibold">
            ShopNow
          </a>
          <div className="absolute right-29 top-3">
            <select className="bg-black text-white border-none outline-none">
              <option>English</option>
            </select>
          </div>
        </div>
      </div>

      <header className="container border-b border-gray-200 py-4">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">
            <Link to={"/"}>Exclusive</Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="hover:text-primary border-b-2 border-transparent hover:border-primary pb-1"
            >
              Home
            </Link>
            <a
              href="#"
              className="hover:text-primary border-b-2 border-transparent hover:border-primary pb-1"
            >
              Contact
            </a>
            <a
              href="#"
              className="hover:text-primary border-b-2 border-transparent hover:border-primary pb-1"
            >
              About
            </a>
            <Link
              to="/signup"
              className="hover:text-primary border-b-2 border-transparent hover:border-primary pb-1"
            >
              Sign Up
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="What are you looking for?"
                className="bg-gray-100 px-6 w-65 py-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <svg
                className="absolute right-3 top-3 text-gray-500 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
              {productSearch?.docs?.length > 0 && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded shadow-md z-50">
                  {productSearch?.docs?.map((product) => (
                    <p
                      key={product._id}
                      onClick={() => {
                        setSearch("");
                        navigate(`/details/${product._id}`);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      {product.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <svg
              className="w-5 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
            </svg>
            <svg
              className="w-5 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderClient;
