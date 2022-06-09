import React, {useEffect} from 'react';
import {useParams} from "react-router-dom"
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import {Row, Col} from "reactstrap"
import {useSelector, useDispatch} from "react-redux"
import {getResultOrder, resetOrder} from "../../features/order/checkOutSlice"
import {resetCart} from "../../features/cart/cartSlice"
import MetaHelmet from "../../components/MetaHelmet"
import './admin-order-detail.scss'

export default function AdminOrderDetail() {
  
  const {order} = useSelector(state => state.order)
  const {user}= useSelector(state => state.auth)
  const dispatch= useDispatch()
  const {id} = useParams()
  const role= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  
  useEffect(() =>{
    dispatch(getResultOrder(id))

    return () => {
      dispatch(resetCart())
      dispatch(resetOrder())
      localStorage.removeItem('cart')
      localStorage.removeItem('shipping')
      localStorage.removeItem('payment')
    }
  }, [dispatch, id])

  return (
    <>
      <MetaHelmet />
      <NavBar />
        <div className="contain-order-detail">
          <div className="title-order">
            <span>Order {order._id}</span>
          </div>
            <Row>
              <Col xl="9" lg="9" md="8">
                <div className="shipping">
                  <div className="title-shipping">
                    <span>Shipping</span>
                  </div>
                  <div className="detail-shipping">
                    <div className="username">
                      <span>Name: {user.name}</span>
                    </div>
                    <div className="useremail">
                      <span>Email: <span className="class-bold">{user.email}</span></span>
                    </div>
                    <div className="address">
                      {order && order.shippingAddress && (
                        <p>Address: {order.shippingAddress.address}</p>
                      )}
                    </div>
                    {order.isPaid && (
                      <div className="box-delivered">
                        <span>Delivered on {order.deliveredAt}</span>
                      </div>
                    )}
                    {!order.isPaid && (
                      <div className="box-delivered box-not-paid">
                        <span>Not Delivered</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="payment-method">
                  <div className="payment-shipping mrg-top10">
                    <span>Payment Method</span>
                  </div>
                  <div className="method">
                    <span>Method: {order.paymentMethod}</span>
                  </div>
                  <div className={`paid-delivered ${order.isDeliver ? `` : `box-not-paid`}`}>
                    {order.isDeliver ? <span>Paid on {order.paidAt}</span> : <span>Not paid</span>}
                  </div>
                </div>
                <div className="order-item">
                  <div className="order-shipping mrg-top10">
                    <span>Order Items</span>
                  </div>
                  <div className="items-order">
                    {order.orderItems && order.orderItems.map((val, ind) =>(
                      <Row className="border-item" key={ind}>
                        <Col xl="2" lg="2" md="6">
                          <div className="image-order">
                            <img src={val.image} alt="" />
                          </div>
                        </Col>
                        <Col xl="6" lg="6" md="6">
                          <div className="title-order-item">
                            <span>{val.name}</span>
                          </div>
                        </Col>
                        <Col xl="4" lg="4" md="4">
                          <div className="price-order">
                            <span>{val.qty} X {val.price} = $ {(Number(val.qty) * Number(val.price)).toFixed(2)}</span>
                          </div>
                        </Col>
                      </Row>
                    ))}
                  </div>
                </div>
              </Col>
              <Col xl="3" lg="3" md="4">
                <div className="box-summary">
                  <div className="overview">
                    <span>Order Summary</span>
                  </div>
                  <div className="items">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Items</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <span>$ {order.orderItems && Math.round(order.orderItems.reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0).toFixed(2)).toFixed(2)}</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="items">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Shipping</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <span>$ {order.shippingPrice && (order.shippingPrice).toFixed(2)}</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="items">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Tax</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <span>$ {order.taxPrice && (order.taxPrice).toFixed(2)}</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="items">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Total</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <span>$ {order.totalPrice && (order.totalPrice).toFixed(2)}</span>
                      </Col>
                    </Row>
                  </div>
                </div>
                <form>
                  {role && role.isAdmin && <button className="btn-delivered">Mark as delivered</button>}
                </form>
              </Col>
            </Row>
        </div>
      <Footer />
    </>
  );
}
