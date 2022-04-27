import React from "react";
import {Button} from "react-bootstrap";
import {useDispatch} from 'react-redux'

import { startPostLogin} from "../../actions/userActions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'



const LoginForm=(props) => {

    const dispatch = useDispatch()

    const initialValues = {
        email: "",
        password: ""
    }

    const onSubmit = (values) => {
        dispatch(startPostLogin(values, props))
        // onSubmitProps.resetForm()
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
            .min(4, 'Must be minimum 4 characters')
            .max(10, 'password exceds maximum of 10 characters')
            .required('Required'),
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                <div>
                    <Field className='form-control' type='email' placeholder='Enter email' name='email' autoComplete='on'/>
                    <div style={{color:'red'}}>
                        <ErrorMessage name='email'/>
                    </div>
                    <br/>
                    <Field className='form-control' type='password' placeholder='Enter password' name='password'/>
                    <div style={{color:'red'}}>
                        <ErrorMessage name='password'/>
                    </div>
                    <br/>
                    <Button type="submit">Login</Button><br/>
                </div>
            </Form>
        </Formik>
    )
}

export default LoginForm