import { query } from '../config/database';
import { Job } from '../types';

export class JobModel {
  /**
   * Find job by ID
   */
  static async findById(id: string): Promise<Job | null> {
    const result = await query('SELECT * FROM jobs WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Find job by slug
   */
  static async findBySlug(slug: string): Promise<Job | null> {
    const result = await query('SELECT * FROM jobs WHERE slug = $1', [slug]);
    return result.rows[0] || null;
  }

  /**
   * Get all jobs with optional filters
   */
  static async findAll(filters?: { status?: string; type?: string; department?: string; limit?: number; offset?: number }): Promise<Job[]> {
    let queryText = 'SELECT * FROM jobs WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (filters?.status) {
      queryText += ` AND status = $${paramIndex++}`;
      params.push(filters.status);
    }

    if (filters?.type) {
      queryText += ` AND type = $${paramIndex++}`;
      params.push(filters.type);
    }

    if (filters?.department) {
      queryText += ` AND department = $${paramIndex++}`;
      params.push(filters.department);
    }

    queryText += ' ORDER BY posted_at DESC';

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
   * Get open jobs
   */
  static async findOpen(limit?: number): Promise<Job[]> {
    const queryText = limit
      ? 'SELECT * FROM jobs WHERE status = $1 AND (expires_at IS NULL OR expires_at > NOW()) ORDER BY posted_at DESC LIMIT $2'
      : 'SELECT * FROM jobs WHERE status = $1 AND (expires_at IS NULL OR expires_at > NOW()) ORDER BY posted_at DESC';
    const params = limit ? ['open', limit] : ['open'];
    const result = await query(queryText, params);
    return result.rows;
  }

  /**
   * Create new job
   */
  static async create(jobData: Omit<Job, 'id' | 'created_at' | 'updated_at'>): Promise<Job> {
    const {
      title,
      slug,
      description,
      requirements,
      benefits,
      location,
      type,
      department,
      salary_range,
      status,
      posted_at,
      expires_at,
    } = jobData;
    const result = await query(
      `INSERT INTO jobs (title, slug, description, requirements, benefits, location, type, department, salary_range, status, posted_at, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [title, slug, description, requirements, benefits, location, type, department, salary_range, status, posted_at, expires_at]
    );
    return result.rows[0];
  }

  /**
   * Update job
   */
  static async update(id: string, jobData: Partial<Omit<Job, 'id' | 'created_at' | 'updated_at'>>): Promise<Job | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (jobData.title !== undefined) {
      fields.push(`title = $${paramIndex++}`);
      values.push(jobData.title);
    }
    if (jobData.slug !== undefined) {
      fields.push(`slug = $${paramIndex++}`);
      values.push(jobData.slug);
    }
    if (jobData.description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(jobData.description);
    }
    if (jobData.requirements !== undefined) {
      fields.push(`requirements = $${paramIndex++}`);
      values.push(jobData.requirements);
    }
    if (jobData.benefits !== undefined) {
      fields.push(`benefits = $${paramIndex++}`);
      values.push(jobData.benefits);
    }
    if (jobData.location !== undefined) {
      fields.push(`location = $${paramIndex++}`);
      values.push(jobData.location);
    }
    if (jobData.type !== undefined) {
      fields.push(`type = $${paramIndex++}`);
      values.push(jobData.type);
    }
    if (jobData.department !== undefined) {
      fields.push(`department = $${paramIndex++}`);
      values.push(jobData.department);
    }
    if (jobData.salary_range !== undefined) {
      fields.push(`salary_range = $${paramIndex++}`);
      values.push(jobData.salary_range);
    }
    if (jobData.status !== undefined) {
      fields.push(`status = $${paramIndex++}`);
      values.push(jobData.status);
    }
    if (jobData.posted_at !== undefined) {
      fields.push(`posted_at = $${paramIndex++}`);
      values.push(jobData.posted_at);
    }
    if (jobData.expires_at !== undefined) {
      fields.push(`expires_at = $${paramIndex++}`);
      values.push(jobData.expires_at);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await query(
      `UPDATE jobs SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  /**
   * Delete job
   */
  static async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM jobs WHERE id = $1', [id]);
    return (result.rowCount || 0) > 0;
  }
}