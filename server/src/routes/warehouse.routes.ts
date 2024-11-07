import { Router } from 'express'
import {
  createWareHouseController,
  getWareHouseByIdController,
  getWareHouseController,
  updateWarehouseController
} from '~/controllers/warehouse.controller'
import { adminAccessValidator } from '~/middlewares/admins/admins.middlewares'
import { warehouseUpdateValidator } from '~/middlewares/warehouse/warehouse.middlewares'

import { wrapRequestHandler } from '~/utils/handlerError'

const warehouseRoute = Router()
// warehouseRoute.post('/', adminAccessValidator, wrapRequestHandler(createWareHouseController))

warehouseRoute.get('/', adminAccessValidator, wrapRequestHandler(getWareHouseController))

warehouseRoute.get('/:id', adminAccessValidator, wrapRequestHandler(getWareHouseByIdController))

warehouseRoute.put(
  '/:id',
  warehouseUpdateValidator,
  adminAccessValidator,
  wrapRequestHandler(updateWarehouseController)
)

export default warehouseRoute
