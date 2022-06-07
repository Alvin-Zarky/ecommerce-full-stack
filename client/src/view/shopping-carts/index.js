import React,{useEffect} from 'react';
import NavBar from "../../components/Navbar"
import Footer from '../../components/Footer';
import {Row, Col} from "reactstrap";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import * as Routes from "../../router"
import { addToCart, removeFromCart } from '../../features/cart/cartSlice';
import {AiFillDelete} from "react-icons/ai";
import './shop-cart.scss'
import MetaHelmet from '../../components/MetaHelmet';

export default function ShoppingCart() {

  const {user}= useSelector(state => state.auth)
  const {cartItems}= useSelector(state => state.cart)
  const {id}= useParams()
  const dispatch= useDispatch()
  const location= useLocation()
  const history= useHistory()

  const qty= location.search ? location.search.split("=")[1] : 1

  if(id || !id){
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }

  useEffect(() =>{
    if(id){
      dispatch(addToCart({id, qty}))
    }
  }, [dispatch, id, qty])

  const handleDeleteCart = (id) =>{
    dispatch(removeFromCart({id}))
  }

  return (
    <>
      <MetaHelmet />
      <NavBar />
      <div className="maximum-width-page">
        <div className="shopping-page">
          <Row>
            <Col xl="8" lg="8" md="9">
              <div className="button">
                <div className='link-back'>
                  <Link to={Routes.INDEX}>
                    <span>Go back</span>
                  </Link>
                </div>
              </div>
              <div className="title-page">
                <span>Shopping cart</span>
              </div>
              <div className="box-procceed">
                {cartItems && cartItems.map((val, ind) =>(
                  <div className="box-cart-each" key={val._id}>
                  <Row>
                    <Col xl="3" lg="3" md="3">
                      <div className="image-box">
                        <img src={val.image} alt="image_1" />
                      </div>
                    </Col>
                    <Col xl="3" lg="3" md="3">
                      <div className="title-box">
                        <span>{val.name.length > 30 ? `${val.name.substr(0, 30)}...` : val.name}</span>
                      </div>
                    </Col>
                    <Col xl="3" lg="3" md="3">
                      <div className="box-price">
                        <span>$ {val.price.toFixed(2)}</span>
                      </div>
                    </Col>
                    <Col xl="3" lg="3" md="3">
                      <div className="box-function">
                        <div className="quantity">
                          <select value={val.qty} onChange={(e) => {dispatch(addToCart({id: val._id, qty: e.target.value}))}}>
                            {[...Array(val.stock).keys()].map((x, ind) => (
                              <option value={x + 1} key={x+1}>{x+1}</option>
                            ))}
                          </select>
                        </div>
                        <div className="btn-remove" onClick={() => {handleDeleteCart(val._id)}}>
                          <AiFillDelete />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                ))}
                {cartItems.length===0 && (
                  <div>
                    <span>No Cart Items</span>
                  </div>
                )}
              </div>
            </Col>
            <Col xl="4" lg="4" md="3">
              <div className="sub-total-item">
                <div className="title-item">
                  <span>Subtotal (
                  {cartItems.reduce((acc, item) => Number(item.qty) + acc, 0)}
                  ) items</span>
                </div>
                <div className="price-item">
                  <span> 
                    $ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                  </span>
                </div>
                {!user && (
                  <Link to={`${Routes.SIGN_IN}?redirect=shipping`}>
                    <button className="btn-procceed">
                      Proceed to checkout
                    </button>
                  </Link>
                )}
                {user && (
                  <Link className={`${cartItems.length===0 ? `disabled` : `` }`} to={`${Routes.SHIPPING}`}>
                    <button className={`btn-procceed`}>
                      Proceed to checkout
                    </button>
                  </Link>
                )}
              </div>
            </Col>  
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}
