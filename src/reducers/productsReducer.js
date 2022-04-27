const countInitialState ={
    loading:false,
    data:[],
    errors:{}
}

const productsReducer = (state=countInitialState, action) =>{
    switch(action.type){
        case 'GET_PRODUCTS':{
            return {...state, data:[...action.payload]}
        }
        case 'ADD_PRODUCT' : {
            return {...state, data:[...state.data, {...action.payload}]}
        }
        case 'REMOVE_PRODUCT' : {
            return{...state, data: state.data.filter((prod)=>{
                // console.log(cust._id);
                return prod._id !== action.payload
            })}
        }
        case "EDIT_PRODUCT" : {
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



export default productsReducer