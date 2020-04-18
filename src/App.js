import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Home from './components/Home'
function App() {
  function reload(){
    this.forceUpdate(); 
  }
  return (
   <Login/>
  );
}

export default App;
