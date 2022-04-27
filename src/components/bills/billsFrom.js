import React, {useEffect, useState } from "react";
import {Button, Col, Row,Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from 'react-select';
import {MdAddCircleOutline} from 'react-icons/md'
import {RiDeleteBin6Line} from 'react-icons/ri'
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from 'yup'

const BillsForm = (props) => {
  const {formSubmit} = props

  const [formValues, setFormValues] = useState([{ product: "", quantity: 0}].reverse())
  const [custOptions, setCustOptions] = useState([])

  
  
  const customers = useSelector((state)=>{
    return state.customers
  })
  useEffect(()=>{
    const result = customers.data.map((ele)=>{
      return {value:ele._id, label:ele.name}
    })
   setCustOptions(result);
  },[])

  // console.log(options);
  const products = useSelector((state)=>{
    return state.products
  })
  
  const [date, setDate] = useState("");
  const [cust, setCust] = useState('');

  const handleChange = (e, i) => {
    if (e.target.name === "date") {
      setDate(e.target.value);
    }
  }

  let handleAddChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    // console.log('form',newFormValues);
  }

    const addFormFields = () => {
      setFormValues([...formValues, { product: '', quantity: ''}])
    }
    
    const removeFormFields = (i) => {
      const newFormValues = [...formValues];
      newFormValues.splice(i, 1);
      setFormValues(newFormValues)
    }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      date: date,
      customer:cust.value,
      lineItems:formValues
    };
    const resetBill = () => {
      setDate("");
      setCust('')
      setFormValues([{ product: '' , quantity: ''}])
    };
    formSubmit(formData, props, resetBill);
    // console.log(formData);
  };

    // const BillsForm = (props) => {
    //   const {
    //       formSubmit
    //   } = props;

    //   const [formValues, setFormValues] = useState([{ product: "", quantity: 0}])

    //   const handleAddChange = (i, e) => {
    //       const newFormValues = [...formValues];
    //       newFormValues[i][e.target.name] = e.target.value;
    //       setFormValues(newFormValues);
    //     }

    //   const customers = useSelector((state)=>{
    //     return state.customers
    //   })
    //   const products = useSelector((state)=>{
    //     return state.products
    //   })

    //   const addFormFields = () => {
    //     setFormValues([...formValues, { product: '', quantity: ''}])
    //   }
    
    // const removeFormFields = (i) => {
    //   const newFormValues = [...formValues];
    //   newFormValues.splice(i, 1);
    //   setFormValues(newFormValues)
    // }
  
    //   const initialValues = {
    //     date: "",
    //     customer: "",
    //     lineItems:""
    //   }
  
    //   const onSubmit = (values, onSubmitProps) => {
    //       console.log(values);
    //       onSubmitProps.resetForm()
    //   }
  
    //   const validationSchema = Yup.object({
    //     date: Yup.date()
    //       .required('Required'),
    //     customer: Yup.number()
    //       .required('Required'),
    //     customer: Yup.number()
    //       .required('Required')
    //   })
    
  return (
    // <Formik className="mt-4"
    //         initialValues={initialValues}
    //         validationSchema={validationSchema}
    //         onSubmit={onSubmit}
    //     >
    <Form onSubmit={handleSubmit}>
      <div className="mt-4">
        <Form.Control type="date" placeholder="Enter Name" name="date" onChange={handleChange} required/>
        {/* <ErrorMessage name='name' /> */}
        <br/>
        <Select onChange={setCust} options={custOptions} isSearchable required/> 
          {/* <ErrorMessage name='name' /> */}
          <br/>
          {formValues.map((element, index) => (
            <div key={index} className='md-12'>
              <Row>
                <Col md={5}>
                  <select style={{ width: "9rem" }} className='form-control' as='select' required onChange={e => handleAddChange(index, e)} name='product'>  
                    <option value=''>-Select Product-</option>
                    {products.data.map((ele)=>{
                      return <option key={ele._id} value={element.product || ele._id}>{ele.name}</option>
                    })}
                  </select>
                  {/* <ErrorMessage name='name' /> */}
                  <br/>
                </Col>
                <Col md={3}>
                  <Form.Control style={{ width: "5rem" }} className='form-control' type="number" placeholder='Qty' name="quantity" value={Number(element.quantity) || ''} onChange={e => handleAddChange(index, e)} required/>
                  {/* <ErrorMessage name='name' /> */}
                </Col>
                <Col md={4}>
                      <Button size='md' variant="danger" onClick={() => removeFormFields(index)}><RiDeleteBin6Line size="20px" /></Button>
                  </Col> 
              </Row>
            </div>
            ))}
            <div className="mt-2">
              <Button size='md' onClick={() => addFormFields()} >Add</Button>{' '}
              <Button size='md' variant='success' type="submit" >Submit</Button>
            </div>
      </div>
    </Form>
  // </Formik>
  );
};
export default BillsForm;
