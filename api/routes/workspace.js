const express = require("express");
const router = express.Router();
const workspace = require("../models/workspace");
const mongoose = require("mongoose");
const Task = require("../models/tasks");
const User = require("../models/users");

router
  .route("/")

  .get((req, res) => {
    workspace
      .find()
      .populate("tasks")
      .populate("users", ["name", "username", "email"])
      .exec()
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  })

  .post((req, res) => {
    const workSpace = new workspace({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      admin: req.body.admin,
      users: req.body.users,
      tasks: req.body.tasks,
    });
    workSpace
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });

router
  .route("/:workspaceID")

  .get((req, res) => {
    workspace
      .findById(req.params.workspaceID)
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  })

  .delete((req, res) => {
    Workspace.remove({ _id: req.params.body })
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });

router.route("/:workspaceID/addTask/:taskID").patch(async (req, res) => {
  var wexist = await workspace.exists({ _id: req.params.workspaceID });
  var texist = await Task.exists({ _id: req.params.taskID });

  if (wexist && texist) {
    const w = await workspace.findById(req.params.workspaceID).exec();
    w.tasks.push(req.params.taskID);
    w.save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res.sendStatus(400);
  }
});

router.route("/:workshopID/addUser/:UserID")
.patch(async (req, res) => {
  var wexist = await workspace.exists({ _id: req.params.workspaceID });
  var uexist = await User.exists({ _id: req.params.UserID });

  if (wexist && uexist) {
    const w = await workspace.findById(req.params.workspaceID).exec();
    w.users.push(req.params.UserID);
    w.save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
