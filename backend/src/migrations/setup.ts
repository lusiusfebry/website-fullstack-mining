import fs from 'fs';
import path from 'path';
import { query } from '../config/database';

/**
 * Setup database by running migration files
 */
export const setupDatabase = async (): Promise<void> => {
  try {
    console.log('Starting database setup...');

    // Read the migration file
    const migrationPath = path.join(__dirname, '001_create_tables.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

    // Execute the migration
    await query(migrationSQL);

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Database setup failed:', error);
    throw error;
  }
};

/**
 * Run this function to setup the database
 */
if (require.main === module) {
  setupDatabase()
    .then(() => {
      console.log('Setup completed. Exiting...');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Setup failed:', error);
      process.exit(1);
    });
}