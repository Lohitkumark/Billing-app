import React,{useEffect, useState} from 'react'
import BillsForm from './billsFrom'
import { useDispatch } from 'react-redux'
import { startPostBill } from '../../actions/billsAction'

const AddBill = (props) =>{
    const dispatch = useDispatch()

    const formSubmit=(formData, props, resetBill)=>{
        dispatch(startPostBill(formData, props, resetBill))
    }

    return (
        <div>
            <BillsForm formSubmit={formSubmit}/>
        </div>
    )
}

export default AddBill 