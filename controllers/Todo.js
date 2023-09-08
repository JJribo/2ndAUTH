const { Router } = require("express");
const Todo = require("../models/Todo");
const { isLoggedIn } = require("./middleware");

const router = Router();


router.get("/", isLoggedIn, async (req, res) => {
  const { username } = req.user;
  res.json(
    await Todo.find({ username }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

router.get("/:id", isLoggedIn, async (req, res) => {
  const { username } = req.user;
  const _id = req.params.id;
  res.json(
    await Todo.findOne({ username, _id }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

router.post("/", isLoggedIn, async (req, res) => {
  const { username } = req.user; 
  req.body.username = username;
  res.json(
    await Todo.create(req.body).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

router.put("/:id", isLoggedIn, async (req, res) => {
  const { username } = req.user;
  req.body.username = username;
  const _id = req.params.id;
  res.json(
    await Todo.updateOne({ username, _id }, req.body, { new: true }).catch(
      (error) => res.status(400).json({ error })
    )
  );
});

router.delete("/:id", isLoggedIn, async (req, res) => {
  const { username } = req.user;
  const _id = req.params.id;
  res.json(
    await Todo.remove({ username, _id }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

module.exports = router