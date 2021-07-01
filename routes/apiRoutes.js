const router = require("express").Router();
const path = require("path");
const Workout = require("../models/workout.js");

router.get("/api/workouts",(req,res)=>{
   Workout.aggregate([
       {
           $addFields: {
               totalDuration:{
                   $sum:"exercises.duration"
               }
           }
       }
   ]).then(data => res.json(data))
   .catch(err=> res.json(err))
})

router.post("/api/workouts",(req,res)=>{
    Workout.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

router.put("/api/workouts/:id",(req,res)=>{
    Workout.findByIdAndUpdate(req.params.id,{
        $push: {exercises:req.body}
    },{new : true, runValidators: true})
    .then(data => res.json(data))
    .catch(err => res.json(err))
})
router.delete("/api/workouts/:id",(req,res)=>{
    Workout.findByIdAndDelete(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.json(err))
})


module.exports = router;





// async getLastWorkout() {
//     let res;
//     try {
//       res = await fetch("/api/workouts");
//     } catch (err) {
//       console.log(err)
//     }
//     const json = await res.json();

//     return json[json.length - 1];
//   },