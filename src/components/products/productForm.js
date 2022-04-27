import React,{useState} from 'react'
import {Button} from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'

// const ProductFrom = (props) =>{
//     const {formSubmit,  name:prodName, price:prodPrice} = props
    // const [name, setName] = useState(prodName? prodName: '')
    // const [price, setPrice] = useState(prodPrice? prodPrice: '')

    // const handleChange=(e)=>{
    //     if(e.target.name==='name'){setName(e.target.value)}
    //     else if(e.target.name=='price'){setPrice(e.target.value)}
    // }

    // const handleSubmit=(e)=>{
    //     e.preventDefault()
    //     const formData = {
    //         name: name,
    //         price:price
    //     }
    //     const resetProd = () =>{
    //         setName('')
    //         setPrice('')
    //     }
    //     formSubmit(formData, props, resetProd)
    // }

    const ProductForm = (props) => {
        const {
            formSubmit,
            name: prodName,
            price: prodPrice,
        } = props;
    
        const initialValues = {
            name: prodName ? prodName : "",
            price: prodPrice ? prodPrice : ""
        }
    
        const onSubmit = (values, onSubmitProps) => {
            formSubmit(values);
            onSubmitProps.resetForm()
        }
    
        const validationSchema = Yup.object({
            name: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            price: Yup.number()
                .required('Required')
        })

    return(
        <Formik className="mt-4"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                <div>
                    <Field className='form-control' type='text' placeholder='Enter Name' name='name'/>
                    <div style={{color:'red'}}>
                        <ErrorMessage name='name'/>
                    </div>
                    <br/>
                    <Field className='form-control' type='text' placeholder='Enter Price' name='price'/>
                    <div style={{color:'red'}}>
                        <ErrorMessage name='name'/>
                    </div>
                    <br/>
                    <Button type="submit" className='mb-1'>Add</Button>
                </div>
            </Form>
        </Formik>
    )
}
export default ProductForm