import { pool } from "../database/database.js";
import createTable from "./tableSchema.js";

async function createTables() {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query(createTable.postSchema);
    await connection.query(createTable.postsDetailSchema);
    await connection.query(createTable.filesSchema);
    await connection.commit();
    console.log("Tables created successfully");
  } catch (error) {
    await connection.rollback();
    console.error(
      "Error creating tables, rolling back changes:",
      error.message
    );
  } finally {
    connection.release();
    pool.end();
  }
}

createTables();
