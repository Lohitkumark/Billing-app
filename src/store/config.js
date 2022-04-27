import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import customersReducer from '../reducers/customerReducer'
import productsReducer from '../reducers/productsReducer'
import billsRedusers from '../reducers/billsReducer'

const configureStore = () =>{
    const store = createStore(combineReducers({
        users:userReducer,
        customers:customersReducer,
        products:productsReducer,
        bills:billsRedusers
    }),applyMiddleware(thunk))
    return store

}


export default configureStore