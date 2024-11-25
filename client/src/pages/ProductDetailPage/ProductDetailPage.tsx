import {
  DisplayProductImage,
  DisplayProductInfor,
  DisplayProductTabs,
} from './components';
import { useProductDetailPage } from './useProductDetailPage';

const ProductDetailPage = () => {
  const { listImage, displayProductInforProps, displayProductTabsProps } =
    useProductDetailPage();
  return (
    <div className="container">
      <div className="py-[120px]">
        <div className="flex gap-[150px]">
          <DisplayProductImage listImage={listImage} />
          <DisplayProductInfor {...displayProductInforProps!} />
        </div>
        <DisplayProductTabs {...displayProductTabsProps} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
