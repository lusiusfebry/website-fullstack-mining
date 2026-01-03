import { query } from '../config/database';
import { Article } from '../types';

export class ArticleModel {
  /**
   * Find article by ID
   */
  static async findById(id: string): Promise<Article | null> {
    const result = await query('SELECT * FROM articles WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Find article by slug
   */
  static async findBySlug(slug: string): Promise<Article | null> {
    const result = await query('SELECT * FROM articles WHERE slug = $1', [slug]);
    return result.rows[0] || null;
  }

  /**
   * Get all articles with optional filters
   */
  static async findAll(filters?: { status?: string; category_id?: string; limit?: number; offset?: number }): Promise<Article[]> {
    let queryText = 'SELECT * FROM articles WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (filters?.status) {
      queryText += ` AND status = $${paramIndex++}`;
      params.push(filters.status);
    }

    if (filters?.category_id) {
      queryText += ` AND category_id = $${paramIndex++}`;
      params.push(filters.category_id);
    }

    queryText += ' ORDER BY published_at DESC, created_at DESC';

    if (filters?.limit) {
      queryText += ` LIMIT $${paramIndex++}`;
      params.push(filters.limit);
    }

    if (filters?.offset) {
      queryText += ` OFFSET $${paramIndex++}`;
      params.push(filters.offset);
    }

    const result = await query(queryText, params);
    return result.rows;
  }

  /**
   * Get articles by category
   */
  static async findByCategory(categoryId: string, limit?: number): Promise<Article[]> {
    const queryText = limit
      ? 'SELECT * FROM articles WHERE category_id = $1 AND status = $2 ORDER BY published_at DESC LIMIT $3'
      : 'SELECT * FROM articles WHERE category_id = $1 AND status = $2 ORDER BY published_at DESC';
    const params = limit ? [categoryId, 'published', limit] : [categoryId, 'published'];
    const result = await query(queryText, params);
    return result.rows;
  }

  /**
   * Get featured articles
   */
  static async findFeatured(limit: number = 3): Promise<Article[]> {
    const result = await query(
      'SELECT * FROM articles WHERE status = $1 ORDER BY published_at DESC LIMIT $2',
      ['published', limit]
    );
    return result.rows;
  }

  /**
   * Create new article
   */
  static async create(articleData: Omit<Article, 'id' | 'created_at' | 'updated_at'>): Promise<Article> {
    const {
      title,
      slug,
      excerpt,
      content,
      featured_image,
      category_id,
      author_id,
      status,
      published_at,
    } = articleData;
    const result = await query(
      `INSERT INTO articles (title, slug, excerpt, content, featured_image, category_id, author_id, status, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [title, slug, excerpt, content, featured_image, category_id, author_id, status, published_at]
    );
    return result.rows[0];
  }

  /**
   * Update article
   */
  static async update(id: string, articleData: Partial<Omit<Article, 'id' | 'created_at' | 'updated_at'>>): Promise<Article | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (articleData.title !== undefined) {
      fields.push(`title = $${paramIndex++}`);
      values.push(articleData.title);
    }
    if (articleData.slug !== undefined) {
      fields.push(`slug = $${paramIndex++}`);
      values.push(articleData.slug);
    }
    if (articleData.excerpt !== undefined) {
      fields.push(`excerpt = $${paramIndex++}`);
      values.push(articleData.excerpt);
    }
    if (articleData.content !== undefined) {
      fields.push(`content = $${paramIndex++}`);
      values.push(articleData.content);
    }
    if (articleData.featured_image !== undefined) {
      fields.push(`featured_image = $${paramIndex++}`);
      values.push(articleData.featured_image);
    }
    if (articleData.category_id !== undefined) {
      fields.push(`category_id = $${paramIndex++}`);
      values.push(articleData.category_id);
    }
    if (articleData.author_id !== undefined) {
      fields.push(`author_id = $${paramIndex++}`);
      values.push(articleData.author_id);
    }
    if (articleData.status !== undefined) {
      fields.push(`status = $${paramIndex++}`);
      values.push(articleData.status);
    }
    if (articleData.published_at !== undefined) {
      fields.push(`published_at = $${paramIndex++}`);
      values.push(articleData.published_at);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await query(
      `UPDATE articles SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  /**
   * Delete article
   */
  static async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM articles WHERE id = $1', [id]);
    return (result.rowCount || 0) > 0;
  }

  /**
   * Count articles with optional filters
   */
  static async count(filters?: { status?: string; category_id?: string }): Promise<number> {
    let queryText = 'SELECT COUNT(*) as count FROM articles WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (filters?.status) {
      queryText += ` AND status = $${paramIndex++}`;
      params.push(filters.status);
    }

    if (filters?.category_id) {
      queryText += ` AND category_id = $${paramIndex++}`;
      params.push(filters.category_id);
    }

    const result = await query(queryText, params);
    return parseInt(result.rows[0].count, 10);
  }
}