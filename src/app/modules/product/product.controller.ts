import { Request, Response } from 'express';
import { ProductService } from './product.service';

export class ProductController {
  // Create a Bike
  static async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json({
        message: 'Bike created successfully',
        success: true,
        data: product,
      });
    } catch (error: any) {
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: {
          name: error.name,
          ...(error.name === 'ValidationError' && { errors: error.errors }),
        },
        stack: `Error: Something went wrong! \n ${error.stack}`,
      });
    }
  }

  // Get All Products by Name, Brand, or Category
  static async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      // Extract query parameters from the request
      const { name, brand, category } = req.query;

      // Call the service with the appropriate query parameter
      const products = await ProductService.getAllProducts({
        name: name as string,
        brand: brand as string,
        category: category as string,
      });

      // Send success response
      res.status(200).json({
        message: 'Products retrieved successfully',
        success: true,
        data: products,
      });
    } catch (error: unknown) {
      // Handle errors
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      const errorStack =
        error instanceof Error ? error.stack : 'No stack trace available';

      res.status(500).json({
        message: 'Failed to retrieve products',
        success: false,
        error: {
          message: errorMessage,
        },
        stack: errorStack,
      });
    }
  }

  // Get a Bike by ID
  static async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductService.getProductById(req.params.productId);
      if (!product) {
        res.status(404).json({
          message: 'Bike not found',
          success: false,
        });
        return;
      }
      res.status(200).json({
        message: 'Bike retrieved successfully',
        success: true,
        data: product,
      });
    } catch (error: any) {
      res.status(400).json({
        message: 'Failed to retrieve bike',
        success: false,
        error: {
          name: error.name,
          message: error.message,
        },
        stack: `Error: Something went wrong! \n ${error.stack}`,
      });
    }
  }

  // Update a Bike
  static async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductService.updateProduct(
        req.params.productId,
        req.body,
      );
      if (!product) {
        res.status(404).json({
          message: 'Bike not found',
          success: false,
        });
        return;
      }
      res.status(200).json({
        message: 'Bike updated successfully',
        success: true,
        data: product,
      });
    } catch (error: any) {
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: {
          name: error.name,
          ...(error.name === 'ValidationError' && { errors: error.errors }),
        },
        stack: `Error: Something went wrong! \n ${error.stack}`,
      });
    }
  }

  // Delete a Bike
  static async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductService.deleteProduct(req.params.productId);
      if (!product) {
        res.status(404).json({
          message: 'Bike not found',
          success: false,
        });
        return;
      }
      res.status(200).json({
        message: 'Bike deleted successfully',
        success: true,
        data: {},
      });
    } catch (error: any) {
      res.status(400).json({
        message: 'Failed to delete bike',
        success: false,
        error: {
          name: error.name,
          message: error.message,
        },
        stack: `Error: Something went wrong! \n ${error.stack}`,
      });
    }
  }
}
