import { query } from '../config/database';
import { ContactSubmission } from '../types';

export class ContactSubmissionModel {
  /**
   * Find contact submission by ID
   */
  static async findById(id: string): Promise<ContactSubmission | null> {
    const result = await query('SELECT * FROM contact_submissions WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Get all contact submissions with optional filters
   */
  static async findAll(filters?: { status?: string; limit?: number; offset?: number }): Promise<ContactSubmission[]> {
    let queryText = 'SELECT * FROM contact_submissions WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

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
   * Get contact submissions by status
   */
  static async findByStatus(status: string, limit: number = 10, offset: number = 0): Promise<ContactSubmission[]> {
    const result = await query(
      'SELECT * FROM contact_submissions WHERE status = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      [status, limit, offset]
    );
    return result.rows;
  }

  /**
   * Count contact submissions by status
   */
  static async countByStatus(status?: string): Promise<number> {
    let queryText = 'SELECT COUNT(*) FROM contact_submissions';
    const params: any[] = [];

    if (status) {
      queryText += ' WHERE status = $1';
      params.push(status);
    }

    const result = await query(queryText, params);
    return parseInt(result.rows[0].count);
  }

  /**
   * Create new contact submission
   */
  static async create(submissionData: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at'>): Promise<ContactSubmission> {
    const {
      name,
      email,
      phone,
      subject,
      message,
      status,
    } = submissionData;
    const result = await query(
      `INSERT INTO contact_submissions (name, email, phone, subject, message, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, email, phone, subject, message, status]
    );
    return result.rows[0];
  }

  /**
   * Update contact submission
   */
  static async update(id: string, submissionData: Partial<Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at'>>): Promise<ContactSubmission | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (submissionData.name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(submissionData.name);
    }
    if (submissionData.email !== undefined) {
      fields.push(`email = $${paramIndex++}`);
      values.push(submissionData.email);
    }
    if (submissionData.phone !== undefined) {
      fields.push(`phone = $${paramIndex++}`);
      values.push(submissionData.phone);
    }
    if (submissionData.subject !== undefined) {
      fields.push(`subject = $${paramIndex++}`);
      values.push(submissionData.subject);
    }
    if (submissionData.message !== undefined) {
      fields.push(`message = $${paramIndex++}`);
      values.push(submissionData.message);
    }
    if (submissionData.status !== undefined) {
      fields.push(`status = $${paramIndex++}`);
      values.push(submissionData.status);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await query(
      `UPDATE contact_submissions SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  /**
   * Delete contact submission
   */
  static async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM contact_submissions WHERE id = $1', [id]);
    return (result.rowCount || 0) > 0;
  }
}