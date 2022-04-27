const countInitialState ={
    loading:false,
    data:[],
    errors:{}
}

const customersReducer = (state=countInitialState, action) =>{
    switch(action.type){
        case 'GET_CUSTOMER':{
            return {...state, data:[...action.payload]}
        }
        case 'ADD_CUSTOMER' : {
            return {...state, data:[...state.data, {...action.payload}]}
        }
        case 'REMOVE_CUSTOMER' : {
            return{...state, data:state.data.filter((cust)=>{
                // console.log(cust._id);
                return cust._id !== action.payload
            })}
        }
        case "EDIT_CUSTOMER" : {
            return {...state, data : state.data.map((ele)=>{
                // console.log(action.payload._id);
                if(ele._id==action.payload._id){
                    return {...action.payload}
                }else{
                    return {...ele}
                }
            })}
        }
        default : {
            return {...state}
        }
    }
}



export default customersReducer