import UAParser from "ua-parser-js";

export const getDeviceInfo = (req) => {
  const parser = new UAParser(req.headers["user-agent"]);
  const result = parser.getResult();
  return {
    device: result.device.model || "Unknown",
    os: result.os.name || "Unknown",
    browser: result.browser.name || "Unknown",
  };
};
export default getDeviceInfo;
