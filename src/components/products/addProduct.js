import React,{useEffect, useState} from 'react'
import ProductForm from './productForm'
import { useDispatch } from 'react-redux'
import { startPostProduct } from '../../actions/productsAction'

const AddProduct = (props) =>{
    const dispatch = useDispatch()

    const formSubmit=(formData, props, resetProd)=>{
        dispatch(startPostProduct(formData, props, resetProd))
    }

    return (
        <div>
            <ProductForm formSubmit={formSubmit}/>
        </div>
    )
}

export default AddProduct 