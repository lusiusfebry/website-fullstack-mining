import { query } from '../config/database';
import { TeamMember } from '../types';

export class TeamMemberModel {
  /**
   * Find team member by ID
   */
  static async findById(id: string): Promise<TeamMember | null> {
    const result = await query('SELECT * FROM team_members WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Get all team members
   */
  static async findAll(): Promise<TeamMember[]> {
    const result = await query('SELECT * FROM team_members ORDER BY order_index ASC, created_at DESC');
    return result.rows;
  }

  /**
   * Create new team member
   */
  static async create(memberData: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>): Promise<TeamMember> {
    const {
      first_name,
      last_name,
      role,
      bio,
      image,
      linkedin,
      email,
      order_index,
    } = memberData;
    const result = await query(
      `INSERT INTO team_members (first_name, last_name, role, bio, image, linkedin, email, order_index)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [first_name, last_name, role, bio, image, linkedin, email, order_index]
    );
    return result.rows[0];
  }

  /**
   * Update team member
   */
  static async update(id: string, memberData: Partial<Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>>): Promise<TeamMember | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (memberData.first_name !== undefined) {
      fields.push(`first_name = $${paramIndex++}`);
      values.push(memberData.first_name);
    }
    if (memberData.last_name !== undefined) {
      fields.push(`last_name = $${paramIndex++}`);
      values.push(memberData.last_name);
    }
    if (memberData.role !== undefined) {
      fields.push(`role = $${paramIndex++}`);
      values.push(memberData.role);
    }
    if (memberData.bio !== undefined) {
      fields.push(`bio = $${paramIndex++}`);
      values.push(memberData.bio);
    }
    if (memberData.image !== undefined) {
      fields.push(`image = $${paramIndex++}`);
      values.push(memberData.image);
    }
    if (memberData.linkedin !== undefined) {
      fields.push(`linkedin = $${paramIndex++}`);
      values.push(memberData.linkedin);
    }
    if (memberData.email !== undefined) {
      fields.push(`email = $${paramIndex++}`);
      values.push(memberData.email);
    }
    if (memberData.order_index !== undefined) {
      fields.push(`order_index = $${paramIndex++}`);
      values.push(memberData.order_index);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await query(
      `UPDATE team_members SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  /**
   * Delete team member
   */
  static async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM team_members WHERE id = $1', [id]);
    return (result.rowCount || 0) > 0;
  }
}