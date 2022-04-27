import axios from '../config/axios'
import swal from 'sweetalert'

export const startGetCustomer = () => {

    const token = localStorage.getItem('token')
    // console.log('token', token);
    return (dispatch) => {
        axios.get('/customers', {
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
                    dispatch(getCustomer(result))
                }
            })
            .catch((err)=>{
                swal(err.message);
            })  
    }
}

export const startPostCustomer = (formData, props, resetCust) =>{
    const token = localStorage.getItem('token')
    console.log('token', token);
    return (dispatch) => {
        axios.post('/customers',formData, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response)=>{
                const result= response.data
                if(result.hasOwnProperty('errors')){
                    // console.log('error', result.errors)
                }else{
                    // console.log('result',result)
                    swal('successfully added')
                    // resetCust()
                    dispatch(addCustomer(result))
                }
            })
            .catch((err)=>{
                alert(err.message);
            })  
    }
}

export const startDeleteCustomer= (id) => {
    const token = localStorage.getItem('token')
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
                axios.delete(`/Customers/${id}`,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response)=>{
                    const result = response.data._id
                    console.log(result);
                    dispatch(removeCustomer(result))
                    // swal("Poof! Your customer has been deleted!", {
                    //     icon: "success",
                    //   });
                })
                .catch((err)=>{
                    alert(err.message)
                })
            } else {
              swal("Your customer is safe!");
            }
        })
    } 
}

export const startEditCustomer = (id, formData) =>{
    const token = localStorage.getItem('token')
    return (dispatch) =>{
        axios.put(`/customers/${id}`, formData , {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
            .then ((response)=>{
                const result = response.data
                // console.log('res', result);
               dispatch(editCustomer(result))
            })
            .catch((err)=>{
                swal(err.message)
            })
    }
}


const getCustomer = (result) => {
    return {
        type:'GET_CUSTOMER',
        payload:result
    }
}

const addCustomer = (result) => {
    return {
        type:'ADD_CUSTOMER', 
        payload:result
    }
}

const removeCustomer = (result) => {
    return {
        type : 'REMOVE_CUSTOMER',
        payload:result
    }
}

const editCustomer = (result) => {
    return {
        type:'EDIT_CUSTOMER',
        payload:result
    }
}

