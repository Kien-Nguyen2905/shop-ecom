import { TWarehousePayload } from '~/services/warehouse/type'
import { ObjectId } from 'mongodb'
import { BRAND_MESSAGES, CATEGORY_MESSAGES, PRODUCT_MESSAGES } from '~/constants/message'
import { ConflictRequestError, InternalServerError, NotFoundError } from '~/models/errors/errors'
import Information from '~/models/schemas/informations/informations.schemas'
import Product from '~/models/schemas/products/products.schemas'
import databaseService from '~/services/database/database.services'
import { TProductPayload, TProductQuery } from '~/services/product/type'
import warehouseServices from '~/services/warehouse/warehouse.services'
import { TProductProps } from '~/models/schemas/products/type'

class ProductServices {
  async createProduct(payload: TProductPayload) {
    const product_id = new ObjectId()
    const { thumbnail, description, featured, rate, attribute, name, minimum_stock } = payload
    const productExist = await databaseService.products.findOne({ name })
    if (productExist) {
      throw new ConflictRequestError({ message: 'Product have exist' })
    }
    const category_id = new ObjectId(payload.category_id)
    const brand_id = new ObjectId(payload.brand_id)
    const categoryExist = await databaseService.categories.findOne({ _id: category_id })
    if (!categoryExist) {
      throw new NotFoundError({ message: CATEGORY_MESSAGES.CATEGORY_NOT_EXISTS })
    }
    const brandExist = await databaseService.brands.findOne({ _id: brand_id })
    if (!brandExist) {
      throw new NotFoundError({ message: BRAND_MESSAGES.BRAND_NOT_EXISTS })
    }
    payload.variants.map((item) => (item._id = new ObjectId()))
    const product = new Product({
      _id: product_id,
      name,
      category_id,
      brand_id,
      description,
      featured,
      rate,
      thumbnail,
      variants: payload.variants
    })
    const resultProduct = await databaseService.products.insertOne(product)
    if (!resultProduct.acknowledged) {
      throw new InternalServerError()
    }
    const information = new Information({ category_id: new ObjectId(category_id), product_id, attribute })
    const resultInformation = await databaseService.informations.insertOne(information)
    if (!resultInformation.acknowledged) {
      throw new InternalServerError()
    }
    let warehousePayload = {} as TWarehousePayload
    for (const item of payload.variants) {
      warehousePayload = {
        product_id: product_id.toString(),
        variant_id: item._id.toString(),
        sold: 0,
        import_quantity: item.stock,
        stock: item.stock,
        minimum_stock,
        shipments: [
          {
            shipment_date: new Date(),
            quantity: item.stock
          }
        ]
      }
      await warehouseServices.createWarehouse(warehousePayload)
    }

    return this.getProductById(product_id.toString())
  }

  async getProduct(queryProduct: TProductQuery) {
    const options = {
      page: Number(queryProduct.page) || 1,
      limit: Number(queryProduct.limit) || 10,
      orderBy: queryProduct.orderBy as string,
      order: queryProduct.order as string,
      dateFrom: queryProduct.dateFrom as string,
      dateTo: queryProduct.dateTo as string,
      search: queryProduct.search as string,
      category: queryProduct.category as string,
      featured: queryProduct.featured === 'true',
      onSale: queryProduct.onSale === 'true',
      topRated: queryProduct.topRated === 'true',
      minPrice: Number(queryProduct.minPrice),
      maxPrice: Number(queryProduct.maxPrice),
      outOfStockLimit: queryProduct.outOfStockLimit === 'true',
      inStock: queryProduct.inStock === 'true'
    }

    const {
      page,
      limit,
      orderBy,
      order,
      dateFrom,
      dateTo,
      search,
      category,
      featured,
      onSale,
      topRated,
      minPrice,
      maxPrice,
      outOfStockLimit,
      inStock
    } = options

    const skip = (page - 1) * limit
    const query: any = {}

    // Filter by creation date range
    if (dateFrom || dateTo) {
      query.created_at = {}
      if (dateFrom) query.created_at.$gte = new Date(dateFrom)
      if (dateTo) query.created_at.$lte = new Date(dateTo)
    }

    // Search by name (case-insensitive)
    if (search) {
      query.name = {
        $regex: search,
        $options: 'i'
      }
    }

    // Filter by category
    if (category) {
      query.category_id = new ObjectId(category)
    }

    // Filter by featured and onSale status
    if (featured) {
      query['featured.isPopular'] = featured
    }

    if (onSale) {
      query['featured.onSale'] = onSale
    }

    if (topRated) {
      query['featured.isRated'] = topRated
    }
    if (minPrice || maxPrice) {
      // Filter by price range of first variant
      query['variants.0.price'] = {} // Truy cập giá của phần tử đầu tiên trong variants
      if (minPrice !== undefined) query['variants.0.price'].$gte = minPrice
      if (maxPrice !== undefined) query['variants.0.price'].$lte = maxPrice
    }

    if (outOfStockLimit) {
      query['variants.stock'] = { $lt: 10 } // Kiểm tra xem có variant nào tồn kho dưới 10 hay không
    }
    if (inStock) {
      query['variants.stock'] = { $gt: 10 } // Kiểm tra xem có variant nào tồn kho lớn hơn 10 hay không
    }
    // Sorting logic with first variant price
    const sort: any = {}
    // Kiểm tra orderBy:
    // Nếu orderBy là 'price', bạn sẽ sắp xếp theo firstVariantPrice.
    // Nếu orderBy là 'rate', bạn sẽ sắp xếp theo rate.
    // Nếu orderBy là một trường khác, bạn sử dụng trường đó.
    // Mặc định: Nếu không có orderBy, bạn sẽ sắp xếp theo created_at theo thứ tự giảm dần.
    if (orderBy) {
      if (orderBy === 'price') {
        // If orderBy is 'price', sort by the price of the first variant
        sort['firstVariantPrice'] = order === 'desc' ? -1 : 1
      } else if (orderBy === 'rate') {
        // If orderBy is 'rate', sort by the rate field
        sort.rate = order === 'desc' ? -1 : 1
      } else {
        // For other fields, use the provided order
        sort[orderBy] = order === 'desc' ? -1 : 1
      }
    } else {
      // Default sorting by creation date if no orderBy is specified
      sort.created_at = -1
    }

    // Fetch products with filters, sorting, and pagination
    const products = await databaseService.products
      .aggregate([
        { $match: query },
        { $addFields: { firstVariantPrice: { $first: '$variants.price' } } },
        { $sort: sort },
        { $skip: skip },
        { $limit: limit }
      ])
      .toArray()

    // Count total documents for pagination
    const totalProducts = await databaseService.products.countDocuments(query)
    const totalPages = Math.ceil(totalProducts / limit)

    return {
      products,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: page,
        limit
      }
    }
  }

  async checkProductById(productId: string) {
    const productExist = await databaseService.products.findOne({ _id: new ObjectId(productId) })
    if (!productExist) {
      throw new NotFoundError({ message: PRODUCT_MESSAGES.PRODUCT_NOT_EXISTS })
    }
  }

  async getProductById(productId: string) {
    await this.checkProductById(productId)
    return ((await databaseService.products.findOne({ _id: new ObjectId(productId) })) as TProductProps) || {}
  }

  async checkProductByBrand(brandId: string) {
    const productExist = await databaseService.products.findOne({ brand_id: new ObjectId(brandId) })
    if (productExist) {
      return true
    }
    return false
  }

  async checkProductByCategory(categoryId: string) {
    const productExist = await databaseService.products.findOne({ category_id: new ObjectId(categoryId) })
    if (productExist) {
      return true
    }
    return false
  }

  async updateProduct(productId: string, payload: TProductPayload) {
    await this.checkProductById(productId)
    const category_id = new ObjectId(payload.category_id)
    const brand_id = new ObjectId(payload.brand_id)

    // Check for existence of category and brand
    const categoryExist = await databaseService.categories.findOne({ _id: category_id })
    if (!categoryExist) {
      throw new NotFoundError({ message: CATEGORY_MESSAGES.CATEGORY_NOT_EXISTS })
    }
    const brandExist = await databaseService.brands.findOne({ _id: brand_id })
    if (!brandExist) {
      throw new NotFoundError({ message: BRAND_MESSAGES.BRAND_NOT_EXISTS })
    }

    const result = await databaseService.products.updateOne(
      { _id: new ObjectId(productId) },
      { $set: { ...payload, category_id, brand_id } }
    )
    if (!result.acknowledged) {
      throw new InternalServerError()
    }
    return await this.getProductById(productId)
  }

  async deleteProduct(productId: string) {
    await this.checkProductById(productId)
    await Promise.all([
      databaseService.products.deleteOne({ _id: new ObjectId(productId) }),
      databaseService.informations.deleteOne({ product_id: new ObjectId(productId) })
    ])
  }
}
const productServices = new ProductServices()
export default productServices
