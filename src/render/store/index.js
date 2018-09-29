
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import appReducer from 'pages/global';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createHashHistory } from 'history';
const history = createHashHistory();
const middleware = routerMiddleware(history);
const middlewares = [thunk, middleware];


const store = createStore(
  combineReducers({ routing: routerReducer, ...appReducer }),
  ISPROD ? applyMiddleware(...middlewares): composeWithDevTools(applyMiddleware(...middlewares))
)
export default   store;
