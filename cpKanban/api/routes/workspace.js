const express=require('express');
const router = express.Router();
const mongoose=require('mongoose');
const Workspace=require('../models/workspaces');


router.get("/", (req, res, next) => {
    Workspace.find()
      .exec()
      .then(docs => {
        console.log(docs);
           if (docs.length > 0) {
        res.status(200).json(docs);
           } else {
               res.status(404).json({
                   message: 'No entries found'
              });
           }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  

router.post('/',(req,res,next) =>{
    const workSpace=new Workspace({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        admin: req.body.admin
    });
    workSpace
    .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Handling POST requests to /products",
          createdProduct: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});




router.patch('/:wsId',(req,res,next)=>{
    const id = req.params.wsId;
    // const updateOps = {};
    // for (const ops of req.body) {
    //   updateOps[ops.propName] = ops.value;
    // }
    const objForUpdate={};
    if (req.body.tasks) objForUpdate.tasks = req.body.tasks;
    if (req.body.users ) objForUpdate.users = req.body.users;
    Workspace.update({ _id: id }, { $push: objForUpdate })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});

router.patch('/removeTaskUser/:wsId',(req,res,next)=>{
  const id = req.params.wsId;
    // const updateOps = {};
    // for (const ops of req.body) {
    //   updateOps[ops.propName] = ops.value;
    // }
    const objForUpdate={};
    if (req.body.tasks) objForUpdate.tasks = req.body.tasks;
    if (req.body.users ) objForUpdate.users = req.body.users;
    Workspace.update({ _id: id }, { $pull: objForUpdate })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});



router.delete("/:wsId", (req, res, next) => {
    const id = req.params.wsId;
    Workspace.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });




module.exports=router;