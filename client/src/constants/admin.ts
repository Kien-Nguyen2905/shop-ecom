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
    to: ADMIN_PATHS.ROOT,
    icon: AiOutlineHome,
    label: 'Dashboard',
  },
  {
    to: ADMIN_PATHS.CATEGORY,
    icon: MdOutlineCategory,
    label: 'Category',
  },
  {
    to: ADMIN_PATHS.BRAND,
    icon: TbBrandDatabricks,
    label: 'Brand',
  },
  {
    to: ADMIN_PATHS.PRODUCT,
    icon: LiaProductHunt,
    label: 'Product',
  },
  {
    to: ADMIN_PATHS.WAREHOUSE,
    icon: PiWarehouse,
    label: 'Warehouse',
  },
  {
    to: ADMIN_PATHS.ORDER,
    icon: BsBox,
    label: 'Order',
  },
  {
    to: ADMIN_PATHS.TRANSACTION,
    icon: FaMoneyCheck,
    label: 'Transaction',
  },
  {
    to: ADMIN_PATHS.CUSTOMER,
    icon: FaRegUser,
    label: 'Customer',
  },
  {
    to: ADMIN_PATHS.REVIEW,
    icon: BiCommentDetail,
    label: 'Review',
  },
];
