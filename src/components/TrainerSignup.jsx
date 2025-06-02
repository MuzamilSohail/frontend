import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../styles/TrainerSignup.css';

const TrainerSignup = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    fee: Yup.number().positive('Fee must be positive').required('Fee is required'),
    category: Yup.string().required('Category is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await axios.post('https://api.oxygenfitnessgym.com/trainers/signup', values);
      setStatus({ success: 'Trainer registered successfully!' });
    } catch (error) {
      setStatus({ error: 'Error registering trainer. Please try again.' });
    }
    setSubmitting(false);
  };

  return (
    <div className="trainer-signup">
      <h2>Trainer Signup</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '', fee: '', category: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ status }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" className="form-input" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="form-input" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-input" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="fee">Fee (per session)</label>
              <Field name="fee" type="number" className="form-input" />
              <ErrorMessage name="fee" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <Field as="select" name="category" className="form-input">
                <option value="">Select Category</option>
                <option value="strength">Strength Training</option>
                <option value="cardio">Cardio</option>
                <option value="yoga">Yoga</option>
                <option value="crossfit">CrossFit</option>
              </Field>
              <ErrorMessage name="category" component="div" className="error" />
            </div>
            <button type="submit" className="submit-button">Sign Up</button>
            {status && status.success && <div className="success">{status.success}</div>}
            {status && status.error && <div className="error">{status.error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TrainerSignup;