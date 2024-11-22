import { Product } from './product.model'; // Mongoose Product model
import { TProduct } from './product.interface';

export class ProductService {
  // Create a new product
  static async createProduct(data: TProduct): Promise<TProduct> {
    const product = new Product(data);
    return await product.save();
  }

  // Get all products with optional search by name, brand, or category
  static async getAllProducts(searchTerm?: string): Promise<TProduct[]> {
    const query: Record<string, any> = { isDeleted: false };
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ];
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
