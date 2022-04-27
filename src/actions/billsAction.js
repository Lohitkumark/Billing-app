import axios from '../config/axios'
import Swal from 'sweetalert2'

export const startGetBills = () => {

    const token = localStorage.getItem('token')
    // console.log('token', token);
    return (dispatch) => {
        axios.get('/bills', {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response)=>{
                const result= response.data
                if(result.hasOwnProperty('errors')){
                    Swal.fire(result.errors)
                }else{
                    // console.log('result',result)
                    dispatch(getBills(result))
                }
            })
            .catch((err)=>{
                Swal.fire(err.message);
            })  
    }
}

export const startPostBill = (formData, props, resetBill) =>{
    const token = localStorage.getItem('token')
    // console.log('token', formData);
    return (dispatch) => {
        axios.post('/bills',formData, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response)=>{
                const result= response.data
                if(result.hasOwnProperty('errors')){
                    Swal.fire('error', result.errors)
                }else{
                    // console.log('result',result)
                    Swal.fire('successfully added')
                    resetBill()
                    dispatch(addBill(result))
                }
            })
            .catch((err)=>{
                Swal.fire(err.message);
            })  
    }
}

export const startDeleteBill= (id) => {
    const token = localStorage.getItem('token')
    return (dispatch) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Bill",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete'
            }).then((result) => {
                if (result.isConfirmed) {
                axios.delete(`/bills/${id}`,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response)=>{
                    const result = response.data._id
                    // console.log(result);
                    dispatch(removeBill(result))
                    Swal.fire("Your bill has been deleted!", {
                        icon: "success",
                      });
                })
                .catch((err)=>{
                    Swal.fire(err.message)
                })
            } else {
                Swal.fire("Your bill is safe!");
            }
        })
    } 
}

// export const startGetIdBills = (_id) => {

//     const token = localStorage.getItem('token')
    
//     return (dispatch) => {
//         axios.get(`/bills/${_id}`, {
//             headers:{
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//             .then((response)=>{
//                 const result= response.data
//                 if(result.hasOwnProperty('errors')){
//                     swal(result.errors)
//                 }else{
//                     // console.log('result',result)
//                     dispatch(getIdBills(result))
//                 }
//             })
//             .catch((err)=>{
//                 swal(err.message);
//             })  
//     }
// }


const getBills = (result) => {
    return {
        type:'GET_BILLS',
        payload:result
    }
}

const addBill = (result) => {
    return {
        type:'ADD_BILL', 
        payload:result
    }
}

const removeBill = (result) => {
    return {
        type : 'REMOVE_BILL',
        payload:result
    }
}

// const getIdBills = (result) => {
//     return {
//         type:'GET_ID_BILLS',
//         payload:result
//     }
// }