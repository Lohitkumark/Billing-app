const countInitialState ={
    loading:false,
    data:[],
    errors:{}
}

const userReducer = (state=countInitialState, action) =>{
    switch(action.type){
        case 'ADD_USER' : {
            return {...state, data:[...state.data, {...action.payload}]}
        }
        case 'LOGIN_USER' : {
            return {...state}
        }
        case 'GET_USER' : {
            return {...state, data:[{...action.payload}]}
        }
        default : {
            return {...state}
        }
    }
}

export default userReducer