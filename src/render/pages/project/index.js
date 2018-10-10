import React, { Component}from 'react';
import { NavLink } from "react-router-dom";
import "./style.scss";
import {Icon}from 'antd'
export default class Project extends Component {
    constructor (props){
        super(props);
     this.state={
         items:[
             {
                 name:"中烟项目",
                 url:'/project/detail'
             },
             {
                name:"茅台项目",
                url:'/project/detail'
            },
            {
                name:"茅台项目",
                url:'/project/detail'
            }
         ]
     }
    }

  render() {
    const {items}=this.state;
    return  <div className="content">
      <div className="cards">
         {items.map((item,index)=>(
            <div className="card" key={index}>
              <div className="card-content">
               <NavLink to={item.url}>
                <div className="card-bar clearfix">
                    <Icon type="copy" theme="outlined" />
                    <Icon type="delete" theme="outlined" />
                </div>
                 <div className="card-edit">编辑</div>
               </NavLink>
              </div>
              <div className="card-name">
                {item.name}
              </div>
            </div>
         ))}  
      </div>
    </div>
  }
}
