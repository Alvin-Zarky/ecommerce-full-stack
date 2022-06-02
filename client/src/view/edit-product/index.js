import React, {useEffect, useState} from 'react';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import * as Routes from "../../router"
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getProductDetail, updateProduct, resetState} from "../../features/admin-role/adminProductSlice"
import '../edit-user-info/edit-user-info.scss'
import './edit-product.scss'
import MetaHelmet from '../../components/MetaHelmet';

export default function EditProduct() {

  const {product, isSuccess, isLoading}= useSelector(state => state.adminProduct)
  const dispatch= useDispatch()
  const {id}= useParams()
  const history= useHistory()
  const [name, setName]= useState('')
  const [price, setPrice]= useState(0)
  const [brand, setBrand]= useState('')
  const [stock, setStock]= useState(0)
  const [category, setCategory]= useState('')
  const [detail, setDetail]=useState('')
  const [image, setImage]= useState('')

  useEffect(() =>{
    if(!product || !product.data){
      dispatch(getProductDetail(id))
    }else{
      setName(product.data.name)
      setPrice(product.data.price)
      setBrand(product.data.brand)
      setStock(product.data.stock)
      setCategory(product.data.category)
      setDetail(product.data.description)
      setImage(product.data.image)
    }
    
    if(isSuccess){
      history.push(Routes.PRODUCT_LIST)
      dispatch(resetState())
    }
    
  }, [dispatch, product, id,isSuccess, history])

  const handleSubmit = (e) =>{
    e.preventDefault()

    const value={
      name,
      image,
      brand,
      category,
      description: detail,
      price,
      stock
    }
    dispatch(updateProduct({id, value}))
  }
  return (
    <>
      <MetaHelmet />
      <NavBar />
        <div className="maximum-width-page">
          <div className='link-back'>
            <Link to={Routes.PRODUCT_LIST}>
              <span>Go back</span>
            </Link>
          </div>
          <div className="form-update-info">
            <div className="title-overview">
              <span>Edit Product</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name</label>
              </div>
              <div>
                <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} className="width100" required />
              </div>
              <div>
                <label>Price</label>
              </div>
              <div>
                <input type="number" value={price} onChange={(e) => {setPrice(e.target.value)}} className="width100" required />
              </div>
              <div>
                <label>Image</label>
              </div>
              <div>
                <input type="text" className="width100" value={image} onChange={(e) => {setImage(e.target.value)}} required />
                <input type="file" onChange={(e) => {setImage(e.target.value)}} className="width100" />
              </div>
              <div>
                <label>Brand</label>
              </div>
              <div>
                <input type="text" value={brand} onChange={(e) => {setBrand(e.target.value)}} className="width100" required />
              </div>
              <div>
                <label>Count In Stock</label>
              </div>
              <div>
                <input type="number" value={stock} onChange={(e) => {setStock(e.target.value)}} className="width100" required />
              </div>
              <div>
                <label>Category</label>
              </div>
              <div>
                <input type="text"  value={category} onChange={(e) => {setCategory(e.target.value)}} className="width100" required />
              </div>
              <div>
                <label>Description</label>
              </div>
              <div>
                <input type="text" value={detail} onChange={(e) => {setDetail(e.target.value)}}  className="width100" required />
              </div>
              {isLoading && <button className="mrg-10">Updating...</button>}
              {!isLoading && <button className="mrg-10">Update</button>}
            </form>
          </div>
        </div>
      <Footer />
    </>
  );
}
