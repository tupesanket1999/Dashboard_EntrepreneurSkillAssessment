import React, { Component } from 'react'
import Home from './Home'

class Login extends Component{
  
  state={
    email:'',
    pass:'',
    style:{},
    loggedin:false,
    refresh:true,

  }

  handleChange = (event)=> {

    const { id, value} = event.target

    this.setState({
      [id]: value,
    })
  }

  updateEle=()=>{
   this.forceUpdate();
  }

  popUp=()=>{
    if(this.state.email && this.state.pass !=''){
      if(this.state.pass=='admin' && this.state.email=='admin'){
        alert("logged in")  
        this.setState({
          style:{color: "green"},
          loggedin:true
        })
        
      }else{
        alert("incorrect username or password")
      }
    }else{

      alert('fields are empty')
    }

  }



    render(){
      const isLoggedIn = this.state.loggedin;
        return(
          <div>
           {isLoggedIn ?   <Home method={this.updateEle}/>: <div>
                <div><input name='email1' placeholder="Email" id="email" onChange={this.handleChange} style={this.state.style}></input></div>
                <div><input name='pass1' placeholder="Password" id="pass" onChange={this.handleChange} style={this.state.style}></input></div>
                <button onClick={this.popUp}>Login</button>
            </div>
}
           
          
          </div>)
        }
   
}

export default Login