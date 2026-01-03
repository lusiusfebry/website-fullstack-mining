import { Request, Response } from 'express';
import { ContactSubmissionModel } from '../models';
import { ApiResponse } from '../types';

export class ContactController {
  /**
   * Get all contact submissions with optional filters
   */
  static async getAllContactSubmissions(req: Request, res: Response): Promise<void> {
    try {
      const { status, limit, offset } = req.query;

      const filters: any = {};
      if (status) filters.status = status;
      if (limit) filters.limit = parseInt(limit as string);
      if (offset) filters.offset = parseInt(offset as string);

      const submissions = await ContactSubmissionModel.findAll(filters);

      const response: ApiResponse = {
        status: 'success',
        data: submissions,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch contact submissions',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get contact submission by ID
   */
  static async getContactSubmissionById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const submission = await ContactSubmissionModel.findById(id);

      if (!submission) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Contact submission not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        data: submission,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching contact submission:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch contact submission',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get contact submissions by status
   */
  static async getContactSubmissionsByStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

      const submissions = await ContactSubmissionModel.findByStatus(status, limit, offset);

      const response: ApiResponse = {
        status: 'success',
        data: submissions,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching contact submissions by status:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch contact submissions by status',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Create new contact submission
   */
  static async createContactSubmission(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, phone, subject, message } = req.body;

      // Validate required fields
      if (!name || !email || !message) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Name, email, and message are required',
        };
        res.status(400).json(response);
        return;
      }

      const submissionData = {
        name,
        email,
        phone,
        subject,
        message,
        status: 'pending',
      };

      const submission = await ContactSubmissionModel.create(submissionData);

      const response: ApiResponse = {
        status: 'success',
        message: 'Contact submission created successfully',
        data: submission,
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating contact submission:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to create contact submission',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Update contact submission
   */
  static async updateContactSubmission(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const submissionData = req.body;

      const submission = await ContactSubmissionModel.update(id, submissionData);

      if (!submission) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Contact submission not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        message: 'Contact submission updated successfully',
        data: submission,
      };

      res.json(response);
    } catch (error) {
      console.error('Error updating contact submission:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to update contact submission',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Delete contact submission
   */
  static async deleteContactSubmission(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await ContactSubmissionModel.delete(id);

      if (!deleted) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Contact submission not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        message: 'Contact submission deleted successfully',
      };

      res.json(response);
    } catch (error) {
      console.error('Error deleting contact submission:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to delete contact submission',
      };
      res.status(500).json(response);
    }
  }
}