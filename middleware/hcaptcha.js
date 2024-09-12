import { verify } from "hcaptcha";

async function verifyHcaptcha(req, res, next) {
  const token = req.body["h-captcha-response"];

  if (!token) {
    return res.status(400).json({ error: "TOKEN ERROR" });
  }

  const secretKey = process.env.HCAPTCHA;

  verify(secretKey, token)
    .then((data) => {
      if (data.success === true) {
        req.verified = true;
        next();
      } else {
        return res.status(400).json({ error: "AUTH FAILED" });
      }
    })
    .catch(() => {
      return res.status(400).json({ error: "AUTH FAILED" });
    });
}
export default verifyHcaptcha;
