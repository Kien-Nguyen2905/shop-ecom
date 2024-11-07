import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { CREATED, SuccessResponse } from '~/models/success/success.response'
import { TWarehouseUpdatePayload } from '~/services/warehouse/type'
import warehouseServices from '~/services/warehouse/warehouse.services'

export const createWareHouseController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  return new CREATED({
    data: await warehouseServices.createWarehouse(req.body)
  }).send(res)
}

export const getWareHouseController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  return new SuccessResponse({
    data: await warehouseServices.getWarehouse()
  }).send(res)
}

export const getWareHouseByIdController = async (
  req: Request<{ id: string }, any, any>,
  res: Response,
  next: NextFunction
) => {
  return new SuccessResponse({
    data: await warehouseServices.getWarehouseById(req.params.id)
  }).send(res)
}

export const updateWarehouseController = async (
  req: Request<{ id: string }, any, any>,
  res: Response,
  next: NextFunction
) => {
  return new SuccessResponse({
    data: await warehouseServices.updateWarehouse({ quantity: req.body.quantity, id: req.params.id })
  }).send(res)
}
