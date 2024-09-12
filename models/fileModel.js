const filesModel = {
  getFiles: `select *  from files where deleted = "false" LIMIT ? OFFSET ? ;`,
  insertFiles: "insert into files (title , location , size) values (?,?,?)",
  countFiles: `SELECT COUNT(*) AS count FROM files WHERE deleted = "false";`,
  deleteFile: `UPDATE files SET deleted = 'true' WHERE id = ?;`,
  fileInfo: `select location ,size  , DATE_FORMAT(created_at, '%d %M %y %H:%i') AS date_modified from files where id = ? && deleted = "false";`,
};
export { filesModel };
