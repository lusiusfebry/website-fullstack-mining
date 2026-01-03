import { Request, Response } from 'express';
import { ArticleModel } from '../models';
import { ApiResponse } from '../types';

export class ArticleController {
  /**
   * Get all articles with optional filters
   */
  static async getAllArticles(req: Request, res: Response): Promise<void> {
    try {
      const { status, category_id, featured, limit, offset } = req.query;

      const filters: any = {};
      if (status) filters.status = status;
      if (category_id) filters.category_id = category_id;
      if (featured !== undefined) filters.featured = featured === 'true';
      if (limit) filters.limit = parseInt(limit as string);
      if (offset) filters.offset = parseInt(offset as string);

      const articles = await ArticleModel.findAll(filters);

      const response: ApiResponse = {
        status: 'success',
        data: articles,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching articles:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch articles',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get article by ID
   */
  static async getArticleById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const article = await ArticleModel.findById(id);

      if (!article) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Article not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        data: article,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching article:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch article',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get article by slug
   */
  static async getArticleBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const article = await ArticleModel.findBySlug(slug);

      if (!article) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Article not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        data: article,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching article:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch article',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get featured articles
   */
  static async getFeaturedArticles(req: Request, res: Response): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
      const articles = await ArticleModel.findFeatured(limit);

      const response: ApiResponse = {
        status: 'success',
        data: articles,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching featured articles:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch featured articles',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Get articles by category
   */
  static async getArticlesByCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

      const articles = await ArticleModel.findByCategory(categoryId, limit);

      const response: ApiResponse = {
        status: 'success',
        data: articles,
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching articles by category:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to fetch articles by category',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Create new article
   */
  static async createArticle(req: Request, res: Response): Promise<void> {
    try {
      const articleData = req.body;
      const article = await ArticleModel.create(articleData);

      const response: ApiResponse = {
        status: 'success',
        message: 'Article created successfully',
        data: article,
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating article:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to create article',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Update article
   */
  static async updateArticle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const articleData = req.body;

      const article = await ArticleModel.update(id, articleData);

      if (!article) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Article not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        message: 'Article updated successfully',
        data: article,
      };

      res.json(response);
    } catch (error) {
      console.error('Error updating article:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to update article',
      };
      res.status(500).json(response);
    }
  }

  /**
   * Delete article
   */
  static async deleteArticle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await ArticleModel.delete(id);

      if (!deleted) {
        const response: ApiResponse = {
          status: 'error',
          error: 'Article not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        status: 'success',
        message: 'Article deleted successfully',
      };

      res.json(response);
    } catch (error) {
      console.error('Error deleting article:', error);
      const response: ApiResponse = {
        status: 'error',
        error: 'Failed to delete article',
      };
      res.status(500).json(response);
    }
  }
}