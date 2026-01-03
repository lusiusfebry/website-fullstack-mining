import { query } from '../config/database';
import { Project } from '../types';

export class ProjectModel {
  /**
   * Find project by ID
   */
  static async findById(id: string): Promise<Project | null> {
    const result = await query('SELECT * FROM projects WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Find project by slug
   */
  static async findBySlug(slug: string): Promise<Project | null> {
    const result = await query('SELECT * FROM projects WHERE slug = $1', [slug]);
    return result.rows[0] || null;
  }

  /**
   * Get all projects with optional filters
   */
  static async findAll(filters?: { status?: string; category?: string; featured?: boolean; limit?: number; offset?: number }): Promise<Project[]> {
    let queryText = 'SELECT * FROM projects WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (filters?.status) {
      queryText += ` AND status = $${paramIndex++}`;
      params.push(filters.status);
    }

    if (filters?.category) {
      queryText += ` AND category = $${paramIndex++}`;
      params.push(filters.category);
    }

    if (filters?.featured !== undefined) {
      queryText += ` AND featured = $${paramIndex++}`;
      params.push(filters.featured);
    }

    queryText += ' ORDER BY created_at DESC';

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
   * Get projects by status
   */
  static async findByStatus(status: string, limit?: number): Promise<Project[]> {
    const queryText = limit
      ? 'SELECT * FROM projects WHERE status = $1 ORDER BY created_at DESC LIMIT $2'
      : 'SELECT * FROM projects WHERE status = $1 ORDER BY created_at DESC';
    const params = limit ? [status, limit] : [status];
    const result = await query(queryText, params);
    return result.rows;
  }

  /**
   * Get featured projects
   */
  static async findFeatured(limit: number = 6): Promise<Project[]> {
    const result = await query(
      'SELECT * FROM projects WHERE featured = $1 ORDER BY created_at DESC LIMIT $2',
      [true, limit]
    );
    return result.rows;
  }

  /**
   * Create new project
   */
  static async create(projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
    const {
      title,
      slug,
      description,
      content,
      location,
      status,
      category,
      featured_image,
      gallery,
      start_date,
      end_date,
      client,
      featured,
    } = projectData;
    const result = await query(
      `INSERT INTO projects (title, slug, description, content, location, status, category, featured_image, gallery, start_date, end_date, client, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [title, slug, description, content, location, status, category, featured_image, JSON.stringify(gallery), start_date, end_date, client, featured]
    );
    return result.rows[0];
  }

  /**
   * Update project
   */
  static async update(id: string, projectData: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>): Promise<Project | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (projectData.title !== undefined) {
      fields.push(`title = $${paramIndex++}`);
      values.push(projectData.title);
    }
    if (projectData.slug !== undefined) {
      fields.push(`slug = $${paramIndex++}`);
      values.push(projectData.slug);
    }
    if (projectData.description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(projectData.description);
    }
    if (projectData.content !== undefined) {
      fields.push(`content = $${paramIndex++}`);
      values.push(projectData.content);
    }
    if (projectData.location !== undefined) {
      fields.push(`location = $${paramIndex++}`);
      values.push(projectData.location);
    }
    if (projectData.status !== undefined) {
      fields.push(`status = $${paramIndex++}`);
      values.push(projectData.status);
    }
    if (projectData.category !== undefined) {
      fields.push(`category = $${paramIndex++}`);
      values.push(projectData.category);
    }
    if (projectData.featured_image !== undefined) {
      fields.push(`featured_image = $${paramIndex++}`);
      values.push(projectData.featured_image);
    }
    if (projectData.gallery !== undefined) {
      fields.push(`gallery = $${paramIndex++}`);
      values.push(JSON.stringify(projectData.gallery));
    }
    if (projectData.start_date !== undefined) {
      fields.push(`start_date = $${paramIndex++}`);
      values.push(projectData.start_date);
    }
    if (projectData.end_date !== undefined) {
      fields.push(`end_date = $${paramIndex++}`);
      values.push(projectData.end_date);
    }
    if (projectData.client !== undefined) {
      fields.push(`client = $${paramIndex++}`);
      values.push(projectData.client);
    }
    if (projectData.featured !== undefined) {
      fields.push(`featured = $${paramIndex++}`);
      values.push(projectData.featured);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await query(
      `UPDATE projects SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  /**
   * Delete project
   */
  static async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM projects WHERE id = $1', [id]);
    return (result.rowCount || 0) > 0;
  }
}