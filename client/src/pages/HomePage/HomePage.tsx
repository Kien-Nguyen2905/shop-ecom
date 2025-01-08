import { Banner } from './Banner';
import { ProductLatest } from './ProductLatest';
import { Featured } from './Featured';
import { useHomePage } from './useHomePage';
import { Loading } from '../../components';

const HomePage = () => {
  const { hotProduct, products, isLoading } = useHomePage();
  if (isLoading) return <Loading></Loading>;
  return (
    <>
      <Banner />
      <div className="container">
        <Featured {...hotProduct} />
        <ProductLatest listProduct={products} />
      </div>
    </>
  );
};

export default HomePage;
