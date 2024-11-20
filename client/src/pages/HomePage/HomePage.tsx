import { Banner } from './Banner';
import { Featured } from './Featured';
import { useHomePage } from './useHomePage';

const HomePage = () => {
  const { hotProduct } = useHomePage();
  return (
    <div>
      <Banner />
      <Featured {...hotProduct} />
    </div>
  );
};

export default HomePage;
