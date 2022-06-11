import React, {useEffect, useState, useRef} from 'react';
import {useParams} from "react-router-dom"
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import {Row, Col} from "reactstrap"
import {PayPalButton} from "react-paypal-button-v2"
import {useSelector, useDispatch} from "react-redux"
import {getResultOrder, resetOrder, resetOrderItem, orderPayUser} from "../../features/order/checkOutSlice"
import {resetCart} from "../../features/cart/cartSlice"
import MetaHelmet from "../../components/MetaHelmet"
import axios from "axios"
import './order-detail.scss'

export default function OrderDetail() {

  const [isSdk, setIsSdk] = useState(false)
  const {order, isSuccess, isPaid} = useSelector(state => state.order)
  const {user}= useSelector(state => state.auth)
  const dispatch= useDispatch()
  const {id} = useParams()

  useEffect(() =>{

    const asyncPayPal= async () =>{
      const res= await axios.get('/mern/api/config/paypal')
      const {client_paypal_id} = res.data
      const script = document.createElement('script')
      script.type="text/javascript"
      script.async=true
      script.src= `https://www.paypal.com/sdk/js?client-id=${client_paypal_id}`
      script.onload = () =>{
        setIsSdk(true)
      }
      document.body.appendChild(script)
    }

    if(isSuccess || !isSuccess){
      dispatch(getResultOrder(id))
    }else if(!isPaid){
      if(!window.paypal){
        asyncPayPal()
      }else{
        setIsSdk(true)
      }
    }

    return () => {
      dispatch(resetCart())
      dispatch(resetOrder())
      localStorage.removeItem('cart')
      localStorage.removeItem('shipping')
      localStorage.removeItem('payment')
      localStorage.removeItem('isPaid')
    }
  }, [dispatch, id, isSuccess, isPaid])
  
  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  }
  const handlePayOrder = async (paymentResult) =>{
    dispatch(orderPayUser({id, paymentResult})).then(() => dispatch(resetOrderItem()))
  }

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
                    {order.isDeliver && (
                      <div className="box-delivered">
                        <span>Delivered on {new Date(order.deliveredAt).toLocaleString('en-US')}</span>
                      </div>
                    )}
                    {!order.isDeliver && (
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
                  <div className={`paid-delivered ${order.isPaid ? `` : `box-not-paid`}`}>
                    {order.isPaid ? <span>Paid on {new Date(order.paidAt).toLocaleString('en-US')}</span> : <span>Not paid</span>}
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
                  <div className={`paypal-button ${!order.isPaid && !isPaid && !isSdk ? `` : `disabled`}`}>
                    <PayPalButton onSuccess={handlePayOrder} buttonStyles={buttonStyles} amount={order.totalPrice} />
                  </div>
              </Col>
            </Row>
        </div>
      <Footer />
    </>
  );
}
