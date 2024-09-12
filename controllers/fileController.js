import client from "../database/redis.js";
import paginate from "../utils/pagination.js";
import fileService from "../services/fileService.js";

const uploadFile = async (req, res) => {
  if (!req.sessionCheckerResult) {
    return res.redirect("/auth");
  }
  res.render("newfile");
};

const getFiles = async (req, res) => {
  if (!req.sessionCheckerResult) {
    return res.redirect("/auth");
  }
  const ITEMS_PER_PAGE = 7;

  const { pageNumber, offset } = paginate(req.query.page, ITEMS_PER_PAGE);
  const { files, count } = await fileService.getFile(ITEMS_PER_PAGE, offset);
  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

  const filetype = files.map((file) => {
    const filename = file.location;
    const extension = filename.split(".").pop();

    return {
      ...file,
      filetype: extension,
      currentPage: pageNumber,
      totalPages,
    };
  });

  res.render("files", { files: filetype, currentPage: pageNumber, totalPages });
};

const deleteFiles = async (req, res) => {
  if (!req.sessionCheckerResult) {
    return res.redirect("/auth");
  }
  if (!req.params.id) {
    return;
  }
  const fileId = parseInt(req.params.id);
  const isDeleted = await fileService.deleteFile(fileId);

  if (isDeleted) {
    return res.send({ message: "done" });
  } else {
    return res.render("files");
  }
};

const fileCTLR = {
  getFiles,
  deleteFiles,
  uploadFile,
};
export default fileCTLR;
