import React, { Component, PropTypes } from "react";
import electron from 'electron';
import { Link } from "react-router";
import { Layout, Menu, Breadcrumb,Table,Row, Col } from "antd";
import moment from "moment";
moment.locale("zh-cn");
import "./style.scss";
import {readFilePromise,fileExist} from 'helper/fileHelper'
const { Header, Content, Footer } = Layout;

const { ipcRenderer, shell } = electron;
const { app, dialog } = electron.remote;
export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList:[],
      isLoad:true
    };
  }
  componentDidMount() {
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }
  _readData=(path)=>{
    console.log(path,'323');
    if (fileExist(path)) {
      readFilePromise(path).then((res) => {
        console.log(res);
      })
    }
  }
  _openProject=()=>{
     const extensions = [];
      if (process.platform === 'darwin') {
        extensions.push('json');
      } else {
        extensions.push('pdman.json');
      }
      dialog.showOpenDialog({
        title: 'Open Project',
        properties:['openFile'],
        filters: [
          { name: 'PDMan', extensions: extensions},
        ],
      }, (file) => {
        if (file) {
          this._readData(file[0]);
        }
      });
  }
  _openUrl = (url) => {
    shell.openExternal(url);
  }
  render() {
   const{userList,isLoad}=this.state;
    return (
      <div className="container">
       <Row>
         <Col>
           <div onClick={() => this._openProject()}>
             打开项目
            </div>
         </Col>
       </Row>
       <Row>
         <Col>
           <a onClick={this._openUrl.bind(this,'https://electronjs.org/docs/api/app')}>electron</a>   
           <a onClick={this._openUrl.bind(this,'http://easyv.test.dtstack.net/')}>easyv</a>
         </Col>
       </Row>
      </div>  
    )
  }
}
