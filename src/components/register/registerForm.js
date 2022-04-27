import React,{useState} from "react";  
import { Button} from "react-bootstrap";
import { startPostRegister } from "../../actions/userActions"; 
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'


const RegisterForm=(props)=>{
    // const [userName, setUserName]= useState('')
    // const [email, setEmail]= useState('')
    // const [password, setPassword]= useState('')
    // const [businessName, setBusinessName]= useState('')
    // const [address, setAddress]= useState('')

    const dispatch = useDispatch()

    // const handleChange=(e)=>{
    //     if(e.target.name==='userName'){setUserName(e.target.value)}
    //     else if(e.target.name==='email'){setEmail(e.target.value)}
    //     else if(e.target.name==='password'){setPassword(e.target.value)}
    //     else if(e.target.name==='businessName'){setBusinessName(e.target.value)}
    //     else if(e.target.name==='address'){setAddress(e.target.value)}
    // }

    // const handleSubmit=(e)=>{
    //     e.preventDefault()
    //     const formData = {
    //         username: userName,
    //         email:email,
    //         password:password,
    //         businessName:businessName,
    //         address:address
    //     }
    //     dispatch(startPostRegister(formData, props))
        
    // }

    const initialValues = {
        username:"",
        email: "",
        password: "",
        businessName:"",
        address:""
    }

    const onSubmit = (values, onSubmitProps) => {
        console.log(values);
        dispatch(startPostRegister(values, props))
        // onSubmitProps.resetForm()
    }

    const validationSchema = Yup.object({
        username:Yup.string()
            .min(5, 'Must be minimum 5 characters')
            .max(15, 'Must be maximum 15 characters')
            .required(),
        email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        password: Yup.string()
            .min(4, 'Must be minimum 4 characters')
            .max(10, 'password exceds maximum of 10 characters')
            .required('Required'),
        businessName: Yup.string()
            .required()
            .max(15, 'Must be maximum 15 characters'),
        address:Yup.string()
            .required()
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <div className='mt-4'>
                <Form>
                    <Field className= 'form-control' type='text' placeholder='Enter username' name='username'/>
                    <div style={{color:'red'}}>
                        <ErrorMessage name='username'/>
                    </div>
                    <br/>
                    <Field className= 'form-control' type='email' placeholder='Enter email' name='email'/>
                    <div style={{color:'red'}}>
                        <ErrorMessage name='email'/>
                    </div>
                    <br/>
                    <Field className= 'form-control' type='password' placeholder='Enter password'name='password'/>
                    <div style={{color:'red'}}>
                        <ErrorMessage name='password'/>
                    </div>
                    <br/>
                    <Field className= 'form-control' type='text' placeholder='Enter your businessName' name='businessName'/>
                    <div style={{color:'red'}}>
                        <ErrorMessage name='businessName'/>
                    </div>
                    <br/>
                    <Field className= 'form-control' type='textarea' placeholder='Enter your address' name='address'/>
                    <div style={{color:'red'}}>
                        <ErrorMessage name='address'/>
                    </div>
                    <br/>
                    <Button type="submit">Register</Button>
                </Form>
            </div>
        </Formik>
    )
}

export default RegisterForm