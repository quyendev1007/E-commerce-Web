const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-5 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Exclusive</h3>
            <h4 className="text-lg mb-4">Subscribe</h4>
            <p className="text-gray-400 mb-4">Get 10% off your first order</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-30 text-xs bg-transparent border border-gray-600 px-4 py-2 rounded-l flex-1 focus:outline-none focus:border-white"
              />
              <button className="border border-gray-600 border-l-0 px-4 py-2 rounded-r hover:bg-gray-800">
                <svg
                  fill="currentColor"
                  className="text-white w-5 rotate-48"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <div className="space-y-3 text-gray-400">
              <p>
                111 Bijoy sarani, Dhaka,
                <br />
                DH 1515, Bangladesh.
              </p>
              <p>exclusive@gmail.com</p>
              <p>+88015-88888-9999</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Account</h3>
            <div className="space-y-3 text-gray-400">
              <a href="#" className="block hover:text-white">
                My Account
              </a>
              <a href="#" className="block hover:text-white">
                Login / Register
              </a>
              <a href="#" className="block hover:text-white">
                Cart
              </a>
              <a href="#" className="block hover:text-white">
                Wishlist
              </a>
              <a href="#" className="block hover:text-white">
                Shop
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Link</h3>
            <div className="space-y-3 text-gray-400">
              <a href="#" className="block hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="block hover:text-white">
                Terms Of Use
              </a>
              <a href="#" className="block hover:text-white">
                FAQ
              </a>
              <a href="#" className="block hover:text-white">
                Contact
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Download App</h3>
            <p className="text-gray-400 text-sm mb-4">
              Save $3 with App New User Only
            </p>
            <div className="flex space-x-2 mb-4">
              <img src="/Qr.png" alt="QR Code" className="w-20 h-20" />
              <div className="space-y-2">
                <img
                  src="/ggplay.png"
                  alt="Google Play"
                  className="w-30 h-10"
                />
                <img
                  src="/appstore.png"
                  alt="App Store"
                  className="w-30 h-10"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <img src="/fb.png" alt="App Store" className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <img src="/tw.png" alt="App Store" className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <img src="/inta.png" alt="App Store" className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <img src="/in.png" alt="App Store" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; Copyright Rimel 2022. All right reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
