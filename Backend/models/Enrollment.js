const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  studentId: String,
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  enrollmentDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
