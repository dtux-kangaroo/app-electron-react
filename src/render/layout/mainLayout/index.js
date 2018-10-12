import React, { Component } from 'react';
import { Layout, Tabs,Icon } from "antd";
import { connect } from "react-redux";
import * as global from "pages/global/action";
import './style.scss';
import { NavLink} from "react-router-dom";
import logo from 'public/icons/logo_64.png'
import electron from 'electron';
const { ipcRenderer } = electron;
import { createHashHistory } from 'history';
const history = createHashHistory();
const TabPane = Tabs.TabPane;

export default class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curTab:1
    };
  }

  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {}

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
  render() {
    const {curTab}=this.state;
    console.log(this.props,'props');
    const{pathname}=this.props.location;
    
    return (
     <Layout className="main-layout">
       <div className="main-head">
          <div className="head-logo">
           <img src={logo}/>
          </div>
          <div className="head-content">
           <NavLink to='/project' className={(pathname.indexOf('project')>-1||pathname=='/')?"actived":""}>项目</NavLink>
           <NavLink to='/block' className={pathname.indexOf('block')>-1?"actived":""}>block</NavLink>
           <NavLink to='/scaffold' className={pathname.indexOf('scaffold')>-1?"actived":""}>脚手架</NavLink>
           <NavLink to='/conf' className={pathname.indexOf('conf')>-1?"actived":""}>配置</NavLink>
          </div>
          <div className="head-bar">
            <Icon type="fullscreen" theme="outlined"  onClick={this._iconClick.bind(this,'maximize')}/>
            <Icon type="minus" theme="outlined" onClick={this._iconClick.bind(this,'minimize')}/>
            <Icon type="close" theme="outlined" onClick={this._iconClick.bind(this,'close')}/>
          </div>
      </div>
      <div className="main-content">
       {this.props.children||'加载....'}
      </div>
      </Layout>
    );
  }
}
