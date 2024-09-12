const getTitles = "select id , title from posts LIMIT ? OFFSET ?";
const countPosts = "SELECT COUNT(*) AS count FROM posts";

const postDetails = {
  createPostId: "insert into posts (title) values (?)",
  codeModel: "insert into postdetails (post_id ,sno , code) values (?,?,?)",
  dataModel: "insert into postdetails (post_id , sno , data) values (?,?,?)",
};
const getPostModel = {
  getTitle: "select title from posts where id = ? ",
  getPosts: "select * from postdetails where post_id = ? ORDER BY sno ASC",
};
const deleteModel = {
  deleteDetails: `DELETE FROM postdetails WHERE post_id = ?;`,
  deletePost: `DELETE FROM posts WHERE id = ?;`,
};
export { getTitles, postDetails, getPostModel, countPosts, deleteModel };
