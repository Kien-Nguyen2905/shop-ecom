import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaShopify } from 'react-icons/fa';
import { CUSOTMER_NAV_LINKS, CUSTOMER_PATHS } from '../../../constants';

const Footer = () => {
  return (
    <footer className="pt-10 pb-8 text-white bg-gray-900 font-PpMd">
      <div className="container px-4 py-10 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:gap-x-[82px] md:grid-cols-2 xl:grid-cols-4">
          <div>
            <Link to={CUSTOMER_PATHS.ROOT} className="flex items-center mb-4">
              <FaShopify className="w-8 h-8 text-primary" />
              <span className="ml-2 text-xl">Shop-Ecom</span>
            </Link>
            <p className="text-gray-400">
              Discover the best products and deals at our online store. Your
              satisfaction is our priority.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              {CUSOTMER_NAV_LINKS.map((nav) => (
                <li key={nav.name}>
                  <Link to={nav.path} className="hover:text-primary">
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Phone: +123 456 7890</li>
              <li>Email: support@shopify.com</li>
              <li>Address: 123 Shopify Lane, Commerce City</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg">Follow Us</h3>
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

        <div className="pt-4 mt-8 text-center text-gray-500 border-t border-gray-700">
          <p>&copy; {new Date().getFullYear()} Shopify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
