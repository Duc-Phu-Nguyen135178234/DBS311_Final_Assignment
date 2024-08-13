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

module.exports = router;
