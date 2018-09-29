import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import Routers from './router'
import "assets/styles/index.scss";
import store from './store'

const render = Component =>
    ReactDOM.render(
      <Provider store={ store }>
      <Component />
      </Provider>,
       document.getElementById('root')
    )
render(Routers)

if(module.hot) {
  module.hot.accept();
}
