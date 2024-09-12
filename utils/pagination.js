const paginate = (page, itemsPerPage = 10) => {
  const pageNumber = parseInt(page, 10) || 1;
  const offset = (pageNumber - 1) * itemsPerPage;
  return { pageNumber, offset };
};
export default paginate;
