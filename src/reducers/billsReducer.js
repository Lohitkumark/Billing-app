const countInitialState ={
    loading:false,
    data:[],
    errors:{}
}

const billsReducer = (state=countInitialState, action) =>{
    switch(action.type){
        case 'GET_BILLS':{
            return {...state, data:[...action.payload]}
        }
        case 'ADD_BILL' : {
            return {...state, data:[...state.data, {...action.payload}]}
        }
        case 'REMOVE_BILL' : {
            return{...state, data: state.data.filter((bill)=>{
                // console.log(cust._id);
                return bill._id !== action.payload
            })}
        }
        // case 'GET_ID_BILLS': {
        //     return {...state, data:[...state.data, {...action.payload}]}
        // }
        default : {
            return {...state}
        }
    }
}



export default billsReducer