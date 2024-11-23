import { Product } from './product.model'; // Mongoose Product model
import { TProduct } from './product.interface';

export class ProductService {
  // Create a new product
  static async createProduct(data: TProduct): Promise<TProduct> {
    const product = new Product(data);
    return await product.save();
  }

  static async getAllProducts(queryParam: {
    name?: string;
    brand?: string;
    category?: string;
  }): Promise<TProduct[]> {
    const query: Record<string, any> = { isDeleted: false };

    // Check which query parameter is present and apply the filter accordingly
    if (queryParam.name) {
      query.name = queryParam.name;
    } else if (queryParam.brand) {
      query.brand = queryParam.brand;
    } else if (queryParam.category) {
      query.category = queryParam.category;
    }
    return await Product.find(query);
  }

  // Get a product by ID
  static async getProductById(productId: string): Promise<TProduct | null> {
    return await Product.findOne({ _id: productId, isDeleted: false });
  }

  // Update a product by ID
  static async updateProduct(
    productId: string,
    data: Partial<TProduct>,
  ): Promise<TProduct | null> {
    return await Product.findOneAndUpdate(
      { _id: productId, isDeleted: false },
      data,
      { new: true, runValidators: true },
    );
  }

  // Soft delete a product by ID
  static async deleteProduct(productId: string): Promise<TProduct | null> {
    return await Product.findOneAndUpdate(
      { _id: productId },
      { isDeleted: true },
      { new: true },
    );
  }
}
