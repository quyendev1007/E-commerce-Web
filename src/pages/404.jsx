import { Link } from "react-router";

const NotFound = () => {
  return (
    <div>
      <div className="container  px-30 py-4">
        <nav className="text-sm   text-gray-600 mt-10">
          <Link to="/" className="hover:text-red-500">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">404 Error</span>
        </nav>
      </div>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-8xl md:text-8xl font-semibold text-gray-900 mb-8">
            404 Not Found
          </h1>

          <p className="text-lg text-gray-600 mb-12">
            Your visited page not found. You may go home page.
          </p>

          <Link
            to="/"
            className="inline-block bg-red-500 text-white px-8 py-4 rounded hover:bg-red-600 transition-colors font-medium"
          >
            Back to home page
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
