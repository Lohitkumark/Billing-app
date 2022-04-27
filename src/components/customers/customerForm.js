import React, { useState } from "react";
import {Button } from "react-bootstrap";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'

const CustomerForm = (props) => {
    const { formSubmit, name: custName, mobile: custMobile, email: custEmail} = props;

    const initialValues = {
        name: custName ? custName : "",
        mobile:custMobile ? custMobile : "",
        email:custEmail ? custEmail : "",
    }

    const onSubmit = (values, onSubmitProps) => {
        formSubmit(values);
        onSubmitProps.resetForm()
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        mobile: Yup.string()
            .min(10, 'Must be 10 characters')
            .max(10, 'Must be 10 characters')
            .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
    })

    return (
        <Formik className="mt-4"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form >
                <div>
                    <Field  className='form-control'
                        type="text"
                        placeholder="Enter Name"
                        name="name"
                        
                    />
                    <div style={{color:'red'}}>
                        <ErrorMessage name='name' />
                    </div>
                </div>
                <br />
                <div>
                    <Field className='form-control'
                        type="text"
                        placeholder="Enter Mobile"
                        name="mobile"
                    />
                    <div style={{color:'red'}}>
                        <ErrorMessage name='mobile'/>
                    </div>
                </div>
                <br />
                <div>
                    <Field className='form-control'
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                    />
                    <div style={{color:'red'}}>
                        <ErrorMessage name='email' />
                    </div>
                </div>
                <br />
                <Button type="submit" className="mb-1">
                    Add
                </Button>
            </Form>
        </Formik>
    )
}
export default CustomerForm;
