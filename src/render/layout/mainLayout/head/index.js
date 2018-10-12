import React from 'react';
import { Layout, Icon, Dropdown, Menu,Avatar,Tabs } from 'antd';
import { Link,NavLink } from "react-router-dom";
import logo from 'public/icons/logo_64.png'
import electron from 'electron';
const { ipcRenderer } = electron;
const TabPane = Tabs.TabPane;
import { createHashHistory } from 'history';
const history = createHashHistory();
import './style.scss'

export default class Head extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      curTab:1
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return  true;// this.props !== nextProps;
  
  }
  componentWillReceiveProps(nextProps) {
     console.log(nextProps);
  }
  componentDidMount(){}

  _iconClick = (type) => {
    console.log(type,'type');
    switch (type) {
      case 'minimize': ipcRenderer.sendSync('headerType', 'minimize');break;
      case 'restore':
        ipcRenderer.sendSync('headerType', 'restore');break;
      case 'maximize':
        ipcRenderer.sendSync('headerType', 'maximize');break;
      case 'close': ipcRenderer.sendSync('headerType', 'close');break;
      default: break;
    }
  };
  selectTab=(e)=>{
    let type=e.target.innerText;
    console.log(type,1232);
    switch (type){
       case '项目':
        this.setState({curTab:1});
        history.push('/');
       break;
       case 'Box':
       this.setState({curTab:2});
        history.push('/box');
       break;
       case '脚手架':
        this.setState({curTab:3});
        history.push('/scaffold');
       break;
       case '配置':
       this.setState({curTab:4});
        history.push('/conf');
       break;
       default:;
     }
  }
  render() {
    const{curTab}=this.state;
    console.log(this.props,'this.props',this.state);
    return (<div className="main-head">
       <div className="head-logo">
         <img src={logo}/>
        </div>
        <div className="head-content"  onClick={this.selectTab.bind(this)}>
          <span className={curTab==1?'active':""} >项目</span>
          <span  className={curTab==2?'active':""} >Block</span>
          <span  className={curTab==3?'active':""} >脚手架</span>
          <span  className={curTab==4?'active':""} >配置</span>
        </div>
        <div className="head-bar">
          <Icon type="fullscreen" theme="outlined"  onClick={this._iconClick.bind(this,'maximize')}/>
          <Icon type="minus" theme="outlined" onClick={this._iconClick.bind(this,'minimize')}/>
          <Icon type="close" theme="outlined" onClick={this._iconClick.bind(this,'close')}/>
        </div>
    </div>)
  }
}
