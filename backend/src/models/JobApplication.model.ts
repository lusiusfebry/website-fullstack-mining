import { query } from '../config/database';
import { JobApplication } from '../types';

export class JobApplicationModel {
  /**
   * Find job application by ID
   */
  static async findById(id: string): Promise<JobApplication | null> {
    const result = await query('SELECT * FROM job_applications WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Get all job applications with optional filters
   */
  static async findAll(filters?: { job_id?: string; status?: string; limit?: number; offset?: number }): Promise<JobApplication[]> {
    let queryText = 'SELECT * FROM job_applications WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (filters?.job_id) {
      queryText += ` AND job_id = $${paramIndex++}`;
      params.push(filters.job_id);
    }

    if (filters?.status) {
      queryText += ` AND status = $${paramIndex++}`;
      params.push(filters.status);
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
   * Get job applications by job ID
   */
  static async findByJobId(jobId: string, limit: number = 10, offset: number = 0): Promise<JobApplication[]> {
    const result = await query(
      'SELECT * FROM job_applications WHERE job_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      [jobId, limit, offset]
    );
    return result.rows;
  }

  /**
   * Get job applications by status
   */
  static async findByStatus(status: string, limit: number = 10, offset: number = 0): Promise<JobApplication[]> {
    const result = await query(
      'SELECT * FROM job_applications WHERE status = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      [status, limit, offset]
    );
    return result.rows;
  }

  /**
   * Count job applications by job ID
   */
  static async countByJobId(jobId: string): Promise<number> {
    const result = await query('SELECT COUNT(*) FROM job_applications WHERE job_id = $1', [jobId]);
    return parseInt(result.rows[0].count);
  }

  /**
   * Count job applications by status
   */
  static async countByStatus(status?: string): Promise<number> {
    let queryText = 'SELECT COUNT(*) FROM job_applications';
    const params: any[] = [];

    if (status) {
      queryText += ' WHERE status = $1';
      params.push(status);
    }

    const result = await query(queryText, params);
    return parseInt(result.rows[0].count);
  }

  /**
   * Create new job application
   */
  static async create(applicationData: Omit<JobApplication, 'id' | 'created_at' | 'updated_at'>): Promise<JobApplication> {
    const {
      job_id,
      first_name,
      last_name,
      email,
      phone,
      resume_url,
      cover_letter,
      status,
    } = applicationData;
    const result = await query(
      `INSERT INTO job_applications (job_id, first_name, last_name, email, phone, resume_url, cover_letter, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [job_id, first_name, last_name, email, phone, resume_url, cover_letter, status]
    );
    return result.rows[0];
  }

  /**
   * Update job application
   */
  static async update(id: string, applicationData: Partial<Omit<JobApplication, 'id' | 'created_at' | 'updated_at'>>): Promise<JobApplication | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (applicationData.job_id !== undefined) {
      fields.push(`job_id = $${paramIndex++}`);
      values.push(applicationData.job_id);
    }
    if (applicationData.first_name !== undefined) {
      fields.push(`first_name = $${paramIndex++}`);
      values.push(applicationData.first_name);
    }
    if (applicationData.last_name !== undefined) {
      fields.push(`last_name = $${paramIndex++}`);
      values.push(applicationData.last_name);
    }
    if (applicationData.email !== undefined) {
      fields.push(`email = $${paramIndex++}`);
      values.push(applicationData.email);
    }
    if (applicationData.phone !== undefined) {
      fields.push(`phone = $${paramIndex++}`);
      values.push(applicationData.phone);
    }
    if (applicationData.resume_url !== undefined) {
      fields.push(`resume_url = $${paramIndex++}`);
      values.push(applicationData.resume_url);
    }
    if (applicationData.cover_letter !== undefined) {
      fields.push(`cover_letter = $${paramIndex++}`);
      values.push(applicationData.cover_letter);
    }
    if (applicationData.status !== undefined) {
      fields.push(`status = $${paramIndex++}`);
      values.push(applicationData.status);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await query(
      `UPDATE job_applications SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  /**
   * Delete job application
   */
  static async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM job_applications WHERE id = $1', [id]);
    return (result.rowCount || 0) > 0;
  }
}