import React, {useEffect} from 'react';
import NavBar from "../../components/Navbar"
import Footer from '../../components/Footer';
import StepNavBar from '../../components/StepNavBar';
import {Row, Col} from "reactstrap"
import * as Routes from "../../router"
import { useHistory, Redirect } from 'react-router-dom';
import MetaHelmet from '../../components/MetaHelmet';
import { useSelector } from 'react-redux';
import './place-order.scss'


export default function PlaceOrder() {

  const cart= useSelector(state => state.cart)
  const {cartItems} = cart
  const {shipping, payment} = useSelector(state => state.order)
  const history = useHistory()
  
  const addDecimal= (number) =>{
    return Math.round((number * 100) /100).toFixed(2)
  }
  const itemPrices= addDecimal(cartItems.reduce((acc, item) => acc + item.qty * item.price ,0).toFixed(2))
  const shippingPrices= addDecimal(Number(itemPrices) > 100 ? 0 : 100)
  const taxPrices= addDecimal(Number((0.15 * itemPrices)).toFixed(2))
  const totalPrices= (Number(itemPrices) + Number(shippingPrices) + Number(taxPrices)).toFixed(2)
  
  const objPrice={
    itemPrices,
    shippingPrices,
    taxPrices,
    totalPrices
  }
  localStorage.setItem('objPrice', JSON.stringify(objPrice))

  if(!payment){
    return <Redirect to={Routes.PAYMENT} />
  }

  return (
    <>
    <MetaHelmet />
    <NavBar />
    <div className="contain-order-detail  ">
      <div className="place-order">
        <StepNavBar />
        <Row>
              <Col xl="9" lg="9" md="8">
                <div className="shipping">
                  <div className="title-shipping">
                    <span>Shipping</span>
                  </div>
                  <div className="detail-shipping">
                    <div className="address">
                      <p>Address: {shipping && shipping.address}</p>
                    </div>
                  </div>
                </div>
                <div className="payment-method">
                  <div className="payment-shipping mrg-top10">
                    <span>Payment Method</span>
                  </div>
                  <div className="method">
                    <span>Method: {payment && payment}</span>
                  </div>
                </div>
                <div className="order-item">
                  <div className="order-shipping mrg-top10">
                    <span>Order Items</span>
                  </div>
                  <div className="items-order">
                    {cartItems && cartItems.map((val, ind) =>(
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
                            <span>{val.qty} X $ {val.price} = $ {Number(val.qty) * Number(val.price)}</span>
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
                        <span>$ {itemPrices}</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="items">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Shipping</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <span>$ {shippingPrices}</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="items">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Tax</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <span>$ {taxPrices}</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="items">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Total</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <span>$ {totalPrices}</span>
                      </Col>
                    </Row>
                  </div>
                </div>
                <form>
                  <button className="btn-delivered">Place Order</button>
                </form>
              </Col>
            </Row>
      </div>
    </div>
    <Footer />
    </>
  );
}
