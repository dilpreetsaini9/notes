import { pool } from "../database/database.js";
import { filesModel } from "../models/fileModel.js";

async function getFile(ITEMS_PER_PAGE, offset) {
  try {
    const [files] = await pool.query(filesModel.getFiles, [
      ITEMS_PER_PAGE,
      offset,
    ]);
    const [[{ count }]] = await pool.query(filesModel.countFiles);
    return { files, count };
  } catch {
    return { files: [], count: 0 };
  }
}
async function deleteFile(fileId) {
  const [isDeleted] = await pool.query(filesModel.deleteFile, [fileId]);
  if (isDeleted.affectedRows > 0) {
    return 1;
  } else {
    return 0;
  }
}

const fileService = {
  getFile,
  deleteFile,
};
export default fileService;
