import { query } from '../config/database';
import { User } from '../types';

export class UserModel {
  /**
   * Find user by ID
   */
  static async findById(id: string): Promise<User | null> {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Find user by email
   */
  static async findByEmail(email: string): Promise<User | null> {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  /**
   * Get all users
   */
  static async findAll(): Promise<User[]> {
    const result = await query('SELECT * FROM users ORDER BY created_at DESC');
    return result.rows;
  }

  /**
   * Create new user
   */
  static async create(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const { email, password_hash, first_name, last_name, role } = userData;
    const result = await query(
      `INSERT INTO users (email, password_hash, first_name, last_name, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [email, password_hash, first_name, last_name, role]
    );
    return result.rows[0];
  }

  /**
   * Update user
   */
  static async update(id: string, userData: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>): Promise<User | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (userData.email !== undefined) {
      fields.push(`email = $${paramIndex++}`);
      values.push(userData.email);
    }
    if (userData.password_hash !== undefined) {
      fields.push(`password_hash = $${paramIndex++}`);
      values.push(userData.password_hash);
    }
    if (userData.first_name !== undefined) {
      fields.push(`first_name = $${paramIndex++}`);
      values.push(userData.first_name);
    }
    if (userData.last_name !== undefined) {
      fields.push(`last_name = $${paramIndex++}`);
      values.push(userData.last_name);
    }
    if (userData.role !== undefined) {
      fields.push(`role = $${paramIndex++}`);
      values.push(userData.role);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  /**
   * Delete user
   */
  static async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM users WHERE id = $1', [id]);
    return (result.rowCount || 0) > 0;
  }
}