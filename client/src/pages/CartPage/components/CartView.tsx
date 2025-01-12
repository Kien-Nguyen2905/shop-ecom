import { VscClose } from 'react-icons/vsc';
import { QuantityInput } from '../../../components';
import { FC } from 'react';
import { TCartViewProps } from './tyings';
import { formatCurrency } from '../../../utils';
import { useWarehouse } from '../../../queries';

const CartView: FC<TCartViewProps> = ({
  handleAddCart,
  handleRemoveCart,
  products,
}) => {
  const { data: warehouseData } = useWarehouse();

  if (!warehouseData) return;
  return (
    <div className="flex-1 w-full">
      {products?.length > 0 ? (
        <table className="w-full table-auto border-collapse border border-borderGrey text-left">
          <thead className="hidden md:table-header-group">
            <tr className="bg-gray-100 border-b border-borderGrey">
              <th className="p-3 md:p-4 xl:p-5">Image</th>
              <th className="p-3 md:p-4 xl:p-5">Name</th>
              <th className="p-3 md:p-4 xl:p-5">Color</th>
              <th className="p-3 md:p-4 xl:p-5">Price</th>
              <th className="p-3 md:p-4 xl:p-5">Quantity</th>
              <th className="p-3 md:p-4 xl:p-5">Total</th>
              <th className="p-3 md:p-4 xl:p-5">Actions</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {products.map((item) => (
              <tr
                key={item.variant_id}
                className="md:table-row flex flex-col items-center md:flex-row md:items-start border-t border-borderGrey md:border-none hover:bg-gray-50"
              >
                <td className="p-2 md:p-3 xl:p-4">
                  <img
                    src={item.image}
                    className="w-[50px] h-[50px] mx-auto md:mx-0"
                    alt="product image"
                  />
                </td>
                <td className="p-2 md:p-3 xl:p-4">
                  <p className="font-semibold md:w-auto">{item.name}</p>
                </td>
                <td className="p-2 md:p-3 xl:p-4">
                  <p>{item.color}</p>
                </td>
                <td className="p-2 md:p-3 xl:p-4">
                  <p>{formatCurrency(item.price * (1 - item.discount))}</p>
                </td>
                <td className="p-2 md:p-3 xl:p-4">
                  <QuantityInput
                    max={
                      warehouseData?.find(
                        (product) => product.variant_id === item.variant_id,
                      )?.stock!
                    }
                    value={item.quantity}
                    isBlur
                    onChange={(value) =>
                      handleAddCart({
                        product_id: item.product_id!,
                        variant_id: item.variant_id!,
                        quantity: value,
                      })
                    }
                  />
                </td>
                <td className="p-2 md:p-3 xl:p-4">
                  <p>{formatCurrency(item.price * item.quantity || 0)}</p>
                </td>
                <td className="p-2 md:p-3 xl:p-4 text-center">
                  <div
                    onClick={() => handleRemoveCart(item.variant_id)}
                    className="cursor-pointer inline-block"
                  >
                    <VscClose size={20} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-5">No product...</div>
      )}
    </div>
  );
};

export default CartView;
