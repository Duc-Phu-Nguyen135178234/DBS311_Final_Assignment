// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   age: { type: Number, required: true, min: 18, max: 30 },
   enrollment_date: { type: Date, required: true },
   status: { type: String, enum: ["active", "graduated", "dropped"], required: true }
}, { collection: 'student_records' }); 

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
