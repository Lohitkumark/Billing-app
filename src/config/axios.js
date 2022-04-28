import Axios from 'axios'

const axios = Axios.create({
    baseURL:'//dct-pos-app.herokuapp.com/api'
})

export default axios