import React from "react";
import './comp.css'
export default class Modal extends React.Component {
    
    onClose=e=>{
        this.props.onClose && this.props.onClose(e);
    }
  render() {
    if (!this.props.show) {
        return null;
      }    
    return(<div className="blur"><div className="modal" styles={{ height: '500px', overflowY: 'scroll' }} ><button style={{float:"right"}} onClick={e => {this.onClose(e)}}>Close</button><div>{this.props.data.test.map((marks,i)=>{return(<div key={i}>{i +1 +":  " + marks}</div>)})}</div></div></div>);

  }
}