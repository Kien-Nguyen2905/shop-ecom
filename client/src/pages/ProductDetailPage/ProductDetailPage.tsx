import { Link, NavLink } from 'react-router-dom';
import {
  DisplayProductImage,
  DisplayProductInfor,
  DisplayProductTabs,
} from './components';
import { useProductDetailPage } from './useProductDetailPage';
import { CUSTOMER_PATHS } from '../../constants';
import { Loading } from '../../components';

const ProductDetailPage = () => {
  const {
    listImage,
    displayProductInforProps,
    displayProductTabsProps,
    name,
    isLoading,
  } = useProductDetailPage();
  if (isLoading) return <Loading />;
  return (
    <div className="container">
      <div className="flex gap-4 py-10">
        <Link to={CUSTOMER_PATHS.ROOT}>Home</Link>
        <span> {'>'}</span>
        <Link to={CUSTOMER_PATHS.PRODUCT}>Product</Link>
        <span> {'>'}</span>
        <NavLink
          to={CUSTOMER_PATHS.PRODUCT}
          className={({ isActive }) => `${isActive ? 'text-primary' : ''}`}
        >
          {name}
        </NavLink>
      </div>
      <div className="pb-[70px] xl:pb-[120px]">
        <div className="flex flex-col xl:flex-row xl:gap-[150px]">
          <DisplayProductImage listImage={listImage} />
          <DisplayProductInfor {...displayProductInforProps!} />
        </div>
        <DisplayProductTabs {...displayProductTabsProps} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
