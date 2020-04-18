import React, { Component } from 'react'
import Fire from '../config/Fire';
import './modal.css'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';

import {CSVLink, CSVDownload} from 'react-csv';


import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

class DataManager extends Component{
    state={
        data:[],
        TableData:[]
        
    }

    componentDidMount(){
        this.setState({
            data:this.props.data
        })
    }

    getKeys = ()=>{
        var p=0;
        var q=0;
        var flagTest=false;
        var flagInfo=false;

        while(!flagInfo && q < this.state.data.length){
            if(typeof this.state.data[q].info != "undefined"){
                var keys = Object.keys(this.state.data[p].info)
                keys.push("time of submission")
                flagInfo=true
                while (!flagTest && p < this.state.data.length) {
    
                    if(typeof this.state.data[p].tests != "undefined"){
                       
                        for(var i =0 ; i < Object.keys(this.state.data[p].tests.marks).length; i++ ){
                        keys.push((i+1).toString())
                        }
                        flagTest=true;
                        return (Object.values(keys))
                    }
                    p++
                }
                return(keys)
            }q++
            
        }
        return(["NO Data Found !"])

        
    }

    
    getHeader = ()=>{
        var keys = this.getKeys();

        return( keys.map((key, index)=>{
        return <TableCell key={key}>{key.toUpperCase()}</TableCell>
        }))
    }

    deleteUser=(row,id)=>{ 
        Fire.database().ref('Users').child(row.UUID).remove();



        console.log(id);
        console.log(row.UUID);
        
        console.log(this.state.data);
        var array = [...this.state.data]; // make a separate copy of the array
        array.splice(id, 1);
        this.setState({data: array});
        
    }

    deleteTest=(row,id)=>{
        console.log(id);
        console.log(row.UUID);
        
        Fire.database().ref('Users').child(row.UUID).child('tests').remove();

        let loadData  = [...this.state.data]
        delete loadData[id].tests
        this.setState({
            data:loadData
        })
    }
    
    returnInfo(){
        var testIspresent;
        return(

            this.state.data.map((row,id)=>{
                if("tests" in row){
                    testIspresent=true;
                    
                    
                }else{
                    testIspresent=false;
                }
                return(<TableRow id={id}>{Object.values(row.info).map((v,i)=>{
                return(<TableCell align="right" id={i}>{v}</TableCell>)})}{testIspresent? <TableCell align="right" >{row.tests.time}</TableCell>: <TableCell align="right">-</TableCell>}{testIspresent?  Object.values(row.tests.marks).map((q,a)=>{return <TableCell align="right" key={a}>{q}</TableCell> }) : <TableCell align="center" colSpan={54}>Test Not Found !</TableCell>} <TableCell align="right">{<button onClick={()=>this.deleteUser(row,id)}>Delete User</button>}</TableCell> <TableCell align="right" >{<button onClick={()=>this.deleteTest(row,id)}>Delete Test</button>}</TableCell></TableRow>)})
        
            )
        }

        downloadData=()=>{
            var dataBase=[this.getKeys(),]
             

            this.props.data.map((d,i)=>{
                var row = Object.values(this.props.data[i].info)

                if("tests" in this.props.data[i]){
                    row.push(this.props.data[i].tests.time)
                    Object.values(this.props.data[i].tests.marks).map((m,i)=>{row.push(m)})
                }else{
                    row.push(0)
                    for(var i=0;i<54;i++){row.push(0)}
                }
                
                dataBase.push(row)
            })
            



            return dataBase
            
        }

       
          
        
    render(){
        
         
         
        
        
        return(
           <div>
            
             <CSVLink data={this.downloadData()} >Download me</CSVLink>
                <TableContainer component={Paper} >
                    <Table stickyHeader size="small" aria-label="sticky table" >
                        <TableHead>
                        <TableRow>
                            {this.getHeader()}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.returnInfo()}
                        </TableBody>
                    </Table>
                </TableContainer>                        
                </div>
)
    }
   
    
}
export default DataManager