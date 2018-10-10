import React, { Component}from 'react';
import { NavLink } from "react-router-dom";
import "./style.scss";

export default class DetailModel extends Component {
    constructor (props){
        super(props);
     this.state={}
    }
  render() {
      const {data,display}=this.props;
   return <div className='project-detail-model' style={{display:display?'flex':'none'}}>
        <ul className="page-list">
            {data.map((item,idx)=>(
               <li key={idx}>{item.des}</li>
               ))}
        </ul>
        <div className='page-model'></div>
    </div>
  }
}
