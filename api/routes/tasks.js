const express = require("express");
let router = express.Router();
const mongoose = require("mongoose");
const task = require("../models/tasks");
const auth=require("../../middleware/auth.js");

router
  .route("/")

  .get(auth,(req, res) => {
    task
      .find()
      .exec()
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  })
  .post(auth,(req, res) => {
    const newtask = new task({
      // _id: mongoose.Types.ObjectId(),
      createdOn: new Date().toISOString(),
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      assignedTo: req.body.assignedTo,
    });
    newtask
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// id based operations
router
  .route("/:taskID")

  .get(auth,(req, res) => {
    const id = req.params.taskID;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      // if it's a valid ObjectId format , proceed with `findById` call otherwise will give an error if simple text is sent
      task
        .findById(id)
        .exec()
        .then((doc) => {
          res.status(200).json(doc);
        })
        .catch((err) => {
          console.log(err);
          res.status(501).send(err);
        });
    } else {
      res.status(500).json(null);
    }
  })
  .patch(auth,(req, res) => {
    const id = req.params.taskID;
    const updatetask = {};
    for (const tsk of req.body) {
      updatetask[tsk.propName] = tsk.value;
    }
    task
      .update({ _id: id }, { $set: updatetask })
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  })
  .delete(auth,(req, res) => {
    const id = req.params.taskID;
    task
      .remove({ _id: id })
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router
  .route("/:taskID/:status")
  .patch(auth,(req,res)=>{
    const id = req.params.taskID;
    const stat = req.params.status;
    console.log(id,stat)
    task.updateOne({_id:id},{status:stat})
      .exec()
      .then(result=>{
        console.log(result);
        res.status(200).json(result);
      })
      .catch(err=>{
        console.log(err);
        res.status(500).json(err);
      })
  });


module.exports = router;
