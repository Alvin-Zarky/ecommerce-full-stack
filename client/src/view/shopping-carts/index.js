import React from 'react';
import NavBar from "../../components/Navbar"
import Footer from '../../components/Footer';
import {Row, Col} from "reactstrap";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Routes from "../../router"
import * as Images from "../../constant/images";
import {AiFillDelete} from "react-icons/ai";
import './shop-cart.scss'
import MetaHelmet from '../../components/MetaHelmet';

export default function ShoppingCart() {

  const {user}= useSelector(state => state.auth)
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
                <div className="box-cart-each">
                  <Row>
                    <Col xl="3" lg="3" md="3">
                      <div className="image-box">
                        <img src={Images.IMAGE_1} alt="image_1" />
                      </div>
                    </Col>
                    <Col xl="3" lg="3" md="3">
                      <div className="title-box">
                        <span>Airpods wireless Bluetooth headphone</span>
                      </div>
                    </Col>
                    <Col xl="3" lg="3" md="3">
                      <div className="box-price">
                        <span>$ 89.99</span>
                      </div>
                    </Col>
                    <Col xl="3" lg="3" md="3">
                      <div className="box-function">
                        <div className="quantity">
                          <select>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                        </div>
                        <div className="btn-remove">
                          <AiFillDelete />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="box-cart-each">
                  <Row>
                    <Col xl="3" lg="3" md="3">
                      <div className="image-box">
                        <img src={Images.IMAGE_1} alt="image_1" />
                      </div>
                    </Col>
                    <Col xl="3" lg="3" md="3">
                      <div className="title-box">
                        <span>Airpods wireless Bluetooth headphone</span>
                      </div>
                    </Col>
                    <Col xl="3" lg="3" md="3">
                      <div className="box-price">
                        <span>$ 89.99</span>
                      </div>
                    </Col>
                    <Col xl="3" lg="3" md="3">
                      <div className="box-function">
                        <div className="quantity">
                          <select>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                        </div>
                        <div className="btn-remove">
                          <AiFillDelete />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>

              </div>
            </Col>
            <Col xl="4" lg="4" md="3">
              <div className="sub-total-item">
                <div className="title-item">
                  <span>Subtotal (3) items</span>
                </div>
                <div className="price-item">
                  <span>$ 398.99</span>
                </div>
                {!user && (
                  <Link to={`${Routes.SIGN_IN}`}>
                    <button className="btn-procceed">
                      Proceed to checkout
                    </button>
                  </Link>
                )}
                {user && (
                  <Link to={`${Routes.SHIPPING}`}>
                    <button className="btn-procceed">
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
