import { Request, Response } from 'express';
import { TeamMemberModel } from '../models';
import { ApiResponse } from '../types';

export class TeamController {
  /**
   * Get all team members
   */
  static async getAllTeamMembers(req: Request, res: Response): Promise<void> {
    try {
      const { limit, offset } = req.query;

      const filters: any = {};
      if (limit) filters.limit = parseInt(limit as string);
      if (offset) filters.offset = parseInt(offset as string);

      const teamMembers = await TeamMemberModel.findAll(filters);

      const response: ApiResponse = {
        status: 'success',
        data: teamMembers,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching team members:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch team members',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get team member by ID
   */
  static async getTeamMemberById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const teamMember = await TeamMemberModel.findById(id);

      if (!teamMember) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Team member not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        data: teamMember,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching team member:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch team member',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Create new team member
   */
  static async createTeamMember(req: Request, res: Response): Promise<void> {
    try {
      const teamMemberData = req.body;
      const teamMember = await TeamMemberModel.create(teamMemberData);

      const response: ApiResponse = {
        status: 'success',
        message: 'Team member created successfully',
        data: teamMember,
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating team member:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to create team member',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Update team member
   */
  static async updateTeamMember(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const teamMemberData = req.body;

      const teamMember = await TeamMemberModel.update(id, teamMemberData);

      if (!teamMember) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Team member not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        message: 'Team member updated successfully',
        data: teamMember,
      };

      res.json(response);
    } catch (error) {
      console.error('Error updating team member:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to update team member',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Delete team member
   */
  static async deleteTeamMember(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await TeamMemberModel.delete(id);

      if (!deleted) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Team member not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        message: 'Team member deleted successfully',
      };

      res.json(response);
    } catch (error) {
      console.error('Error deleting team member:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to delete team member',
      };
      res.status(500).json(response);
    }
  }
}