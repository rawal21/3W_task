import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    socialHandle: '',
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('socialHandle', formData.socialHandle);
    Array.from(images).forEach((image) => data.append('images', image));

    try {
      await axios.post('https://3w-task.vercel.app/api/users', data);
      alert('Submission successful!');
    } catch (err) {
      console.error(err);
      alert('Error in submission');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Submit Your Details</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Social Media Handle</Form.Label>
          <Form.Control
            type="text"
            name="socialHandle"
            value={formData.socialHandle}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Upload Images</Form.Label>
          <Form.Control
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default UserForm;
