import React, { Component}from 'react';
import electron from 'electron';
import "./style.scss";
import {Icon}from 'antd'
import DetailModel from './components/detailModel'
const { ipcRenderer, shell } = electron;
const { app, dialog } = electron.remote;
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
         isShow:false
     }
    }
  setPage=()=>{
   this.setState({isShow:!this.state.isShow});
  }
  openFloder=()=>{
    dialog.showOpenDialog({
        title: 'Open Project',
        properties:['openFile'],
        // filters: [
        //   { name: 'test', extensions: extensions},
        // ],
      }, (file) => {
        if (file) {
          //this._readData(file[0], callBack);
        }
      });
  }
  openUrl=()=>{
    shell.openExternal('https://electronjs.org');
  }
  render() {
      const{isShow,pageData}=this.state;
    return  <div className="project-detail">
        <div className="detail-head">
          <div className="head-left fl" onClick={this.setPage.bind(this)}>
             中金项目(home页面)
           <Icon type="caret-down" theme="outlined" />
          </div>
          <div className="head-bar fl">
            <Icon type="area-chart" theme="outlined" />
            <Icon type="sliders" theme="outlined" />
            <Icon type="cloud-download" theme="outlined" />
          </div>
          <div className="head-right fr">
            <i className="iconfont icon-iconset0196" onClick={this.openFloder}> 文件夹</i>
            <i className="iconfont icon-daima" onClick={this.openUrl} > 源码</i>
            <i className="iconfont icon-plus-preview" onClick={this.openUrl}> 预览</i>
          </div>
        </div>
        <div className="detail-content">
            操作页面--大显身手；
        </div>
        <DetailModel data={pageData} display={isShow}></DetailModel>
    </div>
  }
}
