import { Request, Response } from 'express';
import { ProjectModel } from '../models';
import { ApiResponse } from '../types';

export class ProjectController {
  /**
   * Get all projects with optional filters
   */
  static async getAllProjects(req: Request, res: Response): Promise<void> {
    try {
      const { status, category, featured, limit, offset } = req.query;

      const filters: any = {};
      if (status) filters.status = status;
      if (category) filters.category = category;
      if (featured !== undefined) filters.featured = featured === 'true';
      if (limit) filters.limit = parseInt(limit as string);
      if (offset) filters.offset = parseInt(offset as string);

      const projects = await ProjectModel.findAll(filters);

      const response: ApiResponse = {
        status: 'success',
        data: projects,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching projects:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch projects',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get project by ID
   */
  static async getProjectById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const project = await ProjectModel.findById(id);

      if (!project) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Project not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        data: project,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching project:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch project',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get project by slug
   */
  static async getProjectBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const project = await ProjectModel.findBySlug(slug);

      if (!project) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Project not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        data: project,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching project:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch project',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get featured projects
   */
  static async getFeaturedProjects(req: Request, res: Response): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
      const projects = await ProjectModel.findFeatured(limit);

      const response: ApiResponse = {
        status: 'success',
        data: projects,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch featured projects',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get projects by category
   */
  static async getProjectsByCategory(req: Request, res: Response): Promise<void> {
    try {
      const { category } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

      const projects = await ProjectModel.findAll({ category, limit, offset });

      const response: ApiResponse = {
        status: 'success',
        data: projects,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching projects by category:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch projects by category',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Create new project
   */
  static async createProject(req: Request, res: Response): Promise<void> {
    try {
      const projectData = req.body;
      const project = await ProjectModel.create(projectData);

      const response: ApiResponse = {
        status: 'success',
        message: 'Project created successfully',
        data: project,
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating project:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to create project',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Update project
   */
  static async updateProject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const projectData = req.body;

      const project = await ProjectModel.update(id, projectData);

      if (!project) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Project not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        message: 'Project updated successfully',
        data: project,
      };

      res.json(response);
    } catch (error) {
      console.error('Error updating project:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to update project',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Delete project
   */
  static async deleteProject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await ProjectModel.delete(id);

      if (!deleted) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Project not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        message: 'Project deleted successfully',
      };

      res.json(response);
    } catch (error) {
      console.error('Error deleting project:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to delete project',
      };
      res.status(500).json(response);
    }
  }
}