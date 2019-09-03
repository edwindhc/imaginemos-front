import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';
import NavBar from './components/header/NavBar';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/layout/Login'
import Register from './components/layout/Register'
import PrivateRoute from './components/router/PrivateRoute';
import ShoppingCart from './components/shop/ShoppingCart';
import Order from './components/order/Order'
import { createBrowserHistory as createHistory } from 'history'
const history = createHistory()

function App() {
  return (
    <Provider store={store} history={history}>
        <BrowserRouter history={history}>
        <div className="App">
          <NavBar />
          <Switch>
          <PrivateRoute exact roles={'user' || 'admin'} path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <PrivateRoute exact roles={'user' || 'admin'} path='/ShoppingCart' component={ShoppingCart} />
          <PrivateRoute exact roles={'user' || 'admin'} path="/home" component={Home} />
          <PrivateRoute exact roles={'user' || 'admin'} path="/orders" component={Order} />
          <Route exact path='/login' component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
