import { query } from '../config/database';
import { Category } from '../types';

export class CategoryModel {
  /**
   * Find category by ID
   */
  static async findById(id: string): Promise<Category | null> {
    const result = await query('SELECT * FROM categories WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Find category by slug
   */
  static async findBySlug(slug: string): Promise<Category | null> {
    const result = await query('SELECT * FROM categories WHERE slug = $1', [slug]);
    return result.rows[0] || null;
  }

  /**
   * Get all categories
   */
  static async findAll(): Promise<Category[]> {
    const result = await query('SELECT * FROM categories ORDER BY name ASC');
    return result.rows;
  }

  /**
   * Create new category
   */
  static async create(categoryData: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<Category> {
    const { name, slug, description } = categoryData;
    const result = await query(
      `INSERT INTO categories (name, slug, description)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, slug, description]
    );
    return result.rows[0];
  }

  /**
   * Update category
   */
  static async update(id: string, categoryData: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>): Promise<Category | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (categoryData.name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(categoryData.name);
    }
    if (categoryData.slug !== undefined) {
      fields.push(`slug = $${paramIndex++}`);
      values.push(categoryData.slug);
    }
    if (categoryData.description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(categoryData.description);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await query(
      `UPDATE categories SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  /**
   * Delete category
   */
  static async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM categories WHERE id = $1', [id]);
    return (result.rowCount || 0) > 0;
  }
}