import client from "../database/redis.js";
import getDeviceInfo from "../utils/reqDetails.js";

async function sessionChecker(req, res, next) {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    req.sessionCheckerResult = false;
    return next();
  }

  try {
    const data = await client.get(sessionId);

    if (!data) {
      req.sessionCheckerResult = false;
      return next();
    }

    const { device, os, browser } = getDeviceInfo(req);
    const info = JSON.parse(data);

    if (device === info.device && os === info.os && browser === info.browser) {
      req.sessionCheckerResult = true;
    } else {
      req.sessionCheckerResult = false;
    }
  } catch (error) {
    req.sessionCheckerResult = false;
  }

  next();
}

export default sessionChecker;
