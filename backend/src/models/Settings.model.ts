import { query } from '../config/database';
import { Settings } from '../types';

export class SettingsModel {
  /**
   * Find setting by ID
   */
  static async findById(id: string): Promise<Settings | null> {
    const result = await query('SELECT * FROM settings WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Find setting by key
   */
  static async findByKey(key: string): Promise<Settings | null> {
    const result = await query('SELECT * FROM settings WHERE key = $1', [key]);
    return result.rows[0] || null;
  }

  /**
   * Get all settings
   */
  static async findAll(): Promise<Settings[]> {
    const result = await query('SELECT * FROM settings ORDER BY key ASC');
    return result.rows;
  }

  /**
   * Get settings as key-value object
   */
  static async getAllAsObject(): Promise<Record<string, string>> {
    const result = await query('SELECT key, value FROM settings');
    const settings: Record<string, string> = {};
    result.rows.forEach((row: Settings) => {
      settings[row.key] = row.value;
    });
    return settings;
  }

  /**
   * Get setting value by key
   */
  static async getValue(key: string): Promise<string | null> {
    const setting = await this.findByKey(key);
    return setting ? setting.value : null;
  }

  /**
   * Create new setting
   */
  static async create(settingData: Omit<Settings, 'id' | 'created_at' | 'updated_at'>): Promise<Settings> {
    const {
      key,
      value,
      description,
    } = settingData;
    const result = await query(
      `INSERT INTO settings (key, value, description)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [key, value, description]
    );
    return result.rows[0];
  }

  /**
   * Update setting
   */
  static async update(id: string, settingData: Partial<Omit<Settings, 'id' | 'created_at' | 'updated_at'>>): Promise<Settings | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (settingData.key !== undefined) {
      fields.push(`key = $${paramIndex++}`);
      values.push(settingData.key);
    }
    if (settingData.value !== undefined) {
      fields.push(`value = $${paramIndex++}`);
      values.push(settingData.value);
    }
    if (settingData.description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(settingData.description);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await query(
      `UPDATE settings SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  /**
   * Update setting by key
   */
  static async updateByKey(key: string, value: string): Promise<Settings | null> {
    const result = await query(
      'UPDATE settings SET value = $1 WHERE key = $2 RETURNING *',
      [value, key]
    );
    return result.rows[0] || null;
  }

  /**
   * Delete setting
   */
  static async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM settings WHERE id = $1', [id]);
    return (result.rowCount || 0) > 0;
  }

  /**
   * Delete setting by key
   */
  static async deleteByKey(key: string): Promise<boolean> {
    const result = await query('DELETE FROM settings WHERE key = $1', [key]);
    return (result.rowCount || 0) > 0;
  }
}