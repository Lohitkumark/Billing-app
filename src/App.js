import React,{useState, useEffect} from 'react'
import NavBar from './components/navbar';


function App() {
  const [userLoggedIn, setUserLoggedIn] =useState(false)

  const handleAuth =()=>{
    setUserLoggedIn(!userLoggedIn)
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
      handleAuth()
    }
  },[])

  return (
    <div>
      <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth}/>
    </div>
  );
}

export default App;
