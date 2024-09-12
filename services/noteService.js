import { pool } from "../database/database.js";
import {
  countPosts,
  deleteModel,
  getPostModel,
  getTitles,
} from "../models/index.js";

async function getNotes(ITEMS_PER_PAGE, offset) {
  try {
    const [posts] = await pool.query(getTitles, [ITEMS_PER_PAGE, offset]);
    const [[{ count }]] = await pool.query(countPosts);
    return { posts, count };
  } catch {
    return { posts: [], count: 0 };
  }
}

async function getPost(id) {
  try {
    const [title] = await pool.query(getPostModel.getTitle, [id]);
    const docTitle = title[0].title;
    const [posts] = await pool.query(getPostModel.getPosts, [id]);
    return { docTitle, posts };
  } catch {
    return { docTitle: "Post", posts: [] };
  }
}

async function deletePost(id) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [deletePostDetailsResult] = await connection.query(
      deleteModel.deleteDetails,
      [id]
    );
    const [deletePostResult] = await connection.query(deleteModel.deletePost, [
      id,
    ]);

    if (
      deletePostDetailsResult.affectedRows > 0 &&
      deletePostResult.affectedRows > 0
    ) {
      await connection.commit();
      return 1;
    } else {
      await connection.rollback();
      return 0;
    }
  } catch (e) {
    await connection.rollback();
    return 0;
  } finally {
    connection.release();
  }
}

const noteService = {
  getNotes,
  getPost,
  deletePost,
};

export default noteService;
