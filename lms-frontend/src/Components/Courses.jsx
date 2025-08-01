import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/courses');
      setCourses(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load courses');
      setLoading(false);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/enrollments/me');
      setEnrolledIds(res.data.map(e => e.courseId));
    } catch (err) {
      setError('Failed to load enrollments');
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await axios.post('http://localhost:8000/api/enrollments', { courseId });
      setEnrolledIds([...enrolledIds, courseId]);
    } catch (err) {
      alert('Already enrolled or failed');
    }
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Available Courses</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          {courses.map(course => (
            <Col md={6} lg={4} key={course._id} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <p><strong>Instructor:</strong> {course.instructor}</p>
                  <p><strong>Duration:</strong> {course.duration}</p>
                </Card.Body>
                <Card.Footer className="bg-white border-top-0">
                  {enrolledIds.includes(course._id) ? (
                    <Button variant="success" disabled block>Enrolled</Button>
                  ) : (
                    <Button variant="primary" onClick={() => handleEnroll(course._id)} block>Enroll</Button>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CourseList;
