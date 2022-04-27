import React,{useEffect, useState} from 'react'
import CustomerForm from './customerForm'
import { useDispatch } from 'react-redux'
import { startPostCustomer } from '../../actions/customerAction'
const AddCustomer = (props) =>{
    const dispatch = useDispatch()

    const formSubmit=(values)=>{
        dispatch(startPostCustomer(values))
    }

    return (
        <div>
            <CustomerForm formSubmit={formSubmit}/>
        </div>
    )
}

export default AddCustomer 