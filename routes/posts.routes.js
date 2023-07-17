const express = require("express");
const { auth } = require("../middleware/auth");
const { postModel } = require("../models/posts.model");

const postRouter = express.Router();

postRouter.use(auth);

postRouter.get("", async (req, res) => {
  try {
    const posts = await postModel.find({ userID: req.body.userID });
    res.status(200).send(posts);
  } catch (error) {
    res.status(200).send(error);
  }
});

postRouter.post("/create", async (req, res) => {
  const { title, body, device } = req.body;
  try {
    const posts = new postModel(req.body);
    await posts.save();
    res.status(200).send(req.body);
  } catch (error) {
    res.status(400).send(error);
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const useridinuserdoc = req.body.userID;
  try {
    const posts = await postModel.findOne({ _id: id });
    const useridinpostdoc = posts.userID;
    if (useridinpostdoc === useridinuserdoc) {
      await postModel.findByIDAndUpdate({ _id: id }, req.body);
      res.send({ msg: "updated" });
    } else {
      res.send({ msg: "not authourized" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

postRouter.delete("/update/:id", async (req, res) => {
  const { id } = req.params;
  const useridinuserdoc = req.body.userID;
  try {
    const posts = await postModel.findOne({ _id: id });
    const useridinpostdoc = posts.userID;
    if (useridinpostdoc === useridinuserdoc) {
      await postModel.findByIDAndDelete({ _id: id }, req.body);
      res.send({ msg: "deleted" });
    } else {
      res.send({ msg: "not authourized" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = {
  postRouter,
};
