import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import configureStore from './store/config';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore()
console.log(store);

store.subscribe(()=>{
  console.log('updatedState', store.getState());
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
