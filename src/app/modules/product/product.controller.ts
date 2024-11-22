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

  // Get All Bikes
  static async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const { searchTerm } = req.query;
      const products = await ProductService.getAllProducts(
        searchTerm as string,
      );
      res.status(200).json({
        message: 'Bikes retrieved successfully',
        success: true,
        data: products,
      });
    } catch (error: any) {
      res.status(400).json({
        message: 'Failed to retrieve bikes',
        success: false,
        error: {
          name: error.name,
          message: error.message,
        },
        stack: `Error: Something went wrong! \n ${error.stack}`,
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
