import { query } from '../config/database';
import { NewsletterSubscription } from '../types';

export class NewsletterSubscriptionModel {
  /**
   * Find newsletter subscription by ID
   */
  static async findById(id: string): Promise<NewsletterSubscription | null> {
    const result = await query('SELECT * FROM newsletter_subscriptions WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Find newsletter subscription by email
   */
  static async findByEmail(email: string): Promise<NewsletterSubscription | null> {
    const result = await query('SELECT * FROM newsletter_subscriptions WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  /**
   * Get all newsletter subscriptions with optional filters
   */
  static async findAll(filters?: { status?: string; limit?: number; offset?: number }): Promise<NewsletterSubscription[]> {
    let queryText = 'SELECT * FROM newsletter_subscriptions WHERE 1=1';
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
   * Get active newsletter subscriptions
   */
  static async findActive(limit: number = 10, offset: number = 0): Promise<NewsletterSubscription[]> {
    const result = await query(
      'SELECT * FROM newsletter_subscriptions WHERE status = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      ['active', limit, offset]
    );
    return result.rows;
  }

  /**
   * Count newsletter subscriptions by status
   */
  static async countByStatus(status?: string): Promise<number> {
    let queryText = 'SELECT COUNT(*) FROM newsletter_subscriptions';
    const params: any[] = [];

    if (status) {
      queryText += ' WHERE status = $1';
      params.push(status);
    }

    const result = await query(queryText, params);
    return parseInt(result.rows[0].count);
  }

  /**
   * Create new newsletter subscription
   */
  static async create(subscriptionData: Omit<NewsletterSubscription, 'id' | 'created_at' | 'updated_at'>): Promise<NewsletterSubscription> {
    const {
      email,
      name,
      status,
    } = subscriptionData;
    const result = await query(
      `INSERT INTO newsletter_subscriptions (email, name, status)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [email, name, status]
    );
    return result.rows[0];
  }

  /**
   * Update newsletter subscription
   */
  static async update(id: string, subscriptionData: Partial<Omit<NewsletterSubscription, 'id' | 'created_at' | 'updated_at'>>): Promise<NewsletterSubscription | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (subscriptionData.email !== undefined) {
      fields.push(`email = $${paramIndex++}`);
      values.push(subscriptionData.email);
    }
    if (subscriptionData.name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(subscriptionData.name);
    }
    if (subscriptionData.status !== undefined) {
      fields.push(`status = $${paramIndex++}`);
      values.push(subscriptionData.status);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await query(
      `UPDATE newsletter_subscriptions SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  /**
   * Unsubscribe newsletter
   */
  static async unsubscribe(email: string): Promise<boolean> {
    const result = await query(
      'UPDATE newsletter_subscriptions SET status = $1 WHERE email = $2',
      ['unsubscribed', email]
    );
    return (result.rowCount || 0) > 0;
  }

  /**
   * Delete newsletter subscription
   */
  static async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM newsletter_subscriptions WHERE id = $1', [id]);
    return (result.rowCount || 0) > 0;
  }
}