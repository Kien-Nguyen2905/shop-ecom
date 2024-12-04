import { TWarehousePayload } from '~/services/warehouse/type'
import { ObjectId } from 'mongodb'
import { BRAND_MESSAGES, CATEGORY_MESSAGES, PRODUCT_MESSAGES } from '~/constants/message'
import { BadRequestError, ConflictRequestError, InternalServerError, NotFoundError } from '~/models/errors/errors'
import Product from '~/models/schemas/products/products.schemas'
import databaseService from '~/services/database/database.services'
import { TProductPayload, TProductQuery, TUpdateProductPayload } from '~/services/product/type'
import warehouseServices from '~/services/warehouse/warehouse.services'
import { TProductProps } from '~/models/schemas/products/type'
import categoryServices from '~/services/category/category.services'
import brandServices from '~/services/brand/brand.services'

class ProductServices {
  async createProduct({
    thumbnail,
    description,
    featured,
    attributes,
    name,
    minimum_stock,
    category_id,
    brand_id,
    variants
  }: TProductPayload) {
    const product_id = new ObjectId()
    await Promise.all([
      this.checkProductByName(name),
      categoryServices.getCategoryById(category_id),
      brandServices.getBrandById(brand_id)
    ])

    variants.forEach((item) => (item._id = new ObjectId()))
    const product = new Product({
      _id: product_id,
      name,
      category_id: new ObjectId(category_id),
      brand_id: new ObjectId(brand_id),
      description,
      featured,
      rate: 0,
      thumbnail,
      variants,
      attributes,
      minimum_stock
    })

    const resultInsert = await Promise.all([databaseService.products.insertOne(product)])
    if (!resultInsert) {
      throw new InternalServerError()
    }

    let warehousePayload = {} as TWarehousePayload
    for (const item of variants) {
      warehousePayload = {
        product_id: product_id.toString(),
        product_name: name,
        variant: item.color,
        variant_id: item._id.toString(),
        import_quantity: item.stock,
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
    // Parse query parameters
    const options = {
      page: queryProduct.page ? Number(queryProduct.page) : null,
      limit: queryProduct.limit ? Number(queryProduct.limit) : null,
      orderBy: queryProduct.orderBy as string,
      order: queryProduct.order ? Number(queryProduct.order) : null,
      dateFrom: queryProduct.dateFrom as string,
      dateTo: queryProduct.dateTo as string,
      search: queryProduct.search as string,
      category: queryProduct.category as string,
      popular: queryProduct.popular === 'true',
      onSale: queryProduct.onSale === 'true',
      topRated: queryProduct.topRated === 'true',
      minPrice: queryProduct.minPrice ? Number(queryProduct.minPrice) : null,
      maxPrice: queryProduct.maxPrice ? Number(queryProduct.maxPrice) : null,
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
      popular,
      onSale,
      topRated,
      minPrice,
      maxPrice,
      outOfStockLimit,
      inStock
    } = options

    const query: any = {}

    // Filter logic
    if (dateFrom || dateTo) {
      query.created_at = {}
      if (dateFrom) query.created_at.$gte = new Date(dateFrom)
      if (dateTo) query.created_at.$lte = new Date(dateTo)
    }

    if (search) {
      query.name = {
        $regex: search,
        $options: 'i'
      }
    }

    if (category) {
      query.category_id = new ObjectId(category)
    }

    if (popular) {
      query['featured.isPopular'] = popular
    }

    if (onSale) {
      query['featured.onSale'] = onSale
    }

    if (topRated) {
      query['featured.isRated'] = topRated
    }

    if (minPrice || maxPrice) {
      query['variants.0.price'] = {}
      if (minPrice !== undefined) query['variants.0.price'].$gte = minPrice
      if (maxPrice !== undefined) query['variants.0.price'].$lte = maxPrice
    }

    if (outOfStockLimit) {
      query['variants.stock'] = { $lt: 10 }
    }

    if (inStock) {
      query['variants.stock'] = { $gt: 10 }
    }

    // Sorting logic
    const sort: any = {}
    if (orderBy) {
      if (orderBy === 'price') {
        sort['firstVariantPrice'] = order
      } else if (orderBy === 'rate') {
        sort.rate = order
      } else {
        sort[orderBy] = order
      }
    } else {
      sort.created_at = -1
    }

    // Pagination and fetching data
    if (page && limit) {
      const skip = (page - 1) * limit

      const products = await databaseService.products
        .aggregate([
          { $match: query },
          {
            $addFields: {
              firstVariantPrice: {
                $multiply: [
                  { $arrayElemAt: ['$variants.price', 0] },
                  { $subtract: [1, { $arrayElemAt: ['$variants.discount', 0] }] }
                ]
              }
            }
          },
          { $sort: sort },
          { $skip: skip },
          { $limit: limit }
        ])
        .toArray()

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
    } else {
      // If no pagination, return all products
      const products = await databaseService.products
        .aggregate([
          { $match: query },
          {
            $addFields: {
              firstVariantPrice: {
                $multiply: [
                  { $arrayElemAt: ['$variants.price', 0] },
                  { $subtract: [1, { $arrayElemAt: ['$variants.discount', 0] }] }
                ]
              }
            }
          },
          { $sort: sort }
        ])
        .toArray()

      return { products }
    }
  }

  async checkProductById(productId: string) {
    const productExist = await databaseService.products.findOne({ _id: new ObjectId(productId) })
    if (!productExist) {
      throw new NotFoundError({ message: PRODUCT_MESSAGES.PRODUCT_NOT_EXISTS })
    }
    return productExist
  }

  async checkProductandVariant(productId: string, variantId: string, quantity?: number) {
    const productExist = await this.getProductById(productId)
    const variantExist = productExist.variants.find((item) => item._id.toString() === variantId)
    if (!variantExist) {
      throw new NotFoundError({ message: PRODUCT_MESSAGES.VARIANT_NOT_EXISTS })
    }
    if (quantity) {
      if (variantExist.stock < quantity) {
        throw new BadRequestError()
      }
    }
  }

  async getProductById(productId: string) {
    const result = (await databaseService.products.findOne({ _id: new ObjectId(productId) })) as TProductProps
    const attribute = await databaseService.informations.findOne({ product_id: new ObjectId(productId) })
    if (!result) {
      throw new NotFoundError()
    }
    return { ...result, attribute: attribute?.attributes }
  }

  async checkProductByName(name: string) {
    const result = await databaseService.products.findOne({ name })
    if (result) {
      throw new ConflictRequestError({ message: PRODUCT_MESSAGES.PRODUCT_EXISTS })
    }
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

  async updateProduct(productId: string, payload: TUpdateProductPayload) {
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
      { $set: { ...payload, category_id, brand_id, updated_at: new Date() } }
    )
    if (!result.acknowledged || result.modifiedCount) {
      throw new InternalServerError()
    }

    const resultUpdateMinimumStock = await databaseService.warehouse.updateMany(
      {
        product_id: new ObjectId(productId)
      },
      {
        minimum_stock: payload.minimum_stock
      }
    )

    if (!resultUpdateMinimumStock.acknowledged || resultUpdateMinimumStock.modifiedCount) {
      throw new InternalServerError()
    }

    return await this.getProductById(productId)
  }

  async updateRateProduct(productId: string, rate: number) {
    const product = await this.checkProductById(productId)
    const calculateRate = Math.round((product.rate + rate) / 2)
    const result = await databaseService.products.updateOne(
      { _id: new ObjectId(productId) },
      { $set: { rate: calculateRate, updated_at: new Date(), 'featured.isRated': calculateRate >= 4 ? true : false } }
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
      databaseService.informations.deleteOne({ product_id: new ObjectId(productId) }),
      warehouseServices.updateIsDeleted(productId)
    ])
  }
}
const productServices = new ProductServices()
export default productServices
