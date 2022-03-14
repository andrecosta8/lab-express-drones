const express = require('express');
const router = express.Router();
const Drones = require("../models/Drone.model");
const mongoose = require("mongoose");


// require the Drone model here

router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const alldrones = await Drones.find();;
    //console.log(alldrones);
    res.render("drones/list", { alldrones })
  } catch (err) {
    console.log(err);
  }
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form")
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    const { name, propellers, maxSpeed } = req.body
    const userDrone = new Drones({ name, propellers, maxSpeed })
    await userDrone.save();
    res.redirect("/drones")
  }
  catch (err) {
    console.log(err + "Something went wrong with your drone!")
  }
});

router.get('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const { id } = req.params;
    const drone = await Drones.findById(id);
    res.render('drones/update-form', { id, drone })
  }
  catch (err) {
    console.log(err + "some problem editing the drone")
  }
  // const droneId = mongoose.Types.ObjectId(req.params.id);
  // res.render("drones/update-form", {droneId})
  //console.log(droneId);
});

router.post('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const { id } = req.params
    const { name, propellers, maxSpeed } = req.body
    await Drones.findByIdAndUpdate(id, { name, propellers, maxSpeed })
    res.redirect("/drones");
  }
  catch (err) {
    console.log(err + "something gone wrong on uptade")
  }
});

router.post('/drones/:id/delete', async (req, res, next) => {
  //Iteration #5: Delete the drone
  const { id } = req.params;
  await Drones.findByIdAndDelete(id)
  res.redirect("/drones")
});

module.exports = router;
