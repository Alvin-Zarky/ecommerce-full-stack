import React from 'react';
import {useParams} from "react-router-dom"
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import * as Images from "../../constant/images"
import {Row, Col} from "reactstrap"
import MetaHelmet from "../../components/MetaHelmet"
import './order-detail.scss'

export default function OrderDetail() {
  
  const {id} = useParams()
  const role= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  return (
    <>
      <MetaHelmet />
      <NavBar />
        <div className="contain-order-detail">
          <div className="title-order">
            <span>Order {id}</span>
          </div>
            <Row>
              <Col xl="9" lg="9" md="8">
                <div className="shipping">
                  <div className="title-shipping">
                    <span>Shipping</span>
                  </div>
                  <div className="detail-shipping">
                    <div className="username">
                      <span>Name: Alvin Jago</span>
                    </div>
                    <div className="useremail">
                      <span>Email: <span className="class-bold">Alvin@admin.com</span></span>
                    </div>
                    <div className="address">
                      <p>Address: 10Main St. Bosten in UK</p>
                    </div>
                    <div className="box-delivered">
                      <span>Delivered on 2020-09-26T17:03:55:2732</span>
                    </div>
                  </div>
                </div>
                <div className="payment-method">
                  <div className="payment-shipping mrg-top10">
                    <span>Payment Method</span>
                  </div>
                  <div className="method">
                    <span>Method: Paypal</span>
                  </div>
                  <div className="paid-delivered">
                    <span>Paid on 2020-09-26T17:03:55:2732</span>
                  </div>
                </div>
                <div className="order-item">
                  <div className="order-shipping mrg-top10">
                    <span>Order Items</span>
                  </div>
                  <div className="items-order">
                    <Row className="border-item">
                      <Col xl="2" lg="2" md="6">
                        <div className="image-order">
                          <img src={Images.IMAGE_1} alt="" />
                        </div>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <div className="title-order-item">
                          <span>Airpod wireless Bluetooth Headphones</span>
                        </div>
                      </Col>
                      <Col xl="4" lg="4" md="4">
                        <div className="price-order">
                          <span>1 X $ 89.99 = $ 89.99</span>
                        </div>
                      </Col>
                    </Row>
                    <Row className="border-item">
                      <Col xl="2">
                        <div className="image-order">
                          <img src={Images.IMAGE_1} alt="" />
                        </div>
                      </Col>
                      <Col xl="6">
                        <div className="title-order-item">
                          <span>Airpod wireless Bluetooth Headphones</span>
                        </div>
                      </Col>
                      <Col xl="4">
                        <div className="price-order">
                          <span>1 X $ 89.99 = $ 89.99</span>
                        </div>
                      </Col>
                    </Row>
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
                        <span>$ 198.78</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="items">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Shipping</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <span>$ 0</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="items">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Tax</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <span>$ 198.78</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="items">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Total</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <span>$ 198.78</span>
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
