const express = require('express');
const router = express.Router();
const { getMyEnrollments, enrollInCourse } = require('../controllers/enrollmentController');

router.get('/me', getMyEnrollments);
router.post('/', enrollInCourse);

module.exports = router;
