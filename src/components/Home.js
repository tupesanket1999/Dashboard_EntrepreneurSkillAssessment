import React, { Component } from 'react'
import Fire from '../config/Fire'
import DataManager from './DataManager'
import Login from './Login'

class Home extends Component{

    constructor(props) {
        super(props);
        this.state={
            data: [],
            isLoading:false,
            refresh:true,
        }
      }
      
      componentWillMount(){

        let dataRet = [];
        let UsersId;
        let messageRef = Fire.database().ref('Users');
       
        let query = messageRef.orderByKey();
        this.setState({isLoading:true})

        query.once("value")
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              // key will be "ada" the first time and "alan" the second time
              let key = childSnapshot.key;
              // childData will be the actual contents of the child
              let childData = childSnapshot.val();
              dataRet.push(childData)
          });
        }).then(()=>{
            this.setState({
                data:dataRet,
                isLoading:false,
            })
           
            
        });

        }

    handleData=()=>{
        console.log(this.state.data);
    }

    changeData=(event)=>{
        this.setState({
            name:event.target.value
        })
    }

    updateCom=()=>{
        this.forceUpdate();
        console.log("ref");
    }


    render(){
        const {data,isLoading} = this.state;

       
            return(
                <div>
                    <div>
                       
                        <h1>Admin Page</h1>
                    </div>
                    {isLoading? <div>loading...</div> :<div><DataManager data={data} method={this.updateCom}/></div>}
                </div>

                
                )
       
    }
}

export default Home