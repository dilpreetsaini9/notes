import requestIp from "request-ip";
// this function is currently not in use
const readIpAddress = (req, res, next) => {
  const clientIp = requestIp.getClientIp(req);

  if (clientIp.startsWith("::ffff:")) {
    clientIp = clientIp.substring(7);
  }
  req.clientIp = clientIp;
  next();
};

export default readIpAddress;
