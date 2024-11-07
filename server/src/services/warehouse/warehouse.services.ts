import { ObjectId } from 'mongodb'
import { PRODUCT_MESSAGES } from '~/constants/message'
import { BadRequestError, InternalServerError, NotFoundError } from '~/models/errors/errors'
import Warehouse from '~/models/schemas/warehouse/warehouse.schemas'
import databaseService from '~/services/database/database.services'
import productServices from '~/services/product/product.services'
import { TWarehousePayload, TWarehouseUpdatePayload } from '~/services/warehouse/type'

class WarehouseServices {
  async createWarehouse(payload: TWarehousePayload) {
    const _id = new ObjectId()
    const { product_id, variant_id, sold, stock, minimum_stock, shipments, import_quantity } = payload
    await productServices.checkProductById(product_id)
    const variantExist = await databaseService.products.findOne({
      'variants._id': new ObjectId(variant_id)
    })
    if (!variantExist) {
      throw new NotFoundError({ message: PRODUCT_MESSAGES.VARIANT_NOT_EXISTS })
    }
    const warehouse = new Warehouse({
      _id,
      product_id: new ObjectId(product_id),
      variant_id: new ObjectId(variant_id),
      import_quantity,
      minimum_stock,
      shipments,
      sold,
      stock
    })
    const resultWarehouse = await databaseService.warehouse.insertOne(warehouse)
    if (!resultWarehouse.acknowledged) {
      throw new InternalServerError()
    }
    return this.getWarehouseById(_id.toString())
  }

  async updateWarehouse(payload: TWarehouseUpdatePayload) {
    const { id, quantity } = payload

    if (!ObjectId.isValid(id)) {
      throw new BadRequestError()
    }
    const warehouse = await databaseService.warehouse.findOne({ _id: new ObjectId(id) })
    if (!warehouse) {
      throw new NotFoundError({ message: 'Warehouse not found' })
    }

    // Tính toán số lượng mới

    const updatedImportQuantity = warehouse.import_quantity + quantity
    const updatedStock = warehouse.stock + quantity
    // Tạo thông tin shipment mới
    const newShipment = {
      shipment_date: new Date(),
      quantity
    }

    // Cập nhật warehouse với thông tin mới
    const result = await databaseService.warehouse.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          import_quantity: updatedImportQuantity,
          stock: updatedStock,
          updated_at: new Date()
        },
        $push: {
          shipments: newShipment
        }
      }
    )

    if (!result.acknowledged) {
      throw new InternalServerError({ message: 'Failed to update warehouse' })
    }

    return (await databaseService.warehouse.findOne({ _id: new ObjectId(id) })) || []
  }
  async getWarehouseById(_id: string) {
    return (await databaseService.warehouse.findOne({ _id: new ObjectId(_id) })) || []
  }
  async getWarehouse() {
    return (await databaseService.warehouse.find().toArray()) || []
  }
}
const warehouseServices = new WarehouseServices()
export default warehouseServices
