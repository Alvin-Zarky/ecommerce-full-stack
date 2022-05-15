import React from 'react';
import {Row, Col} from "reactstrap";
import { Link } from 'react-router-dom';
import {AiOutlineStar} from "react-icons/ai";
import * as Routes from "../../router";
import * as Images from "../../constant/images";
import NavBar from "../../components/Navbar"
import Footer from '../../components/Footer';
import './product-detail.scss'

export default function ProductDetail() {
  return (
    <>
      <NavBar />
      <div className="maximum-width-page">
        <div className="detail-page-show">
          <Row>
            <Col xl="5" lg="5" md="6">
              <div className='link-back'>
                <Link to={Routes.INDEX}>
                  <span>Go back</span>
                </Link>
              </div>
              <div className='product-view'>
                <div className="image-for-product">
                  <img src={Images.IMAGE_1} alt="image_1" />
                </div>
                <div className="review-product">
                  <span>Reviews</span>
                </div>
                <div className="box-show-review">
                  <span>No Reviews</span>
                </div>
                <div className="message-review-product">
                  <div className="title-review">
                    <span>Write a customer review</span>
                  </div>
                  <div className="permission-review">
                    <span>Please sign in to write a review</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl="4" lg="4" md="3">
              <div className="show-text-detail">
                <div className="title-text-detail">
                  <span>Cannon eos 80D Dslr camera</span>
                </div>
                <div className="rating">
                  <span> <AiOutlineStar /> <AiOutlineStar /> <AiOutlineStar /> <AiOutlineStar /> <AiOutlineStar /> 0 Reviews</span>
                </div>
                <div className="price-detail">
                  <span>Price: $929.99</span>
                </div>
                <div className='detail-text'>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus fugiat architecto minima adipisci temporibus non, aperiam itaque assumenda. Odio, inventore.</p>
                </div>
              </div>
            </Col>
            <Col xl="3" lg="3" md="3">
              <div className="box-add-to-cart">
                <div className="amount-price">
                  <Row>
                    <Col xl="6" lg="6" md="6">
                      <span>Price</span>
                    </Col>
                    <Col xl="6" lg="6" md="6">
                      <span>$ 929.99</span>
                    </Col>
                  </Row>
                </div>
                <div className="status">
                  <Row>
                    <Col xl="6" lg="6" md="6">
                      <span>Status</span>
                    </Col>
                    <Col xl="6" lg="6" md="6">
                      <span>In Stock</span>
                    </Col>
                  </Row>
                </div>
                <div className="quantity">
                  <Row>
                    <Col xl="6" lg="6" md="6">
                      <span>Quantity</span>
                    </Col>
                    <Col xl="6" lg="6" md="6">
                      <select>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="btn-add-to-cart">
                  <form>
                    <button>Add to cart</button>
                  </form>
                </div>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}
