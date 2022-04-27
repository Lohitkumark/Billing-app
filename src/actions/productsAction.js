import axios from '../config/axios'
import swal from 'sweetalert'

export const startGetProduct = () => {

    const token = localStorage.getItem('token')
    // console.log('token', token);
    return (dispatch) => {
        axios.get('/products', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response)=>{
                const result= response.data
                if(result.hasOwnProperty('errors')){
                    swal(result.errors)
                }else{
                    // console.log('result',result)
                    dispatch(getProducts(result))
                }
            })
            .catch((err)=>{
                swal(err.message);
            })  
    }
}

export const startPostProduct = (formData, props) =>{
    const token = localStorage.getItem('token')
    // console.log('token', token);
    return (dispatch) => {
        axios.post('/products',formData, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response)=>{
                const result= response.data
                if(result.hasOwnProperty('errors')){
                    alert('error', result.errors)
                }else{
                    // console.log('result',result)
                    swal('successfully added')
                    dispatch(addProduct(result))
                }
            })
            .catch((err)=>{
                alert(err.message);
            })  
    }
}

export const startDeleteProduct= (_id) => {
    const token = localStorage.getItem('token')
    console.log('action',_id);
    return (dispatch) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Note",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`/products/${_id}`,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response)=>{
                    const result = response.data._id
                    // alert(result);
                    dispatch(removeProduct(result))
                    swal("Poof! Your Product has been deleted!", {
                        icon: "success",
                      });
                })
                .catch((err)=>{
                    alert(err.message)
                })
            } else {
              swal("Your Product is safe!");
            }
        })
    } 
}

export const startEditProduct = (_id, formData) =>{
    const token = localStorage.getItem('token')
    return (dispatch) =>{
        axios.put(`/products/${_id}`, formData , {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
            .then ((response)=>{
                const result = response.data
                // console.log('res', result);
               dispatch(editProduct(result))
            })
            .catch((err)=>{
                swal(err.message)
            })
    }
}

const getProducts = (result) => {
    return {
        type:'GET_PRODUCTS',
        payload:result
    }
}

const addProduct = (result) => {
    return {
        type:'ADD_PRODUCT', 
        payload:result
    }
}

const removeProduct = (result) => {
    return {
        type : 'REMOVE_PRODUCT',
        payload:result
    }
}

const editProduct = (result) => {
    return {
        type:'EDIT_PRODUCT',
        payload:result
    }
}