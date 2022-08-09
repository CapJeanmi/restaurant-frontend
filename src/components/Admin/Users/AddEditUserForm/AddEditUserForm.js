import React from 'react';
import { Form, Button, Checkbox } from 'semantic-ui-react';
import './AddEditUserForm.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUser } from '../../../../hooks';


export function AddEditUserForm(props) {
    const { onClose, onReFetch, user } = props;
    const { createUser } = useUser();
    const { updateUser } = useUser();
    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: Yup.object(user ? updateValidationSchema(): newValidationSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if(user) {
                    await updateUser(user.id, formValue);
                } else {
                    await createUser(formValue);
                }
                onReFetch();
                onClose();
            } catch (error) {
                console.error(error);
            }
        }
    })

  return (
    <Form className='add-edit-user-form' onSubmit={ formik.handleSubmit }>
        <Form.Input 
        name='username' 
        placeholder='Nombre de Usuario' 
        value={ formik.values.username } 
        onChange={ formik.handleChange } 
        error={ formik.errors.username } 
        />
        <Form.Input 
        name='email' 
        placeholder='Email' 
        value={ formik.values.email } 
        onChange={ formik.handleChange } 
        error={ formik.errors.email }
        />
        <Form.Input 
        name='first_name' 
        placeholder='Nombres'
        value={ formik.values.first_name }
        onChange={ formik.handleChange } 
        error={ formik.errors.first_name }
         />
        <Form.Input 
        name='last_name' 
        placeholder='Apellidos' 
        value={ formik.values.last_name } 
        onChange={ formik.handleChange } 
        error={ formik.errors.last_name }
        />
        <Form.Input 
        name='password' 
        type='password' 
        placeholder='Contraseña' 
        value={ formik.values.password }
        onChange={ formik.handleChange } 
        error={ formik.errors.password }
        />
        <Form.Input 
        name='password_confirmation' 
        type='password' 
        placeholder='Confirmar Contraseña' 
        value={ formik.values.password_confirmation }
        onChange={ formik.handleChange } 
        error={ formik.errors.password_confirmation }
        />

        <div className='add-edit-user-form__active'>
            <Checkbox 
            toggle 
            checked={ formik.values.is_active } 
            onChange={(_) => formik.setFieldValue('is_active', !formik.values.is_active)}
            /> Usuario Activo
        </div>

        <div className='add-edit-user-form__staff'>
            <Checkbox 
            toggle 
            onChange={(_) => formik.setFieldValue('is_staff', !formik.values.is_staff)} 
            /> Usuario Administrador
        </div>

        <Button type='submit' primary fluid content={user ? 'Actualizar' : 'Crear'} />
    </Form>
  )
}


function initialValues(user) {
    return {
        username: user? user.username : '',
        email: user? user.email : '',
        first_name: user? user.first_name : '',
        last_name: user? user.last_name : '',
        password: '',
        password_confirmation: '',
        is_active: user? user.is_active : true,
        is_staff: user? user.is_staff : false,
    }
}


function newValidationSchema() {
    return {
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        first_name: Yup.string(),
        last_name: Yup.string(),
        password: Yup.string().required(true),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden').required(true),
        is_active: Yup.bool().required(true),
        is_staff: Yup.bool().required(true),
    }
}


function updateValidationSchema() {
    return {
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        first_name: Yup.string(),
        last_name: Yup.string(),
        password: Yup.string(),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
        is_active: Yup.bool().required(true),
        is_staff: Yup.bool().required(true),
    }
}
