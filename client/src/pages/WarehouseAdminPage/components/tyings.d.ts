import { TWarehouseItem } from '../../../services/Warehouse/tyings';

export type TDrawerWarehouseProps = {
  handleClose: () => void;
  isOpen: boolean;
  warehouseDetail: TWarehouseItem;
  isView: boolean;
  isImport: boolean;
  handleImport: (value?: boolean) => void;
  control: any;
  shipmentColumns: any;
};
