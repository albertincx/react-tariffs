import React from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux'

import backendMiddleware from './helpers/backendMiddleware'
import { tariffs } from './reducers/tariffs.reducer'
import Group from './pages/Group'
import Tariffs from './pages/Tariffs'

import './css/style.css'

const history = createHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = composeEnhancers(applyMiddleware(
  routerMiddleware(history),
  backendMiddleware,
))
const store = createStore(
  combineReducers({
    tariffs,
    routerReducer
  }),
  middleware
)

const ConnectedSwitch = connect(state => ({location: state.location}))(Switch)
const AppContainer = () => (
  <ConnectedSwitch>
    <Route exact path="/tariffs" component={Group}/>
    <Route path="/tariffs/tariff/:id" component={Tariffs}/>
    <Route component={() => (<div>404 Page Not Found</div>)}/>
  </ConnectedSwitch>
)

const App = withRouter(connect(state => ({location: state.location}))(AppContainer))

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
