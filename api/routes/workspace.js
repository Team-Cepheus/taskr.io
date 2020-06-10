const express = require("express");
const router = express.Router();
const Workspace = require("../models/workspace");
const mongoose = require("mongoose");
const Task = require("../models/tasks");
const User = require("../models/users");
const auth = require("../../middleware/auth.js");

router
  .route("/")

  .get(auth, (req, res) => {
    Workspace
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

  .post(auth, (req, res) => {
    const workSpace = new Workspace({
      // _id: new mongoose.Types.ObjectId(),
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
  .route("/:workspaceID", auth)

  .get(auth, (req, res) => {
    Workspace
      .findById(req.params.workspaceID)
      .exec()
      .then((workspace) => {

        // console.log(workspace);
        if (!workspace) {
          return res.status(404).json({
            message: "Workspace not found"
          });
        }
        res.status(200).json(workspace);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  })


router.route("/workspaceTask", auth)
  .patch(auth, async (req, res) => {
    var wexist = await Workspace.exists({ _id: req.body.workspaceID });
    var texist = await Task.exists({ _id: req.body.taskID });

    if (wexist && texist) {
      const w = await Workspace.findById(req.body.workspaceID).exec();
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
  .delete(auth, async (req, res) => {
    var wexist = await Workspace.exists({ _id: req.body.workspaceID });
    if (wexist) {
      const w = await Workspace.findById(req.body.workspaceID).exec();
      w.tasks.pull({ _id: req.body.taskID })
      w.save()
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } else {
      res.status(404).json(
        { message: "Workspace doesn't exist." }
      );
    }
  })

router.route("/workspaceUser", auth)
  .patch(auth, async (req, res) => {
    var wexist = await Workspace.exists({ _id: req.body.workspaceID });
    var uexist = await User.exists({ _id: req.body.userID });
    if (wexist && uexist) {
      const w = await Workspace.findById(req.body.workspaceID).exec();
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
  .delete(auth, async (req, res) => {
    var wexist = await Workspace.exists({ _id: req.body.workspaceID });
    if (wexist) {
      const w = await Workspace.findById(req.body.workspaceID).exec();
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
