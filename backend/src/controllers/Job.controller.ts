import { Request, Response } from 'express';
import { JobModel } from '../models';
import { ApiResponse } from '../types';

export class JobController {
  /**
   * Get all jobs with optional filters
   */
  static async getAllJobs(req: Request, res: Response): Promise<void> {
    try {
      const { status, type, department, limit, offset } = req.query;

      const filters: any = {};
      if (status) filters.status = status;
      if (type) filters.type = type;
      if (department) filters.department = department;
      if (limit) filters.limit = parseInt(limit as string);
      if (offset) filters.offset = parseInt(offset as string);

      const jobs = await JobModel.findAll(filters);

      const response: ApiResponse = {
        status: 'success',
        data: jobs,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch jobs',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get job by ID
   */
  static async getJobById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const job = await JobModel.findById(id);

      if (!job) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Job not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        data: job,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching job:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch job',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get job by slug
   */
  static async getJobBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const job = await JobModel.findBySlug(slug);

      if (!job) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Job not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        data: job,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching job:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch job',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get open jobs
   */
  static async getOpenJobs(req: Request, res: Response): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

      const jobs = await JobModel.findOpenJobs(limit, offset);

      const response: ApiResponse = {
        status: 'success',
        data: jobs,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching open jobs:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch open jobs',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get jobs by type
   */
  static async getJobsByType(req: Request, res: Response): Promise<void> {
    try {
      const { type } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

      const jobs = await JobModel.findByType(type, limit, offset);

      const response: ApiResponse = {
        status: 'success',
        data: jobs,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching jobs by type:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch jobs by type',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get jobs by department
   */
  static async getJobsByDepartment(req: Request, res: Response): Promise<void> {
    try {
      const { department } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

      const jobs = await JobModel.findByDepartment(department, limit, offset);

      const response: ApiResponse = {
        status: 'success',
        data: jobs,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching jobs by department:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch jobs by department',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Create new job
   */
  static async createJob(req: Request, res: Response): Promise<void> {
    try {
      const jobData = req.body;
      const job = await JobModel.create(jobData);

      const response: ApiResponse = {
        status: 'success',
        message: 'Job created successfully',
        data: job,
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating job:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to create job',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Update job
   */
  static async updateJob(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const jobData = req.body;

      const job = await JobModel.update(id, jobData);

      if (!job) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Job not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        message: 'Job updated successfully',
        data: job,
      };

      res.json(response);
    } catch (error) {
      console.error('Error updating job:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to update job',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Delete job
   */
  static async deleteJob(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await JobModel.delete(id);

      if (!deleted) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Job not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        message: 'Job deleted successfully',
      };

      res.json(response);
    } catch (error) {
      console.error('Error deleting job:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to delete job',
      };
      res.status(500).json(response);
    }
  }
}