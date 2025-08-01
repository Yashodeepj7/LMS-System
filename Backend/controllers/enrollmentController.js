const Enrollment = require('../models/Enrollment');

const DUMMY_STUDENT_ID = 'dummyStudent123';

// GET /api/enrollments/me
const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentId: DUMMY_STUDENT_ID });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
};

// POST /api/enrollments
const enrollInCourse = async (req, res) => {
  const { courseId } = req.body;

  try {
    const exists = await Enrollment.findOne({ studentId: DUMMY_STUDENT_ID, courseId });
    if (exists) return res.status(400).json({ error: 'Already enrolled' });

    const newEnrollment = await Enrollment.create({
      studentId: DUMMY_STUDENT_ID,
      courseId,
    });

    res.status(201).json(newEnrollment);
  } catch (err) {
    res.status(500).json({ error: 'Enrollment failed' });
  }
};

module.exports = {
  getMyEnrollments,
  enrollInCourse,
};
