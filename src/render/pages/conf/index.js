import React, { Component}from 'react';
import { NavLink } from "react-router-dom";
import "./style.scss";
export default class Conf extends Component {
    constructor (props){
        super(props);
     this.state={
         items:[
             {
                 name:"中烟项目",
                 url:'http://baidu.com'
             },
             {
                name:"茅台项目",
                url:'http://baidu.com'
            },
            {
                name:"茅台项目",
                url:'http://baidu.com'
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
             {item.name} conf
            </div>
         ))}  
      </div>
    </div>
  }
}
