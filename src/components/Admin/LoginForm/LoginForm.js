import React from 'react';
import './LoginForm.scss';
import { Button, Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginAPI } from '../../../api/user';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks';


export function LoginForm() {
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      try {
        const response = await loginAPI(formValue);
        const { access } = response;
        login(access);
      } catch (error) {
        toast.error(error.message);
      }
    },
  }
  );

  return (
    <Form className='login-form-admin' onSubmit={formik.handleSubmit}>
        <Form.Input 
        name='email' 
        placeholder='Email' 
        value={formik.values.email} 
        onChange={formik.handleChange}
        error={formik.errors.email} 
        />
        <Form.Input 
        name='password' 
        type='password' 
        placeholder='Password' 
        value={formik.values.password} 
        onChange={formik.handleChange} 
        error={formik.errors.password}
        />
        <Button type='submit' content='Login' primary fluid />
    </Form>
  )
}

function initialValues() {
  return {
    email: '',
    password: '',
  }
}

function validationSchema() {
  return {
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .required('Required'),
  }
}