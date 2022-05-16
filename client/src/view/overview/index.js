import React from 'react';
import NavBar from '../../components/Navbar';
import * as Images from "../../constant/images";
import * as Routes from "../../router";
import {Row, Col} from "reactstrap";
import {Link} from "react-router-dom";
import Slider from 'react-slick';
import Rating from '../../components/Rating';
import Footer from '../../components/Footer';
import './overview.scss'

export default function Overview() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const rating= 3.5
  return (
    <>
      <NavBar />
      <div className="slick-carosoul">
        <Slider {...settings}>
          <Link to={`${Routes.PRODUCT}/1`}>
            <div>
              <div className="title-image-slider">
                <span>Airpods wireless bluetooth headphones ($89.99)</span>
              </div>
              <div className='image-slide'>
                <img src={Images.IMAGE_1} alt="iamge-1" />
              </div>
            </div>
          </Link>
          <Link to={`${Routes.PRODUCT}/2`}>
            <div>
              <div className="title-image-slider">
                <span>Airpods wireless bluetooth headphones ($89.99)</span>
              </div>
              <div className='image-slide'>
                <img src={Images.IMAGE_2} alt="iamge-2" />
              </div>
            </div>
          </Link>
        </Slider>
      </div>
      <div className="list-products">
        <div className="title-product">
          <span>Latest products</span>
        </div>
        <div className="core-products">
          <Row>
            <Col xl="3" lg="3" md="4">
              <Link to={`${Routes.PRODUCT}/1`}>
                <div className="box-product">
                  <div className="image-per-product">
                    <img src={Images.IMAGE_1} alt="image_1" />
                  </div>
                  <div className="detail-product">
                    <h5>Airpods Wireless Bluetooth Headphones</h5>
                    <Rating numRating={rating} />
                    <span>$ 89.99</span>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}
