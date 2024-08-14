const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Retrieve all active students
router.get('/students/active', async (req, res) => {
   try {
      const students = await Student.find({ status: 'active' });
      res.json(students);
   } catch (err) {
      res.status(500).send(err);
   }
});

// Add a new student record
router.post('/students/add', async (req, res) => {
   try {
      const newStudent = new Student(req.body);
      await newStudent.save();
      res.status(201).json(newStudent);
   } catch (err) {
      res.status(400).send(err);
   }
});

// Update the status of a student
router.patch('/students/update/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const updatedStudent = await Student.findOneAndUpdate(
            { _id: id },  // Match the document by _id
            { status: req.body.status },  // Update the status field
            { new: true }  // Return the updated document
        );

        if (!updatedStudent) {
            return res.status(404).send("Student not found");
        }

        res.json(updatedStudent);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a student record
router.delete('/students/delete/:id', async (req, res) => {
   const id = req.params.id;

   try {
      const deletedStudent = await Student.findByIdAndDelete(id);
      if (!deletedStudent) {
         return res.status(404).send("Student not found");
      }
      res.json(deletedStudent);
   } catch (err) {
      res.status(400).send(err);
   }
});

router.get('/students/leaderboard', async (req, res) => {
   try {
       const leaderboard = await Student.aggregate([
           { $unwind: "$courses" }, // Flatten the courses array
           {
               $group: {
                   _id: "$_id",
                   name: { $first: "$name" },
                   email: { $first: "$email" },
                   student_id: { $first: "$student_id" },
                   total_grade: {
                       $sum: {
                           $switch: {
                               branches: [
                                   { case: { $eq: ["$courses.grade", "A+"] }, then: 95 },
                                   { case: { $eq: ["$courses.grade", "A"] }, then: 85 },
                                   { case: { $eq: ["$courses.grade", "B"] }, then: 75 },
                                   { case: { $eq: ["$courses.grade", "C"] }, then: 65 },
                                   { case: { $eq: ["$courses.grade", "D"] }, then: 55 },
                                   { case: { $eq: ["$courses.grade", "F"] }, then: 25 },
                               ],
                               default: 0
                           }
                       }
                   },
                   course_count: { $sum: 1 } // Count the number of courses
               }
           },
           {
               $addFields: {
                   average_grade: { $divide: ["$total_grade", "$course_count"] } // Calculate the average grade
               }
           },
           { $sort: { average_grade: -1, name: 1 } }, // Sort by highest average grade, then by name
           { $limit: 10 } // Limit to top 10 students
       ]);

       res.render('leaderboard', { students: leaderboard });
   } catch (err) {
       res.status(500).send(err);
   }
});

router.get('/chart', (req, res) => {
   res.render('chart');
});


module.exports = router;
