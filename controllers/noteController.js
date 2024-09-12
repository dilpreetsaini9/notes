import client from "../database/redis.js";
import paginate from "../utils/pagination.js";
import noteService from "../services/noteService.js";

const main = async (req, res) => {
  if (!req.sessionCheckerResult) {
    return res.redirect("/auth");
  }
  const ITEMS_PER_PAGE = 7;
  const { pageNumber, offset } = paginate(req.query.page, ITEMS_PER_PAGE);
  const { posts, count } = await noteService.getNotes(ITEMS_PER_PAGE, offset);
  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
  return res.render("index", {
    posts,
    currentPage: pageNumber,
    totalPages,
  });
};

const newNote = async (req, res) => {
  if (!req.sessionCheckerResult) {
    return res.redirect("/auth");
  }
  return res.render("newnote");
};

const getPost = async (req, res) => {
  if (!req.sessionCheckerResult) {
    return res.redirect("/auth");
  }
  if (!req.query.id) {
    return res.status(400).json({ error: "ID is required" });
  }
  const id = parseInt(req.query.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "INVALID REQUEST" });
  }
  const idInString = id.toString();
  const getCachedPost = await client.get(idInString);

  if (!getCachedPost) {
    const { docTitle, posts } = await noteService.getPost(id);
    const postObj = { docTitle, posts };
    await client.set(idInString, JSON.stringify(postObj), "EX", 60 * 60);

    if (posts.length > 0) {
      res.render("post", { posts, docTitle });
    } else {
      res.redirect("/");
    }
  } else {
    const { docTitle, posts } = JSON.parse(getCachedPost);
    res.render("post", { posts, docTitle });
  }
};

const deleteNote = async (req, res) => {
  if (!req.sessionCheckerResult) {
    return res.redirect("/auth");
  }
  if (!req.params.id) {
    return res.status(400).json({ error: "ID is required" });
  }
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "INVALID REQUEST" });
  }

  const result = await noteService.deletePost(id);

  if (result) {
    res.send({ message: "done" });
  } else {
    res.send({ message: "error" });
  }
};

const noteCTLR = {
  main,
  newNote,
  getPost,
  deleteNote,
};
export default noteCTLR;
