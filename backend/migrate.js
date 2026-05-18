// Database migration script
import pool from "./db.js";

async function migrate() {
  console.log("🐘 Starting database migration...");
  try {
    // 0. Update projects table if existing columns are missing
    await pool.query(`
      ALTER TABLE projects 
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      ADD COLUMN IF NOT EXISTS image_url TEXT
    `);
    console.log("✅ Table 'projects' columns verified/updated.");

    // 1. Create messages table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL,
        subject VARCHAR(255) DEFAULT 'General Inquiry',
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Table 'messages' verified/created.");

    // 2. Create page_views table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS page_views (
        id SERIAL PRIMARY KEY,
        ip_address VARCHAR(45) NOT NULL,
        user_agent TEXT,
        visited_path VARCHAR(255) NOT NULL,
        visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Table 'page_views' verified/created.");

    // 3. Create settings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS settings (
        key VARCHAR(100) PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Table 'settings' verified/created.");

    // 4. Seed initial settings
    const defaultSettings = [
      ['site_name', 'Haidar DailyPorto'],
      ['email', 'admin@portfolio.com'],
      ['bio', 'I am an Information Technology student with a strong passion for software development.'],
      ['resume_url', 'https://drive.google.com/your-resume-pdf'],
      ['github_url', 'https://github.com/haidar'],
      ['linkedin_url', 'https://linkedin.com/in/haidar']
    ];

    for (const [key, value] of defaultSettings) {
      await pool.query(`
        INSERT INTO settings (key, value)
        VALUES ($1, $2)
        ON CONFLICT (key) DO NOTHING
      `, [key, value]);
    }
    console.log("🌱 Default settings seeded.");

    console.log("🎉 Database migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await pool.end();
  }
}

migrate();
