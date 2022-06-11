import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import * as Routes from "./router"
import Overview from './view/overview';
import NotFound from "./view/not-found"
import ShoppingCart from './view/shopping-carts';
import SignIn from './view/sign-in';
import ProductDetail from './view/product-detail';
import SignUp from './view/sign-up';
import { useSelector } from 'react-redux';
import {ToastContainer} from "react-toastify"
import MyProfile from './view/profile';
import AdminUser from './view/admin-user';
import AdminProduct from "./view/admin-product"
import AdminOrder from "./view/admin-order"
import OrderDetail from './view/order-dtail';
import EditUserInfo from './view/edit-user-info';
import EditProduct from './view/edit-product';
import AddProduct from './view/add-product';
import Shipping from "./view/shipping"
import Payment from "./view/payment"
import PlaceOrder from "./view/place-order"
import SearchOverview from "./view/search-overview"
import MetaHelmet from './components/MetaHelmet';
import AdminOrderDetail from './view/admin-order-detail'

function App() {
  
  const {user} = useSelector(state => state.auth)
  const {cartItems} = useSelector(state => state.cart)
  const {shipping, payment} = useSelector(state => state.order)
  const role= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

  return (
    <>
      <MetaHelmet />
      <Router>
        <Switch>
          <Route exact path={Routes.INDEX}>
            <Overview />
          </Route>
          <Route path={Routes.SIGN_IN}>
            <SignIn />
          </Route>
          <Route path={Routes.SIGN_UP}>
            {!user && <SignUp />}
            {user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={Routes.PROFILE}>
            {user && <MyProfile />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={`${Routes.PROFILE}/page/:page`}>
            {user && <MyProfile />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={Routes.USER_LIST}>
            {user && <AdminUser />}
            {role && !role.isAdmin && <Redirect to={Routes.INDEX} />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={Routes.PRODUCT_LIST}>
            {user && <AdminProduct />}
            {role && !role.isAdmin && <Redirect to={Routes.INDEX} />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={Routes.ORDER_LIST}>
            {user && <AdminOrder />}
            {role && !role.isAdmin && <Redirect to={Routes.INDEX} />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={Routes.SHIPPING}>
            {user && <Shipping />}
            {!user && <Redirect to={Routes.INDEX} />}
            {cartItems.length===0 && <Redirect to={Routes.INDEX} />}
            {/* {shipping && <Redirect to={Routes.PAYMENT} />} */}
          </Route>
          <Route path={Routes.PAYMENT}>
            {user && <Payment />}
            {!user && <Redirect to={Routes.INDEX} />}
            {cartItems.length===0 && <Redirect to={Routes.INDEX} />}
            {/* {!shipping && <Redirect to={Routes.SHIPPING} />}
            {payment && <Redirect to={Routes.PLACE_ORDER} />} */}
          </Route>
          <Route path={Routes.PLACE_ORDER}>
            {user && <PlaceOrder />}
            {!user && <Redirect to={Routes.INDEX} />}
            {cartItems.length===0 && <Redirect to={Routes.INDEX} />}
            {/* {!payment && <Redirect to={Routes.PAYMENT} />} */}
          </Route>
          <Route path={`${Routes.PRODUCT}/:id`}>
            <ProductDetail />
          </Route>
          <Route path={`${Routes.CART}/:id?`}>
            <ShoppingCart />
          </Route> 
          <Route path={`${Routes.PRODUCT_DETAIL}/add`}>
            {user && <AddProduct />}
            {role && !role.isAdmin && <Redirect to={Routes.INDEX} />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={`${Routes.PRODUCT_DETAIL}/edit/:id`}>
            {user && <EditProduct />}
            {role && !role.isAdmin && <Redirect to={Routes.INDEX} />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route> 
          <Route path={`${Routes.USER}/:id`}>
            {user && <EditUserInfo />}
            {role && !role.isAdmin && <Redirect to={Routes.INDEX} />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={`${Routes.DETAIL_ORDER}/:id`}>
            {user && <OrderDetail />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={`${Routes.ADMIN_ORDER_DETAIL}/:id`}>
            {user && <AdminOrderDetail />}
            {role && !role.isAdmin && <Redirect to={Routes.INDEX} />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={`${Routes.SEARCH}/:keyword`}>
            <SearchOverview />
          </Route>
          <Route path={`/page/:page`}>
            <Overview />
          </Route>
          <Route path={`${Routes.SEARCH}/:keyword/page/:page`}>
            <SearchOverview />
          </Route>
          <Route path={`${Routes.USER_LIST}/page/:page`}>
            {user && <AdminUser />}
            {role && !role.isAdmin && <Redirect to={Routes.INDEX} />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={`${Routes.USER_LIST}/search/:keyword`}>
            {user && <AdminUser />}
            {role && !role.isAdmin && <Redirect to={Routes.INDEX} />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={`${Routes.USER_LIST}/search/:keyword/page/:page`}>
            {user && <AdminUser />}
            {role && !role.isAdmin && <Redirect to={Routes.INDEX} />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={`${Routes.PRODUCT_LIST}/page/:page`}>
            {user && <AdminProduct />}
            {role && !role.isAdmin && <Redirect to={Routes.INDEX} />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={`${Routes.PRODUCT_LIST}/search/:keyword`}>
            {user && <AdminProduct />}
            {role && !role.isAdmin && <Redirect to={Routes.INDEX} />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={`${Routes.PRODUCT_LIST}/search/:keyword/page/:page`}>
            {user && <AdminProduct />}
            {role && !role.isAdmin && <Redirect to={Routes.INDEX} />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={`${Routes.ORDER_LIST}/page/:page`}>
            {user && <AdminOrder />}
            {role && !role.isAdmin && <Redirect to={Routes.INDEX} />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={`${Routes.ORDER_LIST}/search/:search`}>
            {user && <AdminOrder />}
            {role && !role.isAdmin && <Redirect to={Routes.INDEX} />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={`${Routes.ORDER_LIST}/search/:search/page/:page`}>
            {user && <AdminOrder />}
            {role && !role.isAdmin && <Redirect to={Routes.INDEX} />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={Routes.NOT_FOUND}>
            <NotFound />
          </Route>
        </Switch>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
