import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../styles/UserSignup.css';

const UserSignup = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    goal: Yup.string().required('Fitness goal is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await axios.post('https://api.oxygenfitnessgym.com/users/signup', values);
      setStatus({ success: 'User registered successfully!' });
    } catch (error) {
      setStatus({ error: 'Error registering user. Please try again.' });
    }
    setSubmitting(false);
  };

  return (
    <div className="user-signup">
      <h2>User Signup</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '', goal: '' }}
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
              <label htmlFor="goal">Fitness Goal</label>
              <Field as="select" name="goal" className="form-input">
                <option value="">Select Goal</option>
                <option value="weight-loss">Weight Loss</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="endurance">Endurance</option>
                <option value="general-fitness">General Fitness</option>
              </Field>
              <ErrorMessage name="goal" component="div" className="error" />
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

export default UserSignup;