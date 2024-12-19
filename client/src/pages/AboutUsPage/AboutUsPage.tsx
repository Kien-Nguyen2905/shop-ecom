import { Link } from 'react-router-dom';
import { CUSTOMER_PATHS } from '../../constants';
import { Button } from '../../components';

const AboutUsPage = () => {
  return (
    <div className="text-gray-800 bg-gray-100 h-max">
      {/* Hero Section */}
      <div className="py-16 text-center text-white bg-darkGrey">
        <h1 className="text-4xl font-bold">About Shop-ecom</h1>
        <p className="mt-4 text-lg">
          Your one-stop destination for the best shopping experience.
        </p>
      </div>
      {/* Call-to-Action */}
      <div className="py-12 text-center bg-white border border-b">
        <h2 className="text-3xl font-semibold">Join Us Today!</h2>
        <p className="mt-4 text-lg">
          Explore our diverse product range and enjoy hassle-free shopping.
        </p>
        <Link to={CUSTOMER_PATHS.PRODUCT} className="block mx-auto mt-5 w-max">
          <Button text="Shop Now"> </Button>
        </Link>
      </div>
      {/* Mission Section */}
      <section className="px-4 py-12 bg-white sm:px-8 md:px-16 pb-[100px]">
        <h2 className="mb-8 text-3xl font-semibold text-center">Our Mission</h2>
        <p className="max-w-4xl mx-auto text-lg text-center">
          At Shop-ecom, we aim to bring the finest products at unbeatable prices
          while ensuring exceptional customer service. We believe in creating a
          seamless shopping experience that you can trust.
        </p>
      </section>
      <div className="h-[600px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15677.671652456593!2d106.6603257!3d10.7792694!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752940e76e8ccb%3A0x9ed4e323c103e3d1!2sCFD%20Circle!5e0!3m2!1svi!2s!4v1685171988555!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default AboutUsPage;
