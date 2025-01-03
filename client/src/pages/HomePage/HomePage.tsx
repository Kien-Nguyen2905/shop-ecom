import { Banner } from './Banner';
import { ProductLatest } from './ProductLatest';
import { Featured } from './Featured';
import { useHomePage } from './useHomePage';

const HomePage = () => {
  const { hotProduct, products } = useHomePage();
  return (
    <>
      <Banner />
      <div className="container">
        <Featured {...hotProduct} />
        <ProductLatest listProduct={products!} />
      </div>
    </>
  );
};

export default HomePage;
