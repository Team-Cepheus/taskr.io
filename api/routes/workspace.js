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


router.route("/workspaceTask")
  .post(async (req, res) => {
    var wexist = await workspace.exists({ _id: req.body.workspaceID });
    var texist = await Task.exists({ _id: req.body.taskID });

    if (wexist && texist) {
      const w = await workspace.findById(req.body.workspaceID).exec();
      w.tasks.push(req.body.taskID);
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
  })
  .delete(async (req, res) => {
    var wexist = await workspace.exists({ _id: req.body.workspaceID });
    if (wexist) {
      const w = await workspace.findById(req.body.workspaceID).exec();
      w.tasks.pull({ _id: req.body.taskID })
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
  })

router.route("/workspaceUser")
  .post(async (req, res) => {
    var wexist = await workspace.exists({ _id: req.body.workspaceID });
    var uexist = await User.exists({ _id: req.body.userID });
    console.log(wexist, uexist)
    if (wexist && uexist) {
      const w = await workspace.findById(req.body.workspaceID).exec();
      w.users.push(req.body.userID);
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
  })
  .delete(async (req, res) => {
    var wexist = await workspace.exists({ _id: req.body.workspaceID });
    if (wexist) {
      const w = await workspace.findById(req.body.workspaceID).exec();
      w.users.pull({ _id: req.body.userID })
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
