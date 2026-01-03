import { query } from '../config/database';
import { Service } from '../types';

export class ServiceModel {
  /**
   * Find service by ID
   */
  static async findById(id: string): Promise<Service | null> {
    const result = await query('SELECT * FROM services WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Find service by slug
   */
  static async findBySlug(slug: string): Promise<Service | null> {
    const result = await query('SELECT * FROM services WHERE slug = $1', [slug]);
    return result.rows[0] || null;
  }

  /**
   * Get all services
   */
  static async findAll(filters?: { featured?: boolean; limit?: number }): Promise<Service[]> {
    let queryText = 'SELECT * FROM services WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (filters?.featured !== undefined) {
      queryText += ` AND featured = $${paramIndex++}`;
      params.push(filters.featured);
    }

    queryText += ' ORDER BY order_index ASC, created_at DESC';

    if (filters?.limit) {
      queryText += ` LIMIT $${paramIndex++}`;
      params.push(filters.limit);
    }

    const result = await query(queryText, params);
    return result.rows;
  }

  /**
   * Get featured services
   */
  static async findFeatured(limit: number = 6): Promise<Service[]> {
    const result = await query(
      'SELECT * FROM services WHERE featured = $1 ORDER BY order_index ASC LIMIT $2',
      [true, limit]
    );
    return result.rows;
  }

  /**
   * Create new service
   */
  static async create(serviceData: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service> {
    const {
      title,
      slug,
      description,
      content,
      icon,
      image,
      featured,
      order_index,
    } = serviceData;
    const result = await query(
      `INSERT INTO services (title, slug, description, content, icon, image, featured, order_index)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [title, slug, description, content, icon, image, featured, order_index]
    );
    return result.rows[0];
  }

  /**
   * Update service
   */
  static async update(id: string, serviceData: Partial<Omit<Service, 'id' | 'created_at' | 'updated_at'>>): Promise<Service | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (serviceData.title !== undefined) {
      fields.push(`title = $${paramIndex++}`);
      values.push(serviceData.title);
    }
    if (serviceData.slug !== undefined) {
      fields.push(`slug = $${paramIndex++}`);
      values.push(serviceData.slug);
    }
    if (serviceData.description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(serviceData.description);
    }
    if (serviceData.content !== undefined) {
      fields.push(`content = $${paramIndex++}`);
      values.push(serviceData.content);
    }
    if (serviceData.icon !== undefined) {
      fields.push(`icon = $${paramIndex++}`);
      values.push(serviceData.icon);
    }
    if (serviceData.image !== undefined) {
      fields.push(`image = $${paramIndex++}`);
      values.push(serviceData.image);
    }
    if (serviceData.featured !== undefined) {
      fields.push(`featured = $${paramIndex++}`);
      values.push(serviceData.featured);
    }
    if (serviceData.order_index !== undefined) {
      fields.push(`order_index = $${paramIndex++}`);
      values.push(serviceData.order_index);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await query(
      `UPDATE services SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  /**
   * Delete service
   */
  static async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM services WHERE id = $1', [id]);
    return (result.rowCount || 0) > 0;
  }
}