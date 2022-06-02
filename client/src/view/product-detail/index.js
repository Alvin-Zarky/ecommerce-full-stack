import React, {useEffect, useState} from 'react';
import {Row, Col} from "reactstrap";
import {useSelector, useDispatch} from "react-redux"
import { useParams, useHistory } from 'react-router-dom';
import Rating from "../../components/Rating";
import MetaHelmet from "../../components/MetaHelmet"
import { getProductDetail, postProductReview, resetError } from "../../features/product/productSlice"
import { Link } from 'react-router-dom'; 
import * as Routes from "../../router";
import NavBar from "../../components/Navbar"
import Footer from '../../components/Footer';
import './product-detail.scss'
import RatingStar from '../../components/RatingStar';

export default function ProductDetail() {

  const [qty, setQty] = useState(1)
  const [rate, setRate] = useState('1')
  const [comment, setComment] = useState('')
  const {product, isLoading, message, isError} = useSelector(state => state.product)
  const {user} = useSelector(state => state.auth)
  const dispatch= useDispatch()
  const {id} = useParams()
  const history= useHistory()

  useEffect(() =>{
    dispatch(getProductDetail(id))

    return () => dispatch(resetError())
  }, [dispatch, id])

  const proceedCart = () =>{
    history.push(`${Routes.CART}/${id}?qty=${qty}`)
  }

  const handleReview= (e) =>{
    e.preventDefault()

    const value={
      rating:rate,
      comments:comment
    }
    dispatch(postProductReview({id, value})).then(() =>{
      setComment('')
    })
  }

  return (
    <>
      {product.data && (
        <MetaHelmet title={product.data.name} />
      )}
      <NavBar />
      <div className="maximum-width-page">
        <div className="detail-page-show">
          <Row>
            {product.data && (
              <>
            <Col xl="5" lg="5" md="6">
            <div className='link-back' style={{marginTop: 0}}>
              <Link to={Routes.INDEX}>
                <span>Go back</span>
              </Link>
            </div>
              <div className='product-view'>
                <div>
                    <div className="image-for-product">
                      <img src={product.data.image} alt="image_1" />
                    </div>
                    <div className="review-product">
                      <span>Reviews</span>
                    </div>
                    {product.data.review.length===0 && (
                      <div className="box-show-review">
                        <span>No Reviews</span>
                      </div>
                    )}
                    {product.data.review.map((val, ind) =>(
                      <div className="box-list-review" key={val._id}>
                        <span>{val.name}</span>
                        <div className="rating">
                          <span><RatingStar numRating={val.rating} /></span>
                        </div>
                        <div className="date">
                          <span>{new Date(val.createdAt).toLocaleString('en-US')}</span>
                        </div>
                        <div className="detail">
                          <p>Feedback: {val.comments}</p>
                        </div>
                      </div>
                    ))}
                    <div className="message-review-product">
                      <div className="title-review">
                        <span>Write a customer review</span>
                      </div>
                      {isError && (
                        <div className="box-err-msg">
                          <div className="message">
                            <span>{message}</span>
                          </div>
                        </div>
                      )}
                      {!user && (
                        <div className="permission-review">
                          <span>Please sign in to write a review</span>
                        </div>
                      )}
                      {user && (
                        <>
                          <form onSubmit={handleReview}>
                            <div>
                              <label>Rating</label>
                            </div>
                            <div>
                              <select onChange={(e) => {setRate(e.target.value)}}>
                                <option value="1">1- Poor</option>
                                <option value="2">2- Fair</option>
                                <option value="3">3- Good</option>
                                <option value="4">4- Very good</option>
                                <option value="5">5- Excellent</option>
                              </select>
                            </div>
                            <div>
                              <label>Comment</label>
                            </div>
                            <div>
                              <textarea value={comment} onChange={(e) => {setComment(e.target.value)}} required></textarea>
                            </div>
                            {isLoading && <button>Submiting...</button>}
                            {!isLoading && <button>Submit</button>}
                          </form>
                        </>
                      )}
                    </div>
                  </div>
              </div>
            </Col>
            <Col xl="4" lg="4" md="3">
              <div className="show-text-detail">
                <div className="title-text-detail">
                  <span>{product.data.name}</span>
                </div>
                <div className="rating">
                  <span><Rating numRating={product.data.rating} review={product.data.numReviews} /></span>
                </div>
                <div className="price-detail">
                  <span>Price: ${product.data.price}</span>
                </div>
                <div className='detail-text'>
                  <p>{product.data.description}</p>
                </div>
              </div>
            </Col>
            <Col xl="3" lg="3" md="3">
              
              <div className={`box-proceed ${product.data.stock<=0 ? 'disabled-box' : ''}`}>
              <div className={`box-add-to-cart ${product.data.stock<=0 && `no-border`}`}>
                <div className="amount-price">
                  <Row>
                    <Col xl="6" lg="6" md="6">
                      <span>Price</span>
                    </Col>
                    <Col xl="6" lg="6" md="6">
                      <span>$ {product.data.price}</span>
                    </Col>
                  </Row>
                </div>
                <div className="status">
                  <Row>
                    <Col xl="6" lg="6" md="6">
                      <span>Status</span>
                    </Col>
                    <Col xl="6" lg="6" md="6">
                      {product.data.stock>1 ? <span>In Stocks</span> : product.data.stock===1 ? <span>In Stock</span> : <span>Out Of Stock</span>}
                    </Col>
                  </Row>
                </div>
                {product.data.stock >=1 && (
                  <div className="quantity">
                    <Row>
                      <Col xl="6" lg="6" md="6">
                        <span>Quantity</span>
                      </Col>
                      <Col xl="6" lg="6" md="6">
                        <select onChange={(e) => {setQty(e.target.value)}}>
                          {[...Array(product.data.stock).keys()].map((val, ind) =>(
                              <option key={ind} value={val + 1}>{val + 1}</option>
                          ))}
                        </select>
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
              <div className="btn-add-to-cart">
                <form onSubmit={proceedCart}>
                  <button>Add to cart</button>
                </form>
              </div>
              </div>
            </Col>
            </>
            )}
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}
