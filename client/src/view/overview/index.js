import React, {useEffect} from 'react';
import NavBar from '../../components/Navbar';
import * as Routes from "../../router";
import {Row, Col} from "reactstrap";
import {Link, useParams} from "react-router-dom";
import Slider from 'react-slick';
import MetaHelmet from '../../components/MetaHelmet';
import Rating from '../../components/Rating';
import Footer from '../../components/Footer';
import Loading from "../../components/Loading"
import {MdNavigateNext} from "react-icons/md"
import {GrFormPrevious} from "react-icons/gr"
import {getProduct, getProductLatest} from "../../features/product/productSlice"
import {useSelector, useDispatch} from "react-redux"
import './overview.scss'

export default function Overview() {

  const {products, productSlice, isLoading, isError, message} = useSelector(state => state.product)
  const {count, page:pageNumber, pages, pagination} = products
  const dispatch= useDispatch()
  const {keyword, page} = useParams()

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() =>{
    dispatch(getProduct({keyword, page}))
    dispatch(getProductLatest())
  }, [dispatch, keyword, page])

  return (
    <>
      <MetaHelmet />
      <NavBar />
      <div className="slick-carosoul">
        <Slider {...settings}>
          {productSlice.data && productSlice.data.map((val, ind) =>(            
            <Link to={`${Routes.PRODUCT}/${val._id}`} key={val._id}>
              <div>
                <div className="title-image-slider">
                  <span>{val.name} ({`$ ${val.price}`})</span>
                </div>
                <div className='image-slide'>
                  <img src={`${val.image}`} alt="iamge-1" />
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
      <div className="list-products">
        <div className="title-product">
          <span>Latest products</span>
        </div>
        <div className="error-message">
          {isError && <span>{message}</span>}
        </div>
        <div className="core-products">
          <Row>
            {isLoading && (
              <Loading />
            )}
            {!isLoading && products.data && products.data.map((val, ind) =>(
              <Col xl="3" lg="3" md="4" key={val._id}>
                <Link to={`${Routes.PRODUCT}/${val._id}`}>
                  <div className="box-product">
                    <div className="image-per-product">
                      <img src={val.image} alt="img" />
                    </div>  
                    <div className="detail-product">
                      <h5>{val.name.length > 35 ? `${val.name.substr(0, 35)}...` : val.name.substr(0, 35) }</h5>
                      <Rating numRating={val.rating} review={val.numReviews}  />
                      <span>$ {val.price}</span>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
            <div className="pagination">
              {pages > 1 && pagination.prev && (
                <Link to={keyword ? `/search/${keyword}/page/${pagination.prev && pagination.prev.page}` : `/page/${pagination.prev && pagination.prev.page}`}>
                  <div className="prev-page">
                    <GrFormPrevious />
                  </div>
                </Link>
              )}
              {pages > 1 && [...Array(pages).keys()].map((val, ind) =>(
                  <div key={val + 1}>
                    <Link to={keyword ? `/search/${keyword}/page/${val + 1}` :`/page/${val + 1}`}>
                      <div className={`box-number ${val + 1 === pageNumber ? 'active' : ''}`}>
                        <span>{val + 1}</span>
                      </div>
                    </Link>
                  </div>
              ))}
              {pages > 1 && pagination.next && (
                <Link to={keyword ? `/search/${keyword}/page/${pagination.next && pagination.next.page}` : `/page/${pagination.next && pagination.next.page}`}>
                  <div className="next-page">
                    <MdNavigateNext />
                  </div>
                </Link>
              )}
            </div>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}
