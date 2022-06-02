import React, {useState, useEffect} from 'react';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import * as Routes from "../../router"
import { Link, useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux"
import MetaHelmet from "../../components/MetaHelmet"
import {addProduct, resetProduct} from "../../features/admin-role/adminProductSlice"
import '../edit-user-info/edit-user-info.scss'
import '../edit-product/edit-product.scss'
import './add-product.scss'

export default function AddProduct() {

  const {isLoading, isSuccess}= useSelector(state => state.adminProduct)
  const [frmData, setFrmData]= useState({
    name: '',
    price: 0,
    image: '/images/camera.jpg',
    brand: '',
    stock:0,
    category: '',
    detail: ''
  })
  const dispatch= useDispatch()
  const history= useHistory()

  const onChange= (e) =>{
    setFrmData((prev) =>{
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const {name, price, image, brand, stock, category, detail} = frmData

  const handleSubmit= async (e) =>{
    e.preventDefault()

    const data={
      name,
      image,
      brand,
      category,
      description: detail,
      price,
      stock
    }
    dispatch(addProduct(data))
  }
  
  useEffect(() => {
    if(isSuccess){
      history.push(Routes.PRODUCT_LIST)
    }
    
    return () => dispatch(resetProduct()) 
  }, [isSuccess, history, dispatch])

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
              <span>Add Product</span>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name</label>
              </div>
              <div>
                <input type="text" name="name" id="name" value={name} onChange={onChange} className='width100' required />
              </div>
              <div>
                <label>Price</label>
              </div>
              <div>
                <input type="number" name="price" id="price"  value={price} onChange={onChange} className='width100' required />
              </div>
              <div>
                <label>Image</label>
              </div>
              <div>
                <input type="text" name="image" id="image" value={image} onChange={onChange} className='width100' required />
                <input type="file" name="image" id="image" onChange={onChange} className='width100'/>
              </div>
              <div>
                <label>Brand</label>
              </div>
              <div>
                <input type="text" name="brand" id="brand" value={brand} onChange={onChange} className='width100' required />
              </div>
              <div>
                <label>Count In Stock</label>
              </div>
              <div>
                <input type="number" name="stock" id="stock" value={stock} onChange={onChange} className='width100' required />
              </div>
              <div>
                <label>Category</label>
              </div>
              <div>
                <input type="text" name="category" id="category" value={category} onChange={onChange} className='width100' required />
              </div>
              <div>
                <label>Description</label>
              </div>
              <div>
                <input type="text" name="detail" id="detail" value={detail} onChange={onChange} className='width100' required />
              </div>
              {isLoading && <button className="mrg-10">Submiting...</button>}
              {!isLoading && <button className="mrg-10">Submit</button>}
            </form>
          </div>
        </div>
      <Footer />
    </>
  );
}
