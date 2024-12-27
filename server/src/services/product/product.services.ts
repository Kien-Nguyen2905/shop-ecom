import { TUpdateWarehousePayload, TWarehousePayload } from '~/services/warehouse/type'
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
import imagesService from '~/services/images/images.services'

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

    variants.forEach((item) => ((item._id = new ObjectId()), (item.sold = 0)))
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

    // option i tìm kiếm không phân biệt chữ hoa chữ thường (case-insensitive)
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
                // multi nhân các giá trị bên trong mảng
                $multiply: [
                  // Lấy price của phần tử đầu tiên 0
                  { $arrayElemAt: ['$variants.price', 0] },
                  // Thực hiện trừ giữa 1 và discount của phần tử đầu tiên 0
                  { $subtract: [1, { $arrayElemAt: ['$variants.discount', 0] }] }
                ]
              }
            }
          },
          // Lọc theo minPrice và maxPrice nếu có
          ...(minPrice || maxPrice
            ? [
                {
                  $match: {
                    firstVariantPrice: {
                      ...(minPrice !== undefined ? { $gte: minPrice } : {}),
                      ...(maxPrice !== undefined ? { $lte: maxPrice } : {})
                    }
                  }
                }
              ]
            : []),
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
          // Lọc theo minPrice và maxPrice nếu có
          ...(minPrice || maxPrice
            ? [
                {
                  $match: {
                    firstVariantPrice: {
                      ...(minPrice !== undefined ? { $gte: minPrice } : {}),
                      ...(maxPrice !== undefined ? { $lte: maxPrice } : {})
                    }
                  }
                }
              ]
            : []),
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

  async checkProductInOrder(productId: string) {
    //Can not delete product in order pending
    const productExist = await databaseService.orders.findOne({
      'products.product_id': new ObjectId(productId),
      status: 0
    })
    if (productExist) {
      throw new BadRequestError({ message: PRODUCT_MESSAGES.PRODUCT_EXISTS_ORDER })
    }
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
    if (!result) {
      throw new NotFoundError()
    }
    return result
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
    // Check product exist
    const product = await this.checkProductById(productId)
    if (product.thumbnail !== payload.thumbnail) {
      await imagesService.deleteImage(product.thumbnail)
    }
    if (payload.variants.length > 0) {
      // flatMap return Array not nested
      const oldVariantImages = product.variants.flatMap((variant) => variant.images)
      const newVariantImages = payload.variants.flatMap((variant) => variant.images)
      const imagesToDelete = oldVariantImages.filter((image) => !newVariantImages.includes(image))
      if (imagesToDelete.length > 0) {
        await Promise.all(imagesToDelete.map((image) => imagesService.deleteImage(image)))
      }
    }
    // Check product exist in order with status pending
    await this.checkProductInOrder(productId)
    // Remove product had been updated in cart users
    await databaseService.carts.updateMany(
      {
        'products.product_id': new ObjectId(productId)
      },
      {
        $pull: {
          products: { product_id: new ObjectId(productId) }
        }
      }
    )

    const category_id = new ObjectId(payload.category_id)
    const brand_id = new ObjectId(payload.brand_id)

    // Check exist category and brand
    const [categoryExist, brandExist] = await Promise.all([
      databaseService.categories.findOne({ _id: category_id }),
      databaseService.brands.findOne({ _id: brand_id })
    ])

    if (!categoryExist) {
      throw new NotFoundError({ message: CATEGORY_MESSAGES.CATEGORY_NOT_EXISTS })
    }

    if (!brandExist) {
      throw new NotFoundError({ message: BRAND_MESSAGES.BRAND_NOT_EXISTS })
    }

    // Check stock variant must be large minimum stock
    const checkMinimumStock = await payload.variants?.some((item) => item.stock <= payload.minimum_stock!)
    if (checkMinimumStock) {
      throw new BadRequestError({ message: 'Stock variant must be large minimun stock' })
    }

    // Add field _id for variant item
    payload.variants = payload.variants?.map((variant) => ({
      ...variant,
      _id: new ObjectId(variant._id) || new ObjectId()
    }))

    // Lấy danh sách variant_id trong payload
    const variantIdsInPayload = payload.variants?.map((variant) => new ObjectId(variant._id)) || []

    // Lấy danh sách warehouse hiện tại liên quan đến productId
    const currentWarehouses = await databaseService.warehouse.find({ product_id: new ObjectId(productId) }).toArray()

    // Cập nhật warehouse với variant cũ và nhập kho warehouse nếu có thêm variant
    for (const variant of payload.variants || []) {
      const existingWarehouse = currentWarehouses.find((warehouse) =>
        warehouse.variant_id.equals(new ObjectId(variant._id))
      )
      if (existingWarehouse) {
        // Cập nhật warehouse nếu đã tồn tại
        await databaseService.warehouse.updateOne(
          { _id: existingWarehouse._id, isDeleted: false },
          {
            $set: {
              minimum_stock: payload.minimum_stock,
              product_name: payload.name!,
              stock: variant.stock,
              import_quantity: variant.stock,
              variant: variant.color,
              updated_at: new Date(),
              isDeleted: false
            }
          }
        )
      } else {
        // Thêm warehouse mới nếu chưa tồn tại
        const resultInsert = await databaseService.warehouse.insertOne({
          product_id: new ObjectId(productId),
          product_name: payload.name!,
          variant: variant.color,
          variant_id: new ObjectId(variant._id),
          minimum_stock: payload.minimum_stock!,
          sold: 0,
          stock: variant.stock,
          shipments: [
            {
              shipment_date: new Date(),
              quantity: variant.stock
            }
          ],
          import_quantity: variant.stock,
          created_at: new Date(),
          updated_at: new Date(),
          isDeleted: false
        })

        if (!resultInsert.acknowledged) {
          throw new InternalServerError()
        }
      }
    }

    // Đánh dấu isDeleted là true cho những warehouse không có trong payload
    const variantIdsToDelete = currentWarehouses
      .filter((warehouse) => !variantIdsInPayload.some((id) => id.equals(warehouse.variant_id))) // So sánh đúng kiểu ObjectId
      // nếu không khớp trả về true lấy phần tử đó
      .map((warehouse) => warehouse._id)
    // map ra chỉ lấy id của warehouse

    if (variantIdsToDelete.length > 0) {
      const resultMarkDeleted = await databaseService.warehouse.updateMany(
        { _id: { $in: variantIdsToDelete } },
        { $set: { isDeleted: true, updated_at: new Date() } }
      )

      if (!resultMarkDeleted.acknowledged) {
        throw new InternalServerError()
      }
    }

    // Cập nhật thông tin sản phẩm
    const result = await databaseService.products.updateOne(
      { _id: new ObjectId(productId) },
      { $set: { ...payload, category_id, brand_id, updated_at: new Date() } }
    )

    if (!result.acknowledged) {
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
    const product = await this.checkProductById(productId)
    await this.checkProductInOrder(productId)
    await Promise.all([
      imagesService.deleteImage(product.thumbnail),
      product.variants.map((variant) => imagesService.deleteImage(variant.images)),
      databaseService.products.deleteOne({ _id: new ObjectId(productId) }),
      warehouseServices.updateIsDeleted(productId),
      databaseService.carts.updateMany(
        { 'products.product_id': new ObjectId(productId) },
        { $pull: { products: { product_id: new ObjectId(productId) } } }
      ),
      databaseService.wishlist.updateMany(
        {
          'list_item.product_id': new ObjectId(productId)
        },
        { $pull: { list_item: { product_id: new ObjectId(productId) } } }
      )
    ])
  }
}
const productServices = new ProductServices()
export default productServices
