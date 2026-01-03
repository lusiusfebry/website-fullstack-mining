import { Request, Response } from 'express';
import { ServiceModel } from '../models';
import { ApiResponse } from '../types';

export class ServiceController {
  /**
   * Get all services with optional filters
   */
  static async getAllServices(req: Request, res: Response): Promise<void> {
    try {
      const { featured, limit, offset } = req.query;

      const filters: any = {};
      if (featured !== undefined) filters.featured = featured === 'true';
      if (limit) filters.limit = parseInt(limit as string);
      if (offset) filters.offset = parseInt(offset as string);

      const services = await ServiceModel.findAll(filters);

      const response: ApiResponse = {
        status: 'success',
        data: services,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching services:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch services',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get service by ID
   */
  static async getServiceById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const service = await ServiceModel.findById(id);

      if (!service) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Service not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        data: service,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching service:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch service',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get service by slug
   */
  static async getServiceBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const service = await ServiceModel.findBySlug(slug);

      if (!service) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Service not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        data: service,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching service:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch service',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get featured services
   */
  static async getFeaturedServices(req: Request, res: Response): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
      const services = await ServiceModel.findFeatured(limit);

      const response: ApiResponse = {
        status: 'success',
        data: services,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching featured services:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch featured services',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Create new service
   */
  static async createService(req: Request, res: Response): Promise<void> {
    try {
      const serviceData = req.body;
      const service = await ServiceModel.create(serviceData);

      const response: ApiResponse = {
        status: 'success',
        message: 'Service created successfully',
        data: service,
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating service:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to create service',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Update service
   */
  static async updateService(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const serviceData = req.body;

      const service = await ServiceModel.update(id, serviceData);

      if (!service) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Service not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        message: 'Service updated successfully',
        data: service,
      };

      res.json(response);
    } catch (error) {
      console.error('Error updating service:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to update service',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Delete service
   */
  static async deleteService(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await ServiceModel.delete(id);

      if (!deleted) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Service not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        message: 'Service deleted successfully',
      };

      res.json(response);
    } catch (error) {
      console.error('Error deleting service:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to delete service',
      };
      res.status(500).json(response);
    }
  }
}