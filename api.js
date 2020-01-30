const express = require("express");
const router = express.Router();
import UserTable, { User } from "./db/user";

const DATA_LIMIT = 20;

router.get(`/users`, async (req, res) => {
  res.contentType("application/json");
  const users = await UserTable.list(0, DATA_LIMIT);
  setTimeout(() => res.status(200).json({ users }), 1000);
});

router.get("/users/:userId", async (req, res) => {
  res.contentType("application/json");
  await UserTable.createTableIfNotExists();
  const user = new User(`id${i}`, `name${i}`, `aaa${i}@bbb.ccc`);
  await UserTable.save(user);
  setTimeout(() => res.status(200).json({ user }), 1000);
});

module.exports = router;
