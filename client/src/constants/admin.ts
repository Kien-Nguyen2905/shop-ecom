import { ADMIN_PATHS } from './paths';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineCategory } from 'react-icons/md';
import { TbBrandDatabricks } from 'react-icons/tb';
import { LiaProductHunt } from 'react-icons/lia';
import { PiWarehouse } from 'react-icons/pi';
import { BsBox } from 'react-icons/bs';
import { FaMoneyCheck, FaRegUser } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';

export const NAV_LINKS = [
  {
    path: ADMIN_PATHS.ROOT,
    icon: AiOutlineHome,
    label: 'Dashboard',
  },
  {
    path: ADMIN_PATHS.CATEGORY,
    icon: MdOutlineCategory,
    label: 'Category',
  },
  {
    path: ADMIN_PATHS.BRAND,
    icon: TbBrandDatabricks,
    label: 'Brand',
  },
  {
    path: ADMIN_PATHS.PRODUCT,
    icon: LiaProductHunt,
    label: 'Product',
  },
  {
    path: ADMIN_PATHS.WAREHOUSE,
    icon: PiWarehouse,
    label: 'Warehouse',
  },
  {
    path: ADMIN_PATHS.ORDER,
    icon: BsBox,
    label: 'Order',
  },
  {
    path: ADMIN_PATHS.TRANSACTION,
    icon: FaMoneyCheck,
    label: 'Transaction',
  },
  {
    path: ADMIN_PATHS.CUSTOMER,
    icon: FaRegUser,
    label: 'Customer',
  },
  {
    path: ADMIN_PATHS.REVIEW,
    icon: BiCommentDetail,
    label: 'Review',
  },
];
