import client from "../database/redis.js";
import getDeviceInfo from "../utils/reqDetails.js";
import { v4 as uuidv4 } from "uuid";

async function authPage(req, res) {
  return res.render("segretkey");
}

async function verifyPassword(req, res) {
  if (!req.body.masterkey) {
    return res.status(400).json({ error: "PLEASE PROVIDE KEY" });
  }
  if (!req.verified) {
    return res.status(400).json({ error: "AUTH FAILED" });
  }
  if (req.body.masterkey != process.env.MASTERKEY) {
    return res.status(400).json({ error: "MASTERKEY AUTH FAILED" });
  }
  const { device, os, browser } = getDeviceInfo(req);

  const id = uuidv4();
  const data = {
    device,
    os,
    browser,
    id,
  };

  const expirationTime = 3 * 24 * 60 * 60;

  try {
    await client.set(id, JSON.stringify(data), "EX", expirationTime);
    res.cookie("sessionId", id);
    return res.redirect("/");
  } catch (error) {
    return res.redirect("/auth");
  }
}

const auth = {
  authPage,
  verifyPassword,
};

export default auth;
