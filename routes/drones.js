const express = require('express');
const router = express.Router();
const listOfDrones = require ( "../models/Drone.model");
const mongoose = require("mongoose");
const droneModel = require('../models/Drone.model');
// require the Drone model here

router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  try{
  const alldrones = await listOfDrones.find(); ;
  //console.log(alldrones);
  res.render("drones/list",{alldrones})
  }catch (err){
    console.log(err);
  }
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form")
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  try{
  const {name, propellers,maxSpeed} = req.body
  const userDrone = new droneModel({name, propellers, maxSpeed})
  await userDrone.save();
  res.redirect("/drones")
  }
  catch(err){
    console.log( err + "Something went wrong with your drone!")
  }
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
const droneId = mongoose.Types.ObjectId(req.params.id);
res.render("drones/update-form")
//console.log(droneId);
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone

});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
