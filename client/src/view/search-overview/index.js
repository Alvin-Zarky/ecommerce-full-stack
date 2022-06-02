import React, {useEffect} from 'react';
import NavBar from '../../components/Navbar';
import * as Routes from "../../router";
import {Row, Col} from "reactstrap";
import {Link, useParams} from "react-router-dom";
import Rating from '../../components/Rating';
import Footer from '../../components/Footer';
import Loading from "../../components/Loading"
import {getProduct, getProductLatest, resetError} from "../../features/product/productSlice"
import {useSelector, useDispatch} from "react-redux"
import '../overview/overview.scss'
import './search-overview.scss'
import MetaHelmet from '../../components/MetaHelmet';

export default function SearchOverview() {

  const {products, isLoading, isError, message} = useSelector(state => state.product)
  const dispatch= useDispatch()
  const {keyword} = useParams()

  useEffect(() =>{
    dispatch(getProduct(keyword))
    dispatch(getProductLatest())

    return () => dispatch(resetError())
  }, [dispatch, keyword])

  return (
    <>
      <MetaHelmet />
      <NavBar />
      <div className="list-products">
        <div className="error-message margin20">
          {isError && <span>{message}</span>}
        </div>
        <div className="core-products margin20">
          <Row>
            {isLoading && (
              <Loading />
            )}
            {!isError && !isLoading && products.data && products.data.map((val, ind) =>(
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
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}
