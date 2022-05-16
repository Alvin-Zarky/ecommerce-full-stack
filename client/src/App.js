import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import * as Routes from "./router"
import Overview from './view/overview';
import NotFound from "./view/not-found"
import ShoppingCart from './view/shopping-carts';
import SignIn from './view/sign-in';
import ProductDetail from './view/product-detail';
import SignUp from './view/sign-up';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path={Routes.INDEX}>
            <Overview />
          </Route>
          <Route path={Routes.CART}>
            <ShoppingCart />
          </Route>
          <Route path={Routes.SIGN_IN}>
            <SignIn />
          </Route>
          <Route path={Routes.SIGN_UP}>
            <SignUp />
          </Route>
          <Route path={`${Routes.PRODUCT}/:id`}>
            <ProductDetail />
          </Route>
          <Route path={Routes.NOT_FOUND}>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
