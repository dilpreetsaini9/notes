import { pool } from "../database/database.js";
import { filesModel } from "../models/fileModel.js";
import { postDetails } from "../models/index.js";

async function uploadFile(title, filename, sizeOfFile) {
  try {
    const isUploaded = await pool.query(filesModel.insertFiles, [
      title,
      filename,
      sizeOfFile,
    ]);
    if (isUploaded.affectedRows > 0) {
      return 1;
    } else {
      return 0;
    }
  } catch (e) {
    return 0;
  }
}
async function uploadNote(title, payload) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [id] = await connection.query(postDetails.createPostId, [title]);

    for (const data of payload) {
      if (data.code) {
        await connection.query(postDetails.codeModel, [
          id.insertId,
          data.sno,
          data.code,
        ]);
      } else {
        await connection.query(postDetails.dataModel, [
          id.insertId,
          data.sno,
          data.data,
        ]);
      }
    }

    await connection.commit();
    return 1;
  } catch (error) {
    await connection.rollback();
    console.error("Error in uploadNote:", error);
    return 0;
  } finally {
    connection.release();
  }
}

const postService = {
  uploadFile,
  uploadNote,
};
export default postService;
