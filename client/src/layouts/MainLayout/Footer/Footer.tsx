import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaShopify } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="pt-10 pb-8 text-white bg-gray-900 font-PpMd">
      <div className="container px-4 py-10 mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <FaShopify className="w-8 h-8 text-primary" />
              <span className="ml-2 text-xl font-bold">Shop-Ecom</span>
            </Link>
            <p className="text-gray-400">
              Discover the best products and deals at our online store. Your
              satisfaction is our priority.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Phone: +123 456 7890</li>
              <li>Email: support@shopify.com</li>
              <li>Address: 123 Shopify Lane, Commerce City</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-4 mt-8 text-center text-gray-500 border-t border-gray-700">
          <p>&copy; {new Date().getFullYear()} Shopify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
