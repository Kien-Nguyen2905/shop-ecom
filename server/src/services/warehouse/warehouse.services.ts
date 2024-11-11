import { ObjectId } from 'mongodb'
import { PRODUCT_MESSAGES } from '~/constants/message'
import { BadRequestError, InternalServerError, NotFoundError } from '~/models/errors/errors'
import Warehouse from '~/models/schemas/warehouse/warehouse.schemas'
import databaseService from '~/services/database/database.services'
import productServices from '~/services/product/product.services'
import { TWarehousePayload, TWarehouseUpdatePayload } from '~/services/warehouse/type'

class WarehouseServices {
  async createWarehouse({ import_quantity, minimum_stock, product_id, shipments, variant_id }: TWarehousePayload) {
    if (import_quantity === undefined || minimum_stock === undefined || !product_id || !shipments || !variant_id) {
      throw new BadRequestError()
    }
    const _id = new ObjectId()

    const product = await productServices.getProductById(product_id)
    const variantExist = product.variants.some((item) => item._id.toString() === variant_id)
    if (!variantExist) {
      throw new NotFoundError({ message: PRODUCT_MESSAGES.VARIANT_NOT_EXISTS })
    }

    const warehouse = new Warehouse({
      _id,
      product_id: new ObjectId(product_id),
      variant_id: new ObjectId(variant_id),
      import_quantity,
      minimum_stock,
      shipments
    })
    const resultWarehouse = await databaseService.warehouse.insertOne(warehouse)
    if (!resultWarehouse.acknowledged) {
      throw new InternalServerError()
    }
    return this.getWarehouseById(_id.toString())
  }

  async updateWarehouse({ id, quantity, product_id, variant_id }: TWarehouseUpdatePayload) {
    if (!id || quantity === undefined || !product_id || !variant_id) {
      throw new BadRequestError()
    }

    const warehouse = await databaseService.warehouse.findOne({
      _id: new ObjectId(id),
      product_id: new ObjectId(product_id),
      variant_id: new ObjectId(variant_id)
    })
    if (!warehouse) {
      throw new NotFoundError()
    }

    // Tính toán số lượng mới

    const updatedImportQuantity = warehouse.import_quantity + quantity
    const updatedStock = warehouse.stock! + quantity
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

    if (!result.acknowledged || !result.modifiedCount) {
      throw new InternalServerError()
    }

    const resultProduct = await databaseService.products.updateOne(
      {
        _id: new ObjectId(product_id),
        'variants._id': new ObjectId(variant_id)
      },
      {
        $set: {
          'variants.$.stock': updatedStock,
          updated_at: new Date()
        }
      }
    )
    if (!resultProduct.acknowledged || !resultProduct.modifiedCount) {
      throw new InternalServerError()
    }
    return (await databaseService.warehouse.findOne({ _id: new ObjectId(id) })) || []
  }

  async getWarehouseById(_id: string) {
    if (!_id) {
      throw new BadRequestError()
    }
    return (await databaseService.warehouse.findOne({ _id: new ObjectId(_id) })) || []
  }

  async getWarehouse() {
    return (await databaseService.warehouse.find().toArray()) || []
  }

  async updateIsDeleted(productId: string) {
    if (!productId) {
      throw new BadRequestError()
    }
    const result = await databaseService.warehouse.updateMany(
      { product_id: new ObjectId(productId) },
      {
        $set: {
          isDeleted: true,
          updated_at: new Date()
        }
      }
    )
    if (!result.acknowledged || !result.modifiedCount) {
      throw new InternalServerError()
    }
  }
}
const warehouseServices = new WarehouseServices()
export default warehouseServices
