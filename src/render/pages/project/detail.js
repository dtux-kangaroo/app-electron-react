import React, { Component}from 'react';
import { NavLink } from "react-router-dom";
import "./style.scss";
import {Icon}from 'antd'
import DetailModel from './components/detailModel'
export default class Detail extends Component {
    constructor (props){
        super(props);
     this.state={
         pageData:[
           {
               name:'home',
               path:'1231',
               des:'主页'
           },
           {
            name:'home',
            path:'1231',
            des:'test页面'
           }
         ],
         isShow:true
     }
    }
  setPage=()=>{
   this.setState({isShow:!this.state.isShow});
  }
  render() {
      const{isShow,pageData}=this.state;
    return  <div className="project-detail">
        <div className="detail-head">
          <div className="head-left fl" onClick={this.setPage}>
             中金项目(home页面)
           <Icon type="caret-down" theme="outlined" />
          </div>
          <div className="head-bar fl">
            <Icon type="area-chart" theme="outlined" />
            <Icon type="sliders" theme="outlined" />
            <Icon type="cloud-download" theme="outlined" />
          </div>
          <div className="head-right fr">
            <i className="iconfont icon-iconset0196"> 文件夹</i>
            <i className="iconfont icon-daima"> 源码</i>
            <i className="iconfont icon-plus-preview"> 预览</i>
          </div>
        </div>
        <div className="detail-content">
            操作页面--大显身手；
        </div>
        <DetailModel data={pageData} display={isShow}></DetailModel>
    </div>
  }
}
