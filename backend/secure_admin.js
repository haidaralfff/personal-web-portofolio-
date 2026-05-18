import pool from "./db.js";
import bcrypt from "bcryptjs";

async function secureAdmin() {
  console.log("🐘 Connecting to database to secure 'admin' account...");
  try {
    const username = "admin";
    const password = "admin123"; // Kombinasi huruf dan nomor yang aman

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await pool.query(
      "UPDATE users SET password = $1 WHERE username = $2 RETURNING id, username",
      [hashedPassword, username]
    );

    if (result.rowCount > 0) {
      console.log(`\n🎉 Success! User "${username}" password has been cryptographically secured using Bcrypt.`);
      console.log(`   Hash: "${hashedPassword}"\n`);
      console.log("🔒 You can now log in using:");
      console.log(`   - Username : ${username}`);
      console.log(`   - Password : ${password}`);
    } else {
      console.log(`❌ User "${username}" not found in the database.`);
    }

  } catch (err) {
    console.error("❌ Failed to update credentials:", err.message);
  } finally {
    await pool.end();
  }
}

secureAdmin();
