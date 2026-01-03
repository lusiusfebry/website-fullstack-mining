import { query } from '../config/database';
import { Testimonial } from '../types';

export class TestimonialModel {
  /**
   * Find testimonial by ID
   */
  static async findById(id: string): Promise<Testimonial | null> {
    const result = await query('SELECT * FROM testimonials WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Get all testimonials with optional filters
   */
  static async findAll(filters?: { featured?: boolean; limit?: number }): Promise<Testimonial[]> {
    let queryText = 'SELECT * FROM testimonials WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (filters?.featured !== undefined) {
      queryText += ` AND featured = $${paramIndex++}`;
      params.push(filters.featured);
    }

    queryText += ' ORDER BY created_at DESC';

    if (filters?.limit) {
      queryText += ` LIMIT $${paramIndex++}`;
      params.push(filters.limit);
    }

    const result = await query(queryText, params);
    return result.rows;
  }

  /**
   * Get featured testimonials
   */
  static async findFeatured(limit: number = 3): Promise<Testimonial[]> {
    const result = await query(
      'SELECT * FROM testimonials WHERE featured = $1 ORDER BY created_at DESC LIMIT $2',
      [true, limit]
    );
    return result.rows;
  }

  /**
   * Create new testimonial
   */
  static async create(testimonialData: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>): Promise<Testimonial> {
    const {
      name,
      role,
      company,
      content,
      rating,
      image,
      featured,
    } = testimonialData;
    const result = await query(
      `INSERT INTO testimonials (name, role, company, content, rating, image, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, role, company, content, rating, image, featured]
    );
    return result.rows[0];
  }

  /**
   * Update testimonial
   */
  static async update(id: string, testimonialData: Partial<Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>>): Promise<Testimonial | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (testimonialData.name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(testimonialData.name);
    }
    if (testimonialData.role !== undefined) {
      fields.push(`role = $${paramIndex++}`);
      values.push(testimonialData.role);
    }
    if (testimonialData.company !== undefined) {
      fields.push(`company = $${paramIndex++}`);
      values.push(testimonialData.company);
    }
    if (testimonialData.content !== undefined) {
      fields.push(`content = $${paramIndex++}`);
      values.push(testimonialData.content);
    }
    if (testimonialData.rating !== undefined) {
      fields.push(`rating = $${paramIndex++}`);
      values.push(testimonialData.rating);
    }
    if (testimonialData.image !== undefined) {
      fields.push(`image = $${paramIndex++}`);
      values.push(testimonialData.image);
    }
    if (testimonialData.featured !== undefined) {
      fields.push(`featured = $${paramIndex++}`);
      values.push(testimonialData.featured);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await query(
      `UPDATE testimonials SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  /**
   * Delete testimonial
   */
  static async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM testimonials WHERE id = $1', [id]);
    return (result.rowCount || 0) > 0;
  }
}