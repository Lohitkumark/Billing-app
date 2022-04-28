import axios from '../config/axios'
import Swal from 'sweetalert2'


export const startPostRegister = (formData, props) =>{
    return (dispatch) => {
        axios.post('/users/register', formData)
            .then((response)=>{
                const result=response.data
                // console.log('res',result);
                if(result.hasOwnProperty('errors')){
                    Swal.fire(result.message)
                }else{
                    Swal.fire('successfully registered')
                    dispatch(addUser(result))
                    props.history.push('/Login')
                }
            })
            .catch((err)=>{
                Swal.fire(err.message);
            })
    }
}

export const startPostLogin = (formData, props) => {
    // console.log('start', props);
    return (dispatch) =>{
        axios.post('/users/login', formData)
            .then((response)=>{
                const result= response.data
                if(result.hasOwnProperty('errors')){
                    Swal.fire(result.message)
                }else{
                    Swal.fire('successfully logged in')
                    dispatch(loginUser(result))
                    localStorage.setItem('token',result.token)
                    startGetUser()
                    // console.log('/', props.location);
                    props.history.push("/Dashboard")
                    props.handleAuth()
                }
            })
            .catch((err)=>{
                Swal.fire(err.message);
            })  
    }
}

export const startGetUser = () => {

    const token = localStorage.getItem('token')
    return (dispatch) => {
        axios.get('users/account', {
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
                    dispatch(getUser(result))
                }
            })
            .catch((err)=>{
                Swal.fire(err.message);
            })  
    }
}
const addUser = (result) => {
    return {
        type:'ADD_USER',
        payload:result
    }
}

const loginUser = (result) => {
    return {
        type:'LOGIN_USER',
        payload:result
    }
}

const getUser = (result) => {
    return {
        type:'GET_USER',
        payload:result
    }
}